const config = require('../config');
const { lite, commands } = require('../marwld');
const { runtime } = require('../lib/functions');
const fs = require('fs');
const path = require('path');

const getRandomImage = () => {
    try {
        const srcPath = path.join(__dirname, '../src');
        const files = fs.readdirSync(srcPath);
        const images = files.filter(f => /\.(jpe?g|png)$/i.test(f));
        return images.length ? path.join(srcPath, images[Math.floor(Math.random() * images.length)]) : 'https://files.catbox.moe/y3j3kl.jpg';
    } catch {
        return 'https://files.catbox.moe/mn9fgn.jpg';
    }
};

lite({
    pattern: "veronica",
    desc: "bot menu",
    category: "menu",
    react: "🐇",
    filename: __filename
}, async (conn, mek, m, { from, pushname, reply }) => {
    try {
        const totalCommands = Object.keys(commands).length;
        const time = runtime(process.uptime());

        const caption = `🌟 *Good ${
            new Date().getHours() < 12 ? 'Morning' :
            new Date().getHours() < 18 ? 'Afternoon' : 'Evening'
        }, ${pushname}!* 🌟

╭━《 *𝐕𝐄𝐑𝐎𝐍𝐈𝐂𝐀 𝐀𝐈* 》━┈⊷
┃▸ User : ${pushname}
┃▸ Commands : ${totalCommands}
┃▸ Platform : Heroku
┃▸ Developer : terri
┃▸ Mode : ${config.MODE}
┃▸ Prefix : ${config.PREFIX}
┃▸ Runtime : ${time}
┃▸ Version : 1.0.0
╰━━━━━━━━━━━━━━━┈⊷

≡ select a category below:`;

        const verifiedContact = {
            key: { fromMe: false, participant: "0@s.whatsapp.net", remoteJid: "status@broadcast" },
            message: { contactMessage: { displayName: "VERONICA AI", vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:VERONICA AI\nORG:Terri Bot;\nTEL;type=CELL;type=VOICE;waid=256784670936:+256784670936\nEND:VCARD" } }
        };

        // IMAGE + LIST MENU
        await conn.sendMessage(from, {
            image: { url: getRandomImage() },
            caption,
            footer: "POWERED BY VERONICA AI",
            buttonText: "OPEN MENU",
            sections: [
                {
                    title: "📁 MAIN",
                    rows: [
                        { title: "📜 Menu", description: "View all commands", rowId: `${config.PREFIX}menu` },
                        { title: "⚡ Ping", description: "Bot speed", rowId: `${config.PREFIX}ping` }
                    ]
                },
                {
                    title: "👑 OWNER",
                    rows: [
                        { title: "👤 Owner", description: "Owner info", rowId: `${config.PREFIX}owner` },
                        { title: "⚙️ Settings", description: "Bot settings", rowId: `${config.PREFIX}settings` }
                    ]
                },
                {
                    title: "🧩 TOOLS",
                    rows: [
                        { title: "🖼️ Sticker", description: "Create stickers", rowId: `${config.PREFIX}sticker` },
                        { title: "🎵 Audio", description: "Audio tools", rowId: `${config.PREFIX}audio` }
                    ]
                }
            ],
            contextInfo: {
                forwardingScore: 5,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363397100406773@newsletter',
                    newsletterName: "VERONICA AI",
                    serverMessageId: 143
                }
            }
        }, { quoted: verifiedContact });

   

    } catch (e) {
        console.log(e);
        reply(String(e));
    }
});