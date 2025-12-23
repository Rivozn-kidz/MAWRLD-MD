const axios = require('axios');
const config = require('../config');
const { lite } = require('../marwld');

lite({
    pattern: "play",
    alias: ["s", "song"],
    react: "🏔️",
    desc: "Download MP3 from YouTube",
    category: "download",
    use: ".song <Text or YT URL>",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        if (!q) return await reply("❌ Please provide a query or YouTube URL!");

        const apiUrl = `https://api.privatezia.biz.id/api/downloader/ytplaymp3?query=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data?.result) {
            return await reply("❌ Failed to get data from API.");
        }

        const res = data.result;

        const caption = 
`╭─❍  *MAWRLD MD SONG DL*  ⬡────⭓
├▢⬡ 
├▢⬡ 🏔️ *Title:* ${res.title}
├▢⬡ 🏔️ *Quality:* ${res.quality || "Unknown"}
├▢⬡ 🏔️ *Duration:* ${res.duration || "Unknown"} sec
├▢⬡ 🏔️ *Video URL:* ${res.videoUrl || q}
├▢⬡ 
╰─────────────────────━━╯
${config.FOOTER || "𝙱𝚁𝙾𝚄𝙶𝙷𝚃 𝚃𝙾 𝚈𝙾𝚄 𝙱𝚈 𝙼𝙰𝚆𝚁𝙻𝙳 𝙼𝙳🏔️"}`;

        // Send thumbnail + caption
        await conn.sendMessage(from, {
            image: { url: res.thumbnail },
            caption
        }, { quoted: mek });

        // Send MP3 file
        await conn.sendMessage(from, {
            document: { url: res.downloadUrl },
            fileName: `${res.title}.mp3`,
            mimetype: "audio/mpeg"
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (e) {
        console.error("Error in .song command:", e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        await reply(`❌ Error: ${e.message}`);
    }
});