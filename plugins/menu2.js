const fs = require('fs');
const path = require('path');
const config = require('../config');
const { lite, commands } = require('../marwld');
const { runtime } = require('../lib/functions');

const getRandomChristmasImage = () => {
    try {
        const srcPath = path.join(__dirname, '../src/christmas'); // put Christmas images here
        const files = fs.readdirSync(srcPath);
        const images = files.filter(f => /\.(jpe?g|png)$/i.test(f));
        return images.length ? path.join(srcPath, images[Math.floor(Math.random() * images.length)]) : 'https://files.catbox.moe/qwpimr.png';
    } catch {
        return 'https://files.catbox.moe/qwpimr.png';
    }
};

lite({
    pattern: "christmas",
    react: "🎄",
    desc: "Christmas greetings menu",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, pushname, reply }) => {
    try {
        const time = runtime(process.uptime());

        const caption = `🎄 *Merry Christmas, ${pushname}!*
🌟 May your holidays be filled with joy and love! 🌟

╭─❍ *${config.BOT_NAME} Christmas Menu* ⬡────⭓
├▢⬡ Owner: ${config.OWNER_NAME}
├▢⬡ User: ${pushname}
├▢⬡ Runtime: ${time}
├▢⬡ Mode: ${config.MODE}
├▢⬡ Prefix: ${config.PREFIX}
├▢⬡ Version: ${config.VERSION}
╰─────────────────────━━╯
`;

        // Verified contact
        const verifiedContact = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: config.BOT_NAME,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${config.BOT_NAME}\nORG:${config.OWNER_NAME};\nTEL;type=CELL;type=VOICE;waid=${config.OWNER_NUMBER}:${config.OWNER_NUMBER}\nEND:VCARD`
                }
            }
        };

        await conn.sendMessage(
            from,
            {
                image: { url: getRandomChristmasImage() },
                caption,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    mentionedJid: [m.sender],
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363404529319592@newsletter',
                        newsletterName: 'Holiday Greetings 🎅',
                        serverMessageId: 1
                    }
                }
            },
            { quoted: verifiedContact }
        );

        // Optional festive audio
        await conn.sendMessage(
            from,
            {
                audio: { url: 'https://files.catbox.moe/27t3h4.mp3' }, // your Christmas jingle
                mimetype: 'audio/mp4',
                ptt: true
            },
            { quoted: verifiedContact }
        );

    } catch (e) {
        console.error(e);
        reply(String(e));
    }
});