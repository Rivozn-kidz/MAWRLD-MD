const fs = require('fs');
const config = require('../config');
const { lite, commands } = require('../marwld');
const axios = require('axios');

lite(
  {
    pattern: "menu",
    react: "🔮",
    alias: ["allmenu"],
    desc: "Get command list",
    category: "main",
    filename: __filename
  },

  async (conn, mek, m, { from, quoted, pushname, reply }) => {
    try {

      let madeMenu = `
╭─❍ *${config.BOT_NAME} MENU*
│ ⬡➤👤 User: ${pushname}
│ ⬡➤ 🌐 Mode: [${config.MODE}]
│ ⬡➤ ✨ Prefix: [${config.PREFIX}]
│ ⬡➤ 📦 Total Commands: ${commands.length}
│ ⬡➤ 📌 Version: ${config.VERSION} BETA
╰─────────────────────━━╯

 ╭──『 *SYSTEM/CORE MENU* 』──❏
 ├─∘❏ menu
 ├─∘❏ vv
 ├─∘❏ ping
 ├─∘❏ alive
 ├─∘❏ repo
 ├─∘❏ restart
 ├─∘❏ owner 
 ╰─────────────────────❏
 
 ╭─『 *AI & CONVERTER MENU* 』 ──❏
 ├─∘❏ openai
 ├─∘❏ deepseek
 ├─∘❏ ai
 ├─∘❏ toppt 
 ├─∘❏ tomp3
 ├─∘❏ convert 
 ├─∘❏ tts
 ╰─────────────────────❏
 
 ╭─『 *FUN & PERSONALITY MENU* 』─❏
 ├─∘❏ 8ball
 ├─∘❏ compliment
 ├─∘❏ lovetest
 ├─∘❏ emoji
 ├─∘❏ compatibility
 ├─∘❏ aura
 ├─∘❏ roast
 ├─∘❏ emoji
 ╰─────────────────────❏
 
 ╭─『 *SOCIAL MEDIA MENU* 』─❏
 ├─∘❏ facebook
 ├─∘❏ facebook2
 ├─∘❏ instagram 
 ├─∘❏ instagram2
 ├─∘❏ instagram3
 ├─∘❏ instagram4
 ├─∘❏ gitclone 
 ├─∘❏ tiktok 
 ├─∘❏ tiktok2 
 ├─∘❏ tiktok3 
 ├─∘❏ tiktoksearch
 ├─∘❏ play
 ├─∘❏ yts
 ├─∘❏ video 
 ╰─────────────────────❏

 ╭─『 *OWNER MENU* 』───❏
 ├─∘❏ delete
 ├─∘❏ vcf
 ├─∘❏ antidelete
 ├─∘❏ shutdown
 ├─∘❏ broadcast 
 ├─∘❏ setpp
 ├─∘❏ clearchats
 ├─∘❏ gjid
 ╰─────────────────────❏
 
 ╭─『 *TOOLS AND UTILITIES MENU* 』──❏
 ├─∘❏ cringe 
 ├─∘❏ poke 
 ├─∘❏ dance 
 ├─∘❏ kill
 ├─∘❏ slap 
 ├─∘❏ kiss 
 ├─∘❏ glomp
 ├─∘❏ happy
 ├─∘❏ wink
 ├─∘❏ smile
 ├─∘❏ wave
 ├─∘❏ nom
 ├─∘❏ highfive 
 ├─∘❏ handhold 
 ├─∘❏ blush
 ├─∘❏ bonk
 ├─∘❏ yeet
 ├─∘❏ smug
 ├─∘❏ pat
 ├─∘❏ lick
 ├─∘❏ awoo
 ├─∘❏ hug
 ├─∘❏ bully
 ├─∘❏ cuddle 
 ├─∘❏ cry
 ├─∘❏ bite
 ╰─────────────────────❏

> ${config.DESCRIPTION}
`;

      await conn.sendMessage(
        from,
        {
          image: { url: config.MENU_IMAGE_URL },
          caption: madeMenu,
          contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363404529319592@newsletter',
              newsletterName: 'Ridz Tech Inc',
              serverMessageId: 143
            }
          }
        },
        { quoted: mek }
      );

      await conn.sendMessage(
        from,
        {
          audio: fs.readFileSync('./all/menu.m4a'),
          mimetype: 'audio/mp4',
          ptt: true
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`${e}`);
    }
  }
);