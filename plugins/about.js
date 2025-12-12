const config = require('../config')
const {lite , commands} = require('../marwld')
lite({
    pattern: "ridzcoder",
    alias: ["coder","ridz"], 
    react: "👑",
    desc: "get owner dec",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, islite, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let about = `
*╭━━〔 RIDZ CODER INFO〕━━┈⊷*

*👋 HELLO ${pushname}*

*╰──────────────┈⊷*
*╭━━━〔  ABOUT  ME〕━━━┈⊷*
*┃★╭──────────────*
*┃★│* *Hello 👋, I am Ridz Coder.*
*┃★│* I laugh at everyone who laughs at me.
*┃★│* *I am the last thief*, but don't chase after me  
*┃★│* *because I will change myself
*┃★│* Ask them all and they will tell you:
*┃★│* • If you stand *behind me*, I protect you.
*┃★│* • If you stand *beside me*, I respect you. 
*┃★│* • But if you stand *against me*, I show *no mercy*.
*┃★╰──────────────*
*╰━━━━━━━━━━━━━━━┈⊷*
> *ᴀ sɪᴍᴘʟᴇ ᴡʜᴀᴛsᴀᴘᴘ ᴅᴇᴠᴇʟᴘᴏʀ*

*╭━━━〔 •SPECIAL THANKS FOR MY FRIENDS• 〕━━━┈⊷*
*┃★╭──────────────*
*┃★│* *▢KEVIN TECH*
*┃★│* *▢RIVONZ CODER*
*┃★│* *▢TERRI DEV*
*┃★│* *▢KING ORMAN*
*┃★╰──────────────*
*╰━━━━━━━━━━━━━━━┈⊷*

*•────────────•⟢*
> © 𝙱𝚁𝙾𝚄𝙶𝙷𝚃 𝚃𝙾 𝚈𝙾𝚄 𝙱𝚈 𝙼𝙰𝚆𝚁𝙻𝙳 𝙼𝙳
*•────────────•⟢*
`

await conn.sendMessage(from,{image:{url:`https://files.catbox.moe/qwpimr.png`},caption:about,
                             contextInfo: {
    mentionedJid: [m.sender],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363404529319592@newsletter',
      newsletterName: 'RIDZ TECH INC',
      serverMessageId: 999
    }
  }
}, { quoted: mek });
} catch (e) {
console.log(e)
reply(`${e}`)
}
})
