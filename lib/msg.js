const { proto, downloadContentFromMessage, getContentType } = require('@whiskeysockets/baileys');
const fs = require('fs');

// Function to download media messages and save them locally
const downloadMediaMessage = async (m, filename) => {
    if (m.type === 'viewOnceMessage') {
        m.type = m.msg.type;
    }
    
    let name, stream, buffer = Buffer.from([]);
    
    switch (m.type) {
        case 'imageMessage':
            name = filename ? filename + '.jpg' : 'undefined.jpg';
            stream = await downloadContentFromMessage(m.msg, 'image');
            break;
        case 'videoMessage':
            name = filename ? filename + '.mp4' : 'undefined.mp4';
            stream = await downloadContentFromMessage(m.msg, 'video');
            break;
        case 'audioMessage':
            name = filename ? filename + '.mp3' : 'undefined.mp3';
            stream = await downloadContentFromMessage(m.msg, 'audio');
            break;
        case 'stickerMessage':
            name = filename ? filename + '.webp' : 'undefined.webp';
            stream = await downloadContentFromMessage(m.msg, 'sticker');
            break;
        case 'documentMessage':
            const ext = m.msg.fileName.split('.')[1].toLowerCase().replace('jpeg', 'jpg').replace('png', 'jpg').replace('m4a', 'mp3');
            name = filename ? filename + '.' + ext : 'undefined.' + ext;
            stream = await downloadContentFromMessage(m.msg, 'document');
            break;
        default:
            return null;
    }

    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }

    fs.writeFileSync(name, buffer);
    return fs.readFileSync(name);
};

// Function to format and enhance the message object with additional methods
const sms = (conn, m) => {
    if (m.key) {
        m.id = m.key.id;
        m.chat = m.key.remoteJid;
        m.fromMe = m.key.fromMe;
        m.isGroup = m.chat.endsWith('@g.us');
        m.sender = m.fromMe ? conn.user.id.split(':')[0] + '@s.whatsapp.net' : m.isGroup ? m.key.participant : m.key.remoteJid;
    }

    if (m.message) {
        m.type = getContentType(m.message);
        m.msg = (m.type === 'viewOnceMessage') ? m.message[m.type].message[getContentType(m.message[m.type].message)] : m.message[m.type];
        
        if (m.msg) {
            if (m.type === 'viewOnceMessage') {
                m.msg.type = getContentType(m.message[m.type].message);
            }
            const quotedMention = m.msg.contextInfo ? m.msg.contextInfo.participant : '';
            const tagMention = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];
            const mention = typeof(tagMention) === 'string' ? [tagMention] : tagMention;
            m.mentionUser = mention ? mention.filter(x => x) : [];
            m.body = m.type === 'conversation' ? m.msg : m.type === 'extendedTextMessage' ? m.msg.text :
                (m.type === 'imageMessage' || m.type === 'videoMessage') && m.msg.caption ? m.msg.caption :
                m.type === 'templateButtonReplyMessage' && m.msg.selectedId ? m.msg.selectedId :
                m.type === 'buttonsResponseMessage' && m.msg.selectedButtonId ? m.msg.selectedButtonId : '';
            m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null;
            
            if (m.quoted) {
                m.quoted.type = getContentType(m.quoted);
                m.quoted.id = m.msg.contextInfo.stanzaId;
                m.quoted.sender = m.msg.contextInfo.participant;
                m.quoted.fromMe = m.quoted.sender.split('@')[0].includes(conn.user.id.split(':')[0]);
                m.quoted.msg = (m.quoted.type === 'viewOnceMessage') ? m.quoted[m.quoted.type].message[getContentType(m.quoted[m.quoted.type].message)] : m.quoted[m.quoted.type];
                
                if (m.quoted.type === 'viewOnceMessage') {
                    m.quoted.msg.type = getContentType(m.quoted[m.quoted.type].message);
                }
                
                const quoted_quotedMention = m.quoted.msg.contextInfo ? m.quoted.msg.contextInfo.participant : '';
                const quoted_tagMention = m.quoted.msg.contextInfo ? m.quoted.msg.contextInfo.mentionedJid : [];
                const quoted_mention = typeof(quoted_tagMention) === 'string' ? [quoted_tagMention] : quoted_tagMention;
                m.quoted.mentionUser = quoted_mention ? quoted_mention.filter(x => x) : [];
                m.quoted.fakeObj = proto.WebMessageInfo.fromObject({
                    key: {
                        remoteJid: m.chat,
                        fromMe: m.quoted.fromMe,
                        id: m.quoted.id,
                        participant: m.quoted.sender,
                    },
                    message: m.quoted,
                });
                m.quoted.download = (filename) => downloadMediaMessage(m.quoted, filename);
                m.quoted.delete = () => conn.sendMessage(m.chat, { delete: m.quoted.fakeObj.key });
                m.quoted.react = (emoji) => conn.sendMessage(m.chat, { react: { text: emoji, key: m.quoted.fakeObj.key } });
            }
        }

        m.download = (filename) => downloadMediaMessage(m, filename);
    }

    m.reply = (teks, id = m.chat, option = { mentions: [m.sender] }) => conn.sendMessage(id, { text: teks, contextInfo: { mentionedJid: option.mentions } }, { quoted: m });
    m.replyS = (stik, id = m.chat, option = { mentions: [m.sender] }) => conn.sendMessage(id, { sticker: stik, contextInfo: { mentionedJid: option.mentions } }, { quoted: m });
    m.replyImg = (img, teks, id = m.chat, option = { mentions: [m.sender] }) => conn.sendMessage(id, { image: img, caption: teks, contextInfo: { mentionedJid: option.mentions } }, { quoted: m });
    m.replyVid = (vid, teks, id = m.chat, option = { mentions: [m.sender], gif: false }) => conn.sendMessage(id, { video: vid, caption: teks, gifPlayback: option.gif, contextInfo: { mentionedJid: option.mentions } }, { quoted: m });
    m.replyAud = (aud, id = m.chat, option = { mentions: [m.sender], ptt: false }) => conn.sendMessage(id, { audio: aud, ptt: option.ptt, mimetype: 'audio/mpeg', contextInfo: { mentionedJid: option.mentions } }, { quoted: m });
    m.replyDoc = (doc, id = m.chat, option = { mentions: [m.sender], filename: 'undefined.pdf', mimetype: 'application/pdf' }) => conn.sendMessage(id, { document: doc, mimetype: option.mimetype, fileName: option.filename, contextInfo: { mentionedJid: option.mentions } }, { quoted: m });
    m.replyContact = (name, info, number) => {
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nORG:${info};\nTEL;type=CELL;type=VOICE;waid=${number}:+${number}\nEND:VCARD`;
        conn.sendMessage(m.chat, { contacts: { displayName: name, contacts: [{ vcard }] } }, { quoted: m });
    };
    m.react = (emoji) => conn.sendMessage(m.chat, { react: { text: emoji, key: m.key } });

    return m;
};

module.exports = { sms, downloadMediaMessage };
