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
        // Check if the user is the owner of the bot
        if (!isOwner) {
            return reply("You don't have permission to use this command.");
        }

        const { exec } = require("child_process");

        // Notify the user that the bot is restarting
        reply("Restarting...");

        // Pause for 1.5 seconds before executing the restart command
        await sleep(1500);

        // Execute the PM2 restart command
        exec("pm2 restart all", (error, stdout, stderr) => {
            if (error) {
                // Log the error and notify the user
                console.error(`Error restarting bot: ${error}`);
                reply(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                // Log any stderr output and notify the user
                console.error(`stderr: ${stderr}`);
                reply(`stderr: ${stderr}`);
                return;
            }

            // Log the stdout output and notify the user of success
            console.log(`stdout: ${stdout}`);
            reply("Bot restarted successfully.");
        });
    } catch (e) {
        // Handle any unexpected errors
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});
