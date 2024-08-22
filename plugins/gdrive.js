const { cmd } = require('../command');
const { google } = require('googleapis');
const fs = require('fs');

// Set up Google Drive API (you'll need OAuth2 credentials)
const oauth2Client = new google.auth.OAuth2(
    YOUR_CLIENT_ID,
    YOUR_CLIENT_SECRET,
    YOUR_REDIRECT_URL
);
const drive = google.drive({ version: 'v3', auth: oauth2Client });

cmd({
    pattern: "gdrive",
    desc: "Download Google Drive files",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("Please provide the Google Drive file ID.");

        const fileId = q; // Use the file ID from the link

        const response = await drive.files.get({
            fileId: fileId,
            alt: 'media'
        }, { responseType: 'stream' });

        const filePath = `./downloads/${fileId}.file`; // Save the file locally

        response.data
            .on('end', () => {
                console.log('Downloaded file.');
                conn.sendMessage(from, { document: fs.readFileSync(filePath), fileName: `${fileId}.file`, caption: "Downloaded from Google Drive" }, { quoted: mek });
            })
            .on('error', err => {
                console.error('Error downloading file.', err);
                reply("Error downloading file.");
            })
            .pipe(fs.createWriteStream(filePath));

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
