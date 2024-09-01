const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "quote",
    desc: "Get a random inspiring quote.",
    category: "fun",
    react: "💬",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const response = await axios.get('https://api.quotable.io/random');
        const quote = response.data;
        const message = `👹️ *_Chuti_Yakshani-Md Quotes_* 👹️

💬 "${quote.content}"

- ${quote.author}

♻️ *~Powered by Chuti_Yakshani-MD~* ♻️`;
        return reply(message);
    } catch (e) {
        console.error("Error fetching quote:", e);
        reply("Could not fetch a quote. Please try again later.");
    }
});
