const axios = require('axios');
const { cmd, commands } = require('../command');

cmd({
    'pattern': 'shorturl',
    'desc': 'Create a short URL using TinyURL API.',
    'category': 'convert',
    'filename': __filename
}, async (_bot, message, args, { from, reply, q }) => {
    try {
        if (!q) return reply('⚠️ Please provide a URL to shorten.');

        const originalURL = q.trim();
        const apiUrl = 'https://tinyurl.com/api-create.php?url=' + encodeURIComponent(originalURL);
        const response = await axios.get(apiUrl);
        const shortenedURL = response.data;

        const replyMessage = '\n🔗 **URL Shortener**\n\n🌐 **Original URL:** ' + originalURL + '\n✂️ **Shortened URL:** ' + shortenedURL + '\n\nYou can now use this short URL to share your link more easily! 🌟\n\nQUEEN ANJU MD\n';
        await _bot.sendMessage(from, { 'text': replyMessage }, { 'quoted': message });
    } catch (error) {
        console.error('Error shortening URL:', error.message);
        reply('❌ An error occurred while shortening the URL: ' + error.message);
    }
});
