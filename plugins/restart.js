const config = require('../config');
const { cmd, commands } = require('../command');
const { sleep } = require('../lib/functions');

// Register the 'restart' command
cmd({
    pattern: "restart",
    desc: "Restart the bot",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup,
    sender, senderNumber, botNumber2, botNumber, pushname, isMe,
    isOwner, groupMetadata, groupName, participants, groupAdmins,
    isBotAdmins, isAdmins, reply
}) => {
    try {
        if(!isOwner) return
        const { exec } = require("child_process");
        reply("Restarting...");
        await sleep(1500); // Sleep for 1.5 seconds before restarting
        exec("pm2 restart all", (error, stdout, stderr) => {
            if (error) {
                console.error(`Error restarting bot: ${error}`);
                reply(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                reply(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            reply("Bot restarted successfully.");
        });
    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});
