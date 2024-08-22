const config = require('../config');
const { cmd, commands } = require('../command');

// Register the 'menu' command
cmd({
    pattern: "menu",
    alias: ["allmenu", "help"],
    desc: "Get bot cmd menu",
    category: "main",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup,
    sender, senderNumber, botNumber2, botNumber, pushname, isMe,
    isOwner, groupMetadata, groupName, participants, groupAdmins,
    isBotAdmins, isAdmins, reply
}) => {
    try {

        let menu = {
            main: '',
            download: '',
            group:'',
            owner: '',
            convert: '',
            search: ''
        };

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
