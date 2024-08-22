const path = require('path');
const { cmd } = require('../command');

// Define a command handler function
const sendVoiceWithMsg = async (conn, mek, m, {
    from, quoted, pushname, command, reply
}) => {
    try {
        // Define audio file names and corresponding messages
        const audioFiles = {
            gm: { file: 'gm.mp3', message: `Good Morning, ${pushname}! 🌅` },
            gn: { file: 'gn.mp3', message: `Good Night, ${pushname}! 🌙` },
            mk: { file: 'mk.mp3', message: `Hello, ${pushname}! Have a great day!` },
            mn: { file: 'mn.mp3', message: `Good Evening, ${pushname}! 🌇` }
        };

        // Get the corresponding audio file and message for the command
        const { file, message } = audioFiles[command];

        // Define the path to the audio file
        const audioPath = path.join(__dirname, '../res/audio', file);

        // Send the audio file as a voice note
        await conn.sendMessage(from, {
            audio: { url: audioPath },
            mimetype: 'audio/mpeg',
            ptt: true // Set to true to send it as a voice note
        }, { quoted: mek });

        // Send the text message
        await conn.sendMessage(from, { text: message }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
};

// Register the commands
cmd({
    pattern: "gm",
    desc: "Send Good Morning voice note and message",
    category: "voicemsg",
    filename: __filename
}, sendVoiceWithMsg);

cmd({
    pattern: "gn",
    desc: "Send Good Night voice note and message",
    category: "voicemsg",
    filename: __filename
}, sendVoiceWithMsg);

cmd({
    pattern: "mk",
    desc: "Send Hello voice note and message",
    category: "voicemsg",
    filename: __filename
}, sendVoiceWithMsg);

cmd({
    pattern: "mn",
    desc: "Send Good Evening voice note and message",
    category: "voicemsg",
    filename: __filename
}, sendVoiceWithMsg);
