const config = require('../config');
const { lite, commands } = require('../marwld');
const { runtime } = require('../lib/functions');

lite({
    pattern: "menu2",
    desc: "bot menu",
    category: "menu",
    react: "🐇",
    filename: __filename
}, async (conn, mek, m, { from, pushname, reply }) => {
    try {
        const totalCommands = Object.keys(commands).length;
        const time = runtime(process.uptime());

        const dec = `🎀 *VERONICA AI* 🎀

⭐ BOT NAME : VERONICA MINI
👤 USER : ${pushname}
📌 PREFIX : ${config.PREFIX}
⏱️ UPTIME : ${time}
📦 COMMANDS : ${totalCommands}
👨‍💻 DEV : terri
🌐 HOST : Heroku

≡ select a category below:
`;

        const listMessage = {
            text: dec,
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
                        { title: "👤 Owner", description: "Bot owner info", rowId: `${config.PREFIX}owner` },
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
        };

        await conn.sendMessage(from, listMessage);

    } catch (e) {
        console.log(e);
        reply(String(e));
    }
});