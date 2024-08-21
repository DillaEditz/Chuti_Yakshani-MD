const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");

// Function to format uptime
function runtime(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    
    return `${d}d ${h}h ${m}m ${s}s`;
}

// Register the 'System' command
cmd({
    pattern: "system",
    alias: ["status", "botinfo"],
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
        let status = `*Uptime:-*  ${runtime(process.uptime())}
        
*Ram usage:-* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem() / 1024 / 1024)}MB

*HostName:-* ${os.hostname()}

*Owner:-* *Dilla* *Editz*`;

        return reply(`${status}`);
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
