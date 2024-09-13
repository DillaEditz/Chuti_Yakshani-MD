const { fetchJson } = require('../lib/functions');
const config = require('../config');
const { cmd, commands } = require('../command');

let baseUrl;

(async () => {
  try {
    let baseUrlGet = await fetchJson('https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json');
    baseUrl = baseUrlGet.api;
  } catch (error) {
    console.error('Failed to fetch base URL:', error);
  }
})();

const yourName = "♻️ *~Powered by Chuti_Yakshani-MD~* ♻️";
//============with watermark==================
cmd({ 
     pattern: "tiktokw", 
     alias: ["ttw"], 
     desc: "Download TikTok videos", 
     category: "download", 
     filename: __filename }, 
    async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) return reply("*Please give me your link 🚫*\nExample: .tiktok (tiktok video link)");

    let data = await fetchJson(`${baseUrl}/api/tiktokdl?url=${q}`);
    reply("*Downloading... 📥*");

    if (data.data.wm) {
      await conn.sendMessage(from, {
        video: { url: data.data.wm },
        mimetype: "video/mp4",
        caption: `🚀 With-WATERMARK TIKTOK DOWNLOADER 🎵✨📥\n\n ${yourName}`
      }, { quoted: mek });
    }

  } catch (e) {
    console.error(e);
    reply(`Error: ${e.message}`);
  }
});

//============without watermark==================
cmd({ 
     pattern: "tiktok", 
     alias: ["tt"], 
     desc: "Download TikTok videos", 
     category: "download", 
     filename: __filename }, 
    async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) return reply("*Please give me your link 🚫*\nExample: .tiktok (tiktok video link)");

    let data = await fetchJson(`${baseUrl}/api/tiktokdl?url=${q}`);
    reply("*Downloading... 📥*");
    if (data.data.no_wm) {
      await conn.sendMessage(from, {
        video: { url: data.data.no_wm },
        mimetype: "video/mp4",
        caption: `🚀 NO-WATERMARK TIKTOK DOWNLOADER 🎵✨📥\n\n ${yourName}`
      }, { quoted: mek });
    }
  } catch (e) {
    console.error(e);
    reply(`Error: ${e.message}`);
  }
});
    //============tik song==================
cmd({ 
     pattern: "tiktokm", 
     alias: ["ttm"], 
     desc: "Download TikTok music", 
     category: "download", 
     filename: __filename }, 
    async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) return reply("*Please give me your link 🚫*\nExample: .tiktok (tiktok video link)");

    let data = await fetchJson(`${baseUrl}/api/tiktokdl?url=${q}`);
    reply("*Downloading... 📥*");
    if (data.data.audio) {
      await conn.sendMessage(from, {
        audio: { url: data.data.audio },
        mimetype: "audio/mpeg"
      }, { quoted: mek });
    }
  } catch (e) {
    console.error(e);
    reply(`Error: ${e.message}`);
  }
});
