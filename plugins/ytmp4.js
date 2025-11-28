const axios = require('axios');
const config = require('../settings');
const { lite } = require('../lite');

lite({
    pattern: "ytvideo",
    alias: ["ytv", "video"],
    react: "📹",
    desc: "Download YouTube Video using PrivateZia API",
    category: "download",
    use: ".ytvideo <Text or YouTube URL>",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a query or YouTube URL!");

        const apiUrl = `https://api.privatezia.biz.id/api/downloader/ytplaymp4?query=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data?.result) {
            return reply("❌ Failed to fetch video from PrivateZia API.");
        }

        const res = data.result;

        const caption =
            `📹 *YOUTUBE VIDEO DOWNLOADER*\n\n` +
            `🎬 *Title:* ${res.title}\n` +
            `📀 *Quality:* ${res.quality}\n` +
            `⏳ *Duration:* ${res.duration} sec\n` +
            `🖇 *Video URL:* ${res.videoUrl}\n\n` +
            `${config.FOOTER || "ʟɪᴛᴇ-xᴅ"}`;

        // Send Thumbnail Preview
        await conn.sendMessage(from, {
            image: { url: res.thumbnail },
            caption
        }, { quoted: mek });

        // Send MP4 Video File
        await conn.sendMessage(from, {
            video: { url: res.downloadUrl },
            mimetype: "video/mp4",
            caption: res.title
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (e) {
        console.error("Error in ytvideo command:", e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply(`❌ Error: ${e.message}`);
    }
});