const { cmd } = require('../command');
const mediafireDl = require('node-mediafire-dl');

cmd({
    pattern: "mediafire",
    desc: "Download MediaFire files",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("Please provide the MediaFire file URL.");

        let downloadUrl = await mediafireDl(q);

        await conn.sendMessage(from, { document: { url: downloadUrl }, caption: "Downloaded from MediaFire" }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
