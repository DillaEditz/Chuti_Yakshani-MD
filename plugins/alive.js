const config = require('../config');
const { cmd, commands } = require('../command');

// Register the 'alive' command
cmd({
    pattern: "alive",
    desc: "Check if the bot is online.",
    category: "main",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup,
    sender, senderNumber, botNumber2, botNumber, pushname, isMe,
    isOwner, groupMetadata, groupName, participants, groupAdmins,
    isBotAdmins, isAdmins, reply
}) => {
    try {
        // Send an image with a caption indicating the bot is alive
        await conn.sendMessage(from, {
            image: { url: config.ALIVE_IMG },
            caption: config.ALIVE_MSG
        }, { quoted: mek });
    } catch (e) {
        // Log the error and reply with the error message
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});
