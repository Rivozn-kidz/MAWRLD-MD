const config = require('../config');
const { lite, commands } = require('../marwld');
const os = require("os");
const { runtime } = require('../lib/functions');
const axios = require('axios');
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

lite({
    pattern: "support",
    alias : "version",
    desc: " allmenu",
    category: "allmenu",
    react: "🏔️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

let dec = `    
⟣──────────────────⟢
▧ *ᴄʀᴇᴀᴛᴏʀ* : *Ridz Coder (🇺🇬🇿🇼)*
▧ *ᴍᴏᴅᴇ* : *${config.MODE}*
▧ *ᴘʀᴇғɪx* : *${config.PREFIX}*
▧ *ʀᴀᴍ* : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
▧ *ᴠᴇʀsɪᴏɴ* : *1.0.0* ⚡
▧ *ᴜᴘᴛɪᴍᴇ* : ${runtime(process.uptime())}

⟣──────────────────⟢

> MAWRLD MD 
https://github.com/Ridz-coder01/MAWRLD-MD
⟣──────────────────⟢
> CHANNEL🛠️

https://whatsapp.com/channel/0029VajohKp5a2498c8Dbl2Y

> GROUP 👥

https://chat.whatsapp.com/JgaAxg3I2Oy35Gdbk3Zvv2

> Ridz Coder *Dev🧑‍💻*

https://wa.me/+263714732501?text=MAWRLD-MD 

⟣──────────────────⟢

`;

await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/qwpimr.png` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363404529319592@newsletter',
                        newsletterName: '🏔️』 Airbyte Synergetic✧˚₊‧ Labs『🏔️',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send audio
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/a1sh4u.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
