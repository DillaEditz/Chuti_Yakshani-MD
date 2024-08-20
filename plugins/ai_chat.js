const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');  // Correct function name

// Register the 'ai' command
cmd({
    pattern: "ai",
    desc: "AI chat.",
    category: "main",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup,
    sender, senderNumber, botNumber2, botNumber, pushname, isMe,
    isOwner, groupMetadata, groupName, participants, groupAdmins,
    isBotAdmins, isAdmins, reply
}) => {
    try {
        // Fetch the response from the API
        let data = await fetchJson(`https://chatgptforprabath-md.vercel.app/api/gptv1?q=${q}`);
        
        // Reply with the AI's response
        return reply(`${data.data}`);
        
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
