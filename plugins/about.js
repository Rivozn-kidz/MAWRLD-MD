const config = require('../config')
const {lite , commands} = require('../marwld')
lite({
    pattern: "ridzcoder",
    alias: ["coder","ridz"], 
    react: "🍂",
    desc: "get owner dec",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, islite, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let about = `
╭━━〔 ʀɪᴅᴢ ᴄᴏᴅᴇʀ ɪɴғᴏ〕━━┈⊷
┃★
┃★ •ʜᴇʟʟᴏ ${pushname} 👋, ɪ ᴀᴍ ʀɪᴅᴢ ᴄᴏᴅᴇʀ.
┃★ •ɪ ʟᴀᴜɢʜ ᴀᴛ ᴇᴠᴇʀʏᴏɴᴇ ᴡʜᴏ ʟᴀᴜɢʜs ᴀᴛ ᴍᴇ.
┃★ •ɪ ᴀᴍ ᴛʜᴇ ʟᴀsᴛ ᴛʜɪᴇғ, ʙᴜᴛ ᴅᴏɴ'ᴛ ᴄʜᴀsᴇ ᴀғᴛᴇʀ ᴍᴇ
┃★ •ʙᴇᴄᴀᴜsᴇ ɪ ᴡɪʟʟ ᴄʜᴀɴɢᴇ ᴍʏsᴇʟғ
┃★ •ᴀsᴋ ᴛʜᴇᴍ ᴀʟʟ ᴀɴᴅ ᴛʜᴇʏ ᴡɪʟʟ ᴛᴇʟʟ ʏᴏᴜ:
┃★ •ɪғ ʏᴏᴜ sᴛᴀɴᴅ ʙᴇʜɪɴᴅ ᴍᴇ, ɪ ᴘʀᴏᴛᴇᴄᴛ ʏᴏᴜ.
┃★ •ɪғ ʏᴏᴜ sᴛᴀɴᴅ ʙᴇsɪᴅᴇ ᴍᴇ, ɪ ʀᴇsᴘᴇᴄᴛ ʏᴏᴜ.
┃★ •ʙᴜᴛ ɪғ ʏᴏᴜ sᴛᴀɴᴅ ᴀɢᴀɪɴsᴛ ᴍᴇ, ɪ sʜᴏᴡ ɴᴏ ᴍᴇʀᴄʏ.
┃★
╰━━━━━━━━━━━━━━━┈⊷

> *ᴀ sɪᴍᴘʟᴇ ᴡʜᴀᴛsᴀᴘᴘ ᴅᴇᴠᴇʟᴘᴏʀ*

*╭━━━〔 • MY TOP FRIENDS• 〕━━━┈⊷*
*┃★╭──────────────*
*┃★│* *▢KEVIN TECH*
*┃★│* *▢JINX*
*┃★│* *▢TERRI DEV*
*┃★│* *▢KING ORMAN*
*┃★╰──────────────*
*╰━━━━━━━━━━━━━━━┈⊷*

*•────────────•⟢*
> © 𝙱𝚁𝙾𝚄𝙶𝙷𝚃 𝚃𝙾 𝚈𝙾𝚄 𝙱𝚈 𝙼𝙰𝚆𝚁𝙻𝙳 𝙼𝙳🍂
*•────────────•⟢*
`

await conn.sendMessage(from,{image:{url:`https://files.catbox.moe/qwpimr.png`},caption:about,
                             contextInfo: {
    mentionedJid: [m.sender],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363404529319592@newsletter',
      newsletterName: 'Airbyte Synergetic Labs 🍂',
      serverMessageId: 999
    }
  }
}, { quoted: mek });
} catch (e) {
console.log(e)
reply(`${e}`)
}
})
