const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');
// Register the 'ai' command
cmd({
    pattern: "ai",
    desc: "ai chat.",
    category: "main",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup,
    sender, senderNumber, botNumber2, botNumber, pushname, isMe,
    isOwner, groupMetadata, groupName, participants, groupAdmins,
    isBotAdmins, isAdmins, reply
}) => {
    try {
        let data = await fechJson('')
    }catch(e){
      console.log(e)
      reply('${e}')
    }
