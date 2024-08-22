const { cmd } = require('../command');
const fg = require('api-dylux');

cmd({
    pattern: "tiktok",
    desc: "Download TikTok videos",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("Please provide the TikTok video URL.");

        let down = await fg.ttdl(q);
        let downloadUrl = down.dl_url;

        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
