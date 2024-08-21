const { cmd } = require('../command');

// Register the 'menu' command
cmd({
    pattern: "menu",
    alias: ["help"],
    desc: "Displays the bot menu.",
    category: "main",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup,
    sender, senderNumber, botNumber2, botNumber, pushname, isMe,
    isOwner, groupMetadata, groupName, participants, groupAdmins,
    isBotAdmins, isAdmins, reply
}) => {
    try {
        // Define the menu message
        const menuMessage = `*👋 Welcome to Chuti_Yakshani-MD Bot Menu 👋*
        
*Here are the commands you can use:*

1. *${prefix}alive* - Check if the bot is online and see system info.
2. *${prefix}system* - Display system information.
3. *${prefix}help* - Show this menu.

*For more details, type ${prefix}help followed by the command name.*

*Enjoy your experience!*
`;

        // Send the menu message
        await reply(menuMessage);
    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});

