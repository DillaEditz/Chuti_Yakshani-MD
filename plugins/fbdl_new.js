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
//=============hd=====================
cmd({ pattern: "fbhd", 
     alias: ["facebookhd"], 
     desc: "Download Hd FB videos", 
     category: "download", 
     filename: __filename }, 
    async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) return reply("*Please give me your link 🚫*\nExample: .fb (fb video link)");

    let data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`);
    reply("*Downloading... 📥*");

    if (data.data.hd) {
      await conn.sendMessage(from, {
        video: { url: data.data.hd },
        mimetype: "video/mp4",
        caption: `📺 FB HD VIDEO 🚀✨🎥\n\n ${yourName}`
      }, { quoted: mek });
    }
  } catch (e) {
    console.error(e);
    reply(`Error: ${e.message}`);
  }
});
//==================sd============================
cmd({ pattern: "fbsd", 
     alias: ["facebooksd"], 
     desc: "Download SD FB videos", 
     category: "download", 
     filename: __filename }, 
    async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) return reply("*Please give me your link 🚫*\nExample: .fb (fb video link)");

    let data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`);
    reply("*Downloading... 📥*");
    if (data.data.sd) {
      await conn.sendMessage(from, {
        video: { url: data.data.sd },
        mimetype: "video/mp4",
        caption: `📱 FB SD VIDEO 🎬⚡📥\n\n ${yourName}`
      }, { quoted: mek });
    }
  } catch (e) {
    console.error(e);
    reply(`Error: ${e.message}`);
  }
});
