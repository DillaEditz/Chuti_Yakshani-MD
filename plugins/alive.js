const config = require('../config');
const { cmd, commands } = require('../command');
const os = require('os');
const { runtime } = require('../lib/functions');
const path = require('path');

// Register the 'alive' command
cmd({
    pattern: "alive",
    desc: "Check if the bot is online and show system info.",
    category: "main",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup,
    sender, senderNumber, botNumber2, botNumber, pushname, isMe,
    isOwner, groupMetadata, groupName, participants, groupAdmins,
    isBotAdmins, isAdmins, reply
}) => {
    try {
        // Construct the system status message
        let status = `👹️ *_Chuti_Yakshani-Md_* 👹️
👋 *Hello* ${pushname}

*_I am Chuti_Yakshani-Md Created By Dilla Editz Using Node.js_*

*Uptime:* ${runtime(process.uptime())}

*Ram usage:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB

*HostName:* ${os.hostname()}

*Owner:* *Dilla* *Editz*`;

        // Combine the system status with the alive message
        const aliveMessage = `${status}\n\n${config.ALIVE_MSG}`;

        // Define the path to the audio file
            const audioPath = path.join(__dirname, '../res/audio/alive.mp3');

        // Send the audio file
        await conn.sendMessage(from, {
            audio: { url: audioPath },
            mimetype: 'audio/mpeg',
            ptt: true // Set to true if you want to send it as a voice note
        }, { quoted: mek });
        
        // Send the image with the alive message
        await conn.sendMessage(from, {
            image: { url: config.ALIVE_IMG },
            caption: aliveMessage
        }, { quoted: mek });



    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});

