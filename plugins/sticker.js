const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { Sticker } = require('wa-sticker-formatter');
const config = require('../config');
const { cmd } = require('../command');

// Command handler
cmd({
    pattern: "sticker",
    alias: ["s", "stick"],
    desc: "Create stickers from image or video",
    category: "converter",
    react: "✂️",
    filename: __filename
},
async (conn, mek, m) => {
    try {
        const { from, quoted } = m;
        const getQuotedObj = quoted ? quoted : m;
        const mimetype = getQuotedObj.mimetype || '';

        if (!mimetype.startsWith('image') && !mimetype.startsWith('video')) {
            return conn.sendMessage(from, {
                text: "Please reply to an image or video with the .sticker command to create a sticker."
            }, { quoted: mek });
        }

        conn.sendMessage(from, { react: { text: "🔄", key: mek.key }});

        // Download the media content directly from the message
        const stream = await downloadContentFromMessage(getQuotedObj, mimetype.split('/')[0]);
        let mediaBuffer = Buffer.from([]);
        for await (const chunk of stream) {
            mediaBuffer = Buffer.concat([mediaBuffer, chunk]);
        }

        // Create sticker
        const sticker = new Sticker(mediaBuffer, {
            pack: config.packname || "Chuti Yakshani Md",
            author: config.author || "Mr Dilla",
            type: 'full',
            categories: ['🤩', '🎉'],
            id: '12345',
            quality: 70,
            background: 'transparent'
        });

        // Send the sticker
        const stickerBuffer = await sticker.toBuffer();
        await conn.sendMessage(from, { sticker: stickerBuffer }, { quoted: mek });

        conn.sendMessage(from, { react: { text: "✅", key: mek.key }});
    } catch (error) {
        console.error('Error creating sticker:', error);
        conn.sendMessage(from, {
            text: "An error occurred while creating the sticker. Please try again."
        }, { quoted: mek });
        conn.sendMessage(from, { react: { text: "❌", key: mek.key }});
    }
});
