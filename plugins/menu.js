const fs = require('fs');
const config = require('../config');
const { lite, commands } = require('../marwld');
const axios = require('axios');
const os = require("os")
const {runtime} = require('../lib/functions')
lite(
  {
    pattern: "menu",
    react: "🍂",
    alias: ["allmenu"],
    desc: "Get command list",
    category: "main",
    filename: __filename
  },

  async (conn, mek, m, { from, quoted, pushname, reply }) => {
    try {

      let madeMenu = `
╭─❍ *${config.BOT_NAME} MENU* ⬡────⭓
├▢⬡ 🇺🇬 *Owner:* ${config.OWNER_NAME}
├▢⬡ 👤 *User:* ${pushname}
├▢⬡ ⏱️ *Runtime:* ${runtime(process.uptime())}
├▢⬡ 🌐 *Mode:* [${config.MODE}]
├▢⬡ ✨ *Prefix:* [${config.PREFIX}]
├▢⬡ 📦 *Total Commands:* ${commands.length}
├▢⬡ 📌 *Version:* ${config.VERSION} BETA
╰─────────────────────━━╯

 ╭──『🏔️ *SYSTEM/CORE MENU* 🏔️』──❏
 ├─∘❏ support 
 ├─∘❏ ridzcoder
 ├─∘❏ family 
 ├─∘❏ vv
 ├─∘❏ ping
 ├─∘❏ alive
 ├─∘❏ repo
 ├─∘❏ restart
 ├─∘❏ owner 
 ╰─────────────────────❏
 
╭────⬡🍂 *AUDIO EDITOR MENU* 🍂⬡────
├─∘❏ .bass
├─∘❏ .slow 
├─∘❏ .fast
├─∘❏ .reverse
├─∘❏ .baby
├─∘❏ .demon
├─∘❏ .earrape  
├─∘❏ .nightcore
├─∘❏ .robot
├─∘❏ .chipmunk
├─∘❏ .radio
├─∘❏ .blown 
├─∘❏ .tupai  
├─∘❏ .fat
├─∘❏ .smooth
├─∘❏ .deep
╰─────────────────────❏

 ╭────⬡🏔️ *ANIME MENU*🏔️ ⬡────
 ├─∘❏ fack
 ├─∘❏ truth
 ├─∘❏ dare
 ├─∘❏ dog
 ├─∘❏ awoo
 ├─∘❏ garl
 ├─∘❏ waifu
 ├─∘❏ neko
 ├─∘❏ megnumin
 ├─∘❏ neko
 ├─∘❏ maid
 ├─∘❏ loli
 ├─∘❏ animegirl
 ├─∘❏ animegirl1
 ├─∘❏ animegirl2
 ├─∘❏ animegirl3
 ├─∘❏ animegirl4
 ├─∘❏ animegirl5
 ├─∘❏ anime1
 ├─∘❏ anime2
 ├─∘❏ anime3
 ├─∘❏ anime4
 ├─∘❏ anime5
 ├─∘❏ animenews
 ├─∘❏ foxgirl
 ├─∘❏ naruto
 ╰─────────────────────❏*

 ╭─『🏔️ *AI & CONVERTER MENU* 🏔️』 ──❏
 ├─∘❏ openai
 ├─∘❏ deepseek
 ├─∘❏ ai
 ├─∘❏ toppt 
 ├─∘❏ tomp3
 ├─∘❏ convert 
 ├─∘❏ tts
 ╰─────────────────────❏
 
 ╭─『🍂 *FUN & PERSONALITY MENU* 🍂』─❏
 ├─∘❏ 8ball
 ├─∘❏ compliment
 ├─∘❏ lovetest
 ├─∘❏ emoji
 ├─∘❏ compatibility
 ├─∘❏ aura
 ├─∘❏ roast
 ├─∘❏ emoji
 ╰─────────────────────❏
 
╭──『🏔️ *LOGO MAKER MENU* 🏔️』──❏
├─∘❏  neonlight
├─∘❏  blackpink
├─∘❏  dragonball
├─∘❏  3dcomic
├─∘❏  america
├─∘❏  naruto
├─∘❏  sadgirl
├─∘❏  clouds
├─∘❏  futuristic
├─∘❏  3dpaper
├─∘❏  eraser
├─∘❏  sunset
├─∘❏  leaf
├─∘❏  galaxy
├─∘❏  sans
├─∘❏  boom
├─∘❏  hacker
├─∘❏  devilwings
├─∘❏  nigeria
├─∘❏  bulb
├─∘❏  angelwings
├─∘❏  zodiac
├─∘❏  luxury
├─∘❏  paint
├─∘❏  frozen
├─∘❏  castle
├─∘❏  tatoo
├─∘❏  valorant
├─∘❏  bear
├─∘❏  typography
├─∘❏  birthday
├─∘❏ Deadpool
├─∘❏ cat
├─∘❏ pornhub
├─∘❏ thor
╰─────────────────────❏

 ╭──『🍂 *IMG EDIT MENU* 🍂』──❏
 ├─∘❏ adedit
 ├─∘❏ greyedit
 ├─∘❏ bluredit
 ├─∘❏ invertedit
 ├─∘❏ jailedit
 ├─∘❏ joke
 ├─∘❏ Nokia
 ├─∘❏ removebg
 ├─∘❏ wanted
 ╰─────────────────────❏

 ╭─『🏔️ *SOCIAL MEDIA MENU* 🏔️』─❏
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
 ├─∘❏ play2
 ├─∘❏ playx
 ├─∘❏ yts
 ├─∘❏ video 
 ╰─────────────────────❏

 ╭─『🍂 *OWNER MENU* 🍂』───❏
 ├─∘❏ delete
 ├─∘❏ vcf
 ├─∘❏ antidelete
 ├─∘❏ shutdown
 ├─∘❏ broadcast 
 ├─∘❏ setpp
 ├─∘❏ clearchats
 ├─∘❏ gjid
 ├─∘❏ chid
 ├─∘❏ tempmail
 ├─∘❏ checkmail
 ├─∘❏ userinfo
 ├─∘❏ ch
 ╰─────────────────────❏
 
 ╭─『🏔️ *TOOLS AND UTILITIES MENU* 🏔️』──❏
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

 
 ╭──『🍂 *GROUP MANAGEMENT* 🍂』──❏
 ├─∘❏ unlockgc 
 ├─∘❏ unmute 
 ├─∘❏ tagall 
 ├─∘❏ out
 ├─∘❏ mute
 ├─∘❏ lockgc
 ├─∘❏ invite 
 ├─∘❏ leave 
 ├─∘❏ kickball
 ├─∘❏ join 
 ├─∘❏ ginfo
 ├─∘❏ updategname
 ├─∘❏ updategdesc
 ├─∘❏ rejectall
 ├─∘❏ acceptall
 ├─∘❏ requestlist
 ├─∘❏ takeadmin
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
              newsletterName: 'Airbyte Synergetic Labs 🍂',
              serverMessageId: 3
            }
          }
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`${e}`);
    }
  }
);