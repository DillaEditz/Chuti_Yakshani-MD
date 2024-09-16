const config = require('../config');
const { cmd, commands } = require('../command');

cmd(
  {
    pattern: "dilla",
    alias: ["owner", "developer", "script"],
    desc: "Check owner.",
    category: "main",
    filename: __filename
  },
  async (conn, mek, m, {
    from,quoted,body,isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins,reply
    }
  ) => {
    try {
      const status = `👹️ *_Chuti_Yakshani-Md_* 👹️\n\n*Name*:- Mr Dilla\n*Age*:- 19\n*From*:- Nittambuwa, Sri Lanka\n*Number*:- 94764570094\n*Web*:- https://mr-dilla.netlify.app/\n*Github*:- https://github.com/mrdilla\n\n♻️ *~Powered by Chuti_Yakshani-MD~* ♻️`;
      const imageUrl = 'https://i.imgur.com/79kEM0X.jpeg';
      const audioUrl = 'https://drive.usercontent.google.com/u/0/uc?id=17X8I3nyXoRjQjfiJVI0YJcJ3e_oLEPTs&export=download';
      const quotedMessage = mek ? mek : null;
      
      await conn.sendPresenceUpdate('recording', from);
      await conn.sendMessage(from, { audio: { url: audioUrl }, mimetype: 'audio/mp4', ptt: true }, { quoted: quotedMessage });
      await conn.sendMessage(from, { image: { url: imageUrl }, caption: status }, { quoted: quotedMessage });

    } catch (e) {
      console.error('Error sending message:', e);
      reply(`An error occurred: ${e.message}`);
    }
  }
);
