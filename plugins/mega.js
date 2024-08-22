const { cmd } = require('../command');
const mega = require('megajs');

cmd({
    pattern: "mega",
    desc: "Download Mega files",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("Please provide the Mega file URL.");

        const file = mega.File.fromURL(q);
        file.download((err, stream) => {
            if (err) {
                console.log(err);
                reply("Error downloading from Mega.");
                return;
            }

            const filePath = `./downloads/${file.name}`;
            const writeStream = fs.createWriteStream(filePath);

            stream.pipe(writeStream).on('finish', () => {
                conn.sendMessage(from, { document: fs.readFileSync(filePath), fileName: file.name, caption: "Downloaded from Mega" }, { quoted: mek });
            });
        });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
