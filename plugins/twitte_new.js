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
//========================hd==================================================
cmd({ pattern: "twitter", 
     alias: ["twdl"], 
     desc: "Download Twitter videos", 
     category: "download", 
     filename: __filename }, 
    async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) return reply("*Please give me your link 🚫*\nExample: .twitter (twitter video link)");

    let data = await fetchJson(`${baseUrl}/api/twitterdl?url=${q}`);
    reply("*Downloading...*");

    if (data.data.data.HD) {
      await conn.sendMessage(from, {
        video: { url: data.data.data.HD },
        mimetype: "video/mp4",
        caption: `📺 TWITTER HD VIDEO 🚀✨🎥\n\n ${yourName}`
      }, { quoted: mek });
    }
  } catch (e) {
    console.error(e);
    reply(`Error: ${e.message}`);
  }
});

//========================sd==================================================
cmd({ pattern: "twittersd", 
     alias: ["twdlsd"], 
     desc: "Download Twitter videos", 
     category: "download", 
     filename: __filename }, 
    async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) return reply("*Please give me your link 🚫*\nExample: .twitter (twitter video link)");

    let data = await fetchJson(`${baseUrl}/api/twitterdl?url=${q}`);
    reply("*Downloading...*");

    if (data.data.data.SD) {
      await conn.sendMessage(from, {
        video: { url: data.data.data.SD },
        mimetype: "video/mp4",
        caption: `📱 TWITTER SD VIDEO 🎬⚡📥\n\n ${yourName}`
      }, { quoted: mek });
    }

  } catch (e) {
    console.error(e);
    reply(`Error: ${e.message}`);
  }
});

//========================sound==================================================
cmd({ pattern: "twitterm", 
     alias: ["twdlm"], 
     desc: "Download Twitter videos", 
     category: "download", 
     filename: __filename }, 
    async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) return reply("*Please give me your link 🚫*\nExample: .twitter (twitter video link)");

    let data = await fetchJson(`${baseUrl}/api/twitterdl?url=${q}`);
    reply("*Downloading...*");
    
    if (data.data.data.audio) {
      await conn.sendMessage(from, {
        audio: { url: data.data.data.audio },
        mimetype: "audio/mpeg"
      }, { quoted: mek });
    }
  } catch (e) {
    console.error(e);
    reply(`Error: ${e.message}`);
  }
});
