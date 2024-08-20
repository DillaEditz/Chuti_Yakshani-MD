const { cmd, commands } = require('../command');
const fg = require('api-dylux')
const yts = require('yt-search')

// Register the 'alive' command
cmd({
    pattern: "song",
    desc: "download song",
    category: "download",
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
      reply('${e}')
    }
})
