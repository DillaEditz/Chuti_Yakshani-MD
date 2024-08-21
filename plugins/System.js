const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os")
// Register the 'System' command
cmd({
    pattern: "system",
    alias: ["status","botinfo"],
    desc: "Check up botsystem info",
    category: "main",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup,
    sender, senderNumber, botNumber2, botNumber, pushname, isMe,
    isOwner, groupMetadata, groupName, participants, groupAdmins,
    isBotAdmins, isAdmins, reply
}) => {
    try {

    }catch(e){
      console.log(e)
      reply(`${e}`)
    }
    })
