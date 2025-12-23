const config = require('../config');
const { lite, commands } = require('../marwld');
const { runtime } = require('../lib/functions');
const fs = require('fs');
const path = require('path');

const getRandomImage = () => {
    try {
        const srcPath = path.join(__dirname, '../src');
        const files = fs.readdirSync(srcPath);
        const images = files.filter(f =>
            f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg')
        );
        if (!images.length) return 'https://files.catbox.moe/y3j3kl.jpg';
        return path.join(srcPath, images[Math.floor(Math.random() * images.length)]);
    } catch {
        return 'https://files.catbox.moe/mn9fgn.jpg';
    }
};

lite ({
    pattern: "menu2",
    desc: "menu the bot",
    category: "menu",
    react: "🐇",
    filename: __filename
}, async (conn, mek, m, {
    from, pushname, reply
}) => {
    try {
        const totalCommands = Object.keys(commands).length;
        const time = runtime(process.uptime());

        const caption = `🌟 *Good ${
            new Date().getHours() < 12 ? 'Morning' :
            new Date().getHours() < 18 ? 'Afternoon' : 'Evening'
        }, ${pushname}!* 🌟

╭━《 *𝐕𝐄𝐑𝐎𝐍𝐈𝐂𝐀 𝐀𝐈* 》━┈⊷
┃❍ User : ${pushname}
┃❍ Commands : ${totalCommands}
┃❍ Platform : Heroku
┃❍ Developer : terri
┃❍ Mode : ${config.MODE}
┃❍ Prefix : ${config.PREFIX}
┃❍ Runtime : ${time}
┃❍ Version : 1.0.0
╰━━━━━━━━━━━━━━━┈⊷

≡ select a category below:`;


        const verifiedContact = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "𝐕𝐄𝐑𝐎𝐍𝐈𝐂𝐀 𝐀𝐈",
                    vcard:
                        "BEGIN:VCARD\n" +
                        "VERSION:3.0\n" +
                        "FN: VERONICA AI\n" +
                        "ORG:Terri Bot;\n" +
                        "TEL;type=CELL;type=VOICE;waid=256784670936:+256784670936\n" +
                        "END:VCARD"
                }
            }
        };

        // IMAGE MESSAGE
        await conn.sendMessage(
            from,
            {
                image: { url: getRandomImage() },
                caption: caption,
                contextInfo: {
                    forwardingScore: 5,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363397100406773@newsletter',
                        newsletterName: "𝗩𝗘𝗥𝗢𝗡𝗜𝗖𝗔 𝗔𝗜",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: verifiedContact }
        );

        // LIST MENU
        await conn.sendMessage(from, {
            text: caption,
            footer: "POWERED BY VERONICA AI",
            title: "📂 SELECT A CATEGORY",
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
                        { title: "👤 Owner", description: "Owner information", rowId: `${config.PREFIX}owner` },
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
            ]
        }, { quoted: verifiedContact });

        // AUDIO PTT
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/i9g2jx.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: verifiedContact });

    } catch (e) {
        console.log(e);
        reply(String(e));
    }
});