const config = require('../config');
const { cmd, commands } = require('../command');
const axios = require('axios');

// Command definition
cmd({
    'pattern': 'tech', // Command pattern (keyword)
    'desc': 'Get random technology facts or latest tech news with images.', // Description of the command
    'category': 'other', // Command category
    'react': '💻', // Reaction emoji when the command is triggered
    'filename': __filename // The filename of the current script
}, async (_context, _message, _args, {
    from: userId, quoted: quotedMessage, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        // Randomly decide whether to send a tech fact or tech news (70% chance for news)
        const selection = Math.random() < 0.7 ? 'news' : 'fact';
        let messageContent, imageUrl = { 'url': config['ALIVE_IMG'] };

        if (selection === 'fact') {
            // List of tech facts
            const facts = [
                '🏋️ The first electronic computer ENIAC weighed more than 27 tons.',
                '💾 The first hard drive could store just 5 MB of data.',
                '🖱️ The first computer mouse was made of wood.',
                '🦠 The first computer virus was created in 1983.',
                '🎮 The first computer game was created in 1961.',
                '💰 About 90% of the world\'s currency is digital.',
                '📷 The first webcam was created to check the status of a coffee pot.',
                '🌐 More than 570 new websites are created every minute.',
                '👩‍💻 The first computer programmer was a woman named Ada Lovelace.',
                '⌨️ The QWERTY keyboard layout was designed to slow typing speed.'
            ];

            // Select a random fact from the list
            const randomFact = facts[Math.floor(Math.random() * facts.length)];
            messageContent = '🖥️ Tech Fact of the Day:\n\n' + randomFact;

        } else {
            // Fetch the latest tech news from the News API
            const response = await axios.get('https://newsapi.org/v2/top-headlines', {
                'params': {
                    'country': 'us',
                    'category': 'technology',
                    'apiKey': '90da227bbcf044439798ff32ae8b6fc6'
                }
            });

            // Extract the first article from the news response
            const article = response['data']['articles'][0];
            messageContent = '📰 Breaking Tech News 🚨\n\n🔥 ' + article['title'] + '\n\n📝 ' + article['description'] + '\n\n🔗 Read more: ' + article['url'] + '\n\n QUEEN ANJU MD';

            // If the article has an image, use it
            if (article['urlToImage']) {
                imageUrl = { 'url': article['urlToImage'] };
            }
        }

        // Send the selected message (fact or news) with the corresponding image
        await _context['sendMessage'](userId, {
            'image': imageUrl,
            'caption': messageContent
        }, { 'quoted': quotedMessage });

    } catch (error) {
        console.error(error);
        reply('🚫 Oops! Something went wrong: ' + error['message']);
    }
});
