const axios = require('axios');
const { cmd, commands } = require('../command');

cmd({
    pattern: "gitrepo",
    desc: "Fetch information about a GitHub repository.",
    category: "other",
    react: "📁",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const repo = args.join(' ');
        if (!repo) {
            return reply("Please provide a GitHub repository name in the format `owner/repo`.");
        }

        const apiUrl = `https://api.github.com/repos/${repo}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let repoInfo = `👹️ *_Chuti_Yakshani-Md Git Repo Info_* 👹️\n\n`;
        repoInfo += `📌 *Name*: ${data.name}\n\n`;
        repoInfo += `🔗 *URL*: ${data.html_url}\n\n`;
        repoInfo += `📝 *Description*: ${data.description}\n\n`;
        repoInfo += `⭐ *Stars*: ${data.stargazers_count}\n\n`;
        repoInfo += `🍴 *Forks*: ${data.forks_count}\n\n`;
        repoInfo += `\n`;
        repoInfo += `♻️ *~Powered by Chuti_Yakshani-MD~* ♻️ \n`;

        await conn.sendMessage(from, { text: repoInfo }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching repository info: ${e.message}`);
    }
});
