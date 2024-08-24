const { cmd } = require('../command');
const axios = require('axios');
const cheerio = require('cheerio');

const apiKey = '8fbe9a223bda94611786d6fc7af44ebf';  // Replace with your ScraperAPI key

// Helper function to scrape TikTok video data
async function scrapeTikTokVideo(url) {
    const encodedUrl = encodeURIComponent(url);
    const apiUrl = `https://api.scraperapi.com?api_key=${apiKey}&url=${encodedUrl}`;

    try {
        const response = await axios.get(apiUrl);
        return response.data;  // HTML content of the TikTok page
    } catch (error) {
        console.error('Error fetching TikTok page:', error);
        throw new Error('Failed to fetch TikTok page.');
    }
}

// Helper function to extract video data from HTML
function extractTikTokData(html) {
    const $ = cheerio.load(html);

    // Example selectors; you need to adjust these based on actual HTML structure
    const title = $('meta[name="description"]').attr('content');
    const videoUrl = $('video').attr('src');

    return { title, videoUrl };
}

// Register the 'tiktok' command
cmd({
    pattern: "tiktok",
    desc: "Download TikTok videos",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, q, reply }) => {
    try {
        if (!q) return reply("Please provide the TikTok video URL.");

        // Fetch and scrape the TikTok video page
        const html = await scrapeTikTokVideo(q);
        const data = extractTikTokData(html);

        if (!data.videoUrl) {
            return reply("Failed to extract video URL.");
        }

        // Send the video to the user
        await conn.sendMessage(from, { video: { url: data.videoUrl }, mimetype: "video/mp4" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message}`);
    }
});
