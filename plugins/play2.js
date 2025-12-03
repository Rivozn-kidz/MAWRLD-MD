const axios = require('axios');
const { lite } = require('../marwld');
const ytsearch = require('yt-search');

lite({
    pattern: "play2",
    alias: ["playx"],
    react: "🔮",
    desc: "Download YouTube content with options",
    category: "download",
    use: ".play3 <Youtube URL or Name>",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    if (!q) return reply("❌ Please provide a YouTube URL or video name.");

    try {
        const yt = await ytsearch(q);
        if (!yt.results || yt.results.length === 0) return reply("❌ No results found!");

        const yts = yt.results[0];

        const ytMsg = 
`╭─❍ 🎬 *MAWRLD MD YOUTUBE DL* ⬡────⭓
├▢⬡ 
├▢⬡ 📌 *Title:* ${yts.title}
├▢⬡ ⏱ *Duration:* ${yts.timestamp}
├▢⬡ 👁 *Views:* ${yts.views}
├▢⬡ ✍ *Author:* ${yts.author.name}
├▢⬡ 
╰─────────────────────━━╯

📌 *Reply with a number to download:*
1. Video (MP4)
2. Audio (MP3)
3. Voice Note (PTT)
4. Document (MP4)
5. Document (MP3)
> *© 𝙱𝚁𝙾𝚄𝙶𝙷𝚃 𝚃𝙾 𝚈𝙾𝚄 𝙱𝚈 𝙼𝙰𝚆𝚁𝙻𝙳 𝙼𝙳;

        // Send thumbnail + caption
        const sentMsg = await conn.sendMessage(from, { image: { url: yts.thumbnail }, caption: ytMsg }, { quoted: mek });
        const messageID = sentMsg.key.id;
        let responded = false;

        const replyHandler = async (msgData) => {
            const receivedMsg = msgData.messages[0];
            if (!receivedMsg.message || responded) return;

            const receivedText = receivedMsg.message.conversation ||
                                 receivedMsg.message.extendedTextMessage?.text;
            const senderID = receivedMsg.key.remoteJid;
            const isReplyToBot = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;

            if (!isReplyToBot || senderID !== from) return;
            if (!['1','2','3','4','5'].includes(receivedText)) {
                await conn.sendMessage(from, { text: "❌ Invalid option! Reply with 1,2,3,4,5." }, { quoted: receivedMsg });
                return;
            }

            responded = true;
            conn.ev.off("messages.upsert", replyHandler);
            await conn.sendMessage(from, { react: { text: '⬇️', key: receivedMsg.key } });

            try {
                // Use private Zia API
                const apiRes = await axios.get(`https://api.privatezia.biz.id/api/downloader/ytplaymp3?query=${encodeURIComponent(yts.url)}`);
                const apiData = apiRes.data;

                if (!apiData.result?.downloadUrl) throw new Error("Failed to get download URL");

                const downloadUrl = apiData.result.downloadUrl;
                const sanitizedTitle = yts.title.replace(/[^\w\s]/gi, '').substring(0,50);

                switch (receivedText) {
                    case "1": // Video
                        await conn.sendMessage(from, { video: { url: downloadUrl }, caption: `🎬 ${sanitizedTitle}` }, { quoted: receivedMsg });
                        break;
                    case "2": // Audio MP3
                        await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg", fileName: `${sanitizedTitle}.mp3` }, { quoted: receivedMsg });
                        break;
                    case "3": // Voice Note (PTT)
                        await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/ogg; codecs=opus", ptt: true, fileName: `${sanitizedTitle}.opus` }, { quoted: receivedMsg });
                        break;
                    case "4": // Document MP4
                        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "video/mp4", fileName: `${sanitizedTitle}.mp4` }, { quoted: receivedMsg });
                        break;
                    case "5": // Document MP3
                        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mpeg", fileName: `${sanitizedTitle}.mp3` }, { quoted: receivedMsg });
                        break;
                }
            } catch (err) {
                console.error("Download error:", err);
                await conn.sendMessage(from, { text: "❌ Failed to download. Try again later." }, { quoted: receivedMsg });
            }
        };

        conn.ev.on("messages.upsert", replyHandler);
        setTimeout(() => { if (!responded) conn.ev.off("messages.upsert", replyHandler); }, 60000);

    } catch (err) {
        console.error(err);
        reply("❌ An error occurred. Please try again later.");
    }
});