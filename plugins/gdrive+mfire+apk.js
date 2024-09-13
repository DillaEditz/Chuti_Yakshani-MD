cmd({ 
  pattern: "gdrive", 
  alias: ["googledrive"], 
  desc: "Download Google Drive files", 
  category: "download", 
  filename: __filename }, 
    async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) return reply("*Please give me your link 🚫*\nExample: .gdrive (gdrive link)");

    let data = await fetchJson(`${baseUrl}/api/gdrivedl?url=${q}`);
    reply("*Downloading...*");

    if (data.data.download) {
      await conn.sendMessage(from, {
        document: { url: data.data.download },
        fileName: data.data.fileName,
        mimetype: data.data.mimeType,
        caption: `${data.data.fileName}\n\n${yourName}`
      }, { quoted: mek });
    }
  } catch (e) {
    console.error(e);
    reply(`Error: ${e.message}`);
  }
});

cmd({ pattern: "mediafire", 
     alias: ["mfire"], 
     desc: "Download MediaFire files", 
     category: "download", 
     filename: __filename }, 
    async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) return reply("*Please give me your link 🚫*\nExample: .mediafire (mediafire link)");

    let data = await fetchJson(`${baseUrl}/api/mediafiredl?url=${q}`);
    reply("*Downloading...*");

    if (data.data.link_1) {
      await conn.sendMessage(from, {
        document: { url: data.data.link_1 },
        fileName: data.data.name,
        mimetype: data.data.file_type,
        caption: `${data.data.name}\n\n${yourName}`
      }, { quoted: mek });
    }
  } catch (e) {
    console.error(e);
    reply(`Error: ${e.message}`);
  }
});
