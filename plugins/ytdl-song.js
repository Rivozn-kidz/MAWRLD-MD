const axios = require('axios');
const config = require('../config');
const { lite } = require('../marwld');

lite({
    pattern: "play",
    alias: ["s", "song"],
    react: "🎵",
    desc: "Download MP3 from YouTube",
    category: "download",
    use: ".song <Text or YT URL>",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a query or YouTube URL!");

        const apiUrl = `https://api.privatezia.biz.id/api/downloader/ytplaymp3?query=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data?.result) {
            return reply("❌ Failed to get data from API.");
        }

        const res = data.result;

        const caption =
            `🎵 *SONG DOWNLOADER*\n\n` +
            `✨ *Title:* ${res.title}\n` +
            `📀 *Quality:* ${res.quality}\n` +
            `⏳ *Duration:* ${res.duration} sec\n` +
            `🖇 *Video URL:* ${res.videoUrl}\n\n` +
            `${config.FOOTER || "𝙼𝙰𝚆𝚁𝙻𝙳 𝙼𝙳"}`;

        // Send Thumbnail + caption
        await conn.sendMessage(from, {
            image: { url: res.thumbnail },
            caption
        }, { quoted: mek });

        await conn.sendMessage(from, {
            document: { url: res.downloadUrl },
            fileName: `${res.title}.mp3`,
            mimetype: "audio/mpeg",
            caption: res.title
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (e) {
        console.error("Error in .song command:", e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply(`❌ Error: ${e.message}`);
    }
});