const { lite } = require("../marwld");

lite({
    pattern: "family",
    desc: "Casey Family",
    category: "fun",
    react: "👨‍👩‍👧‍👦",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    const familyList = `
         
      *╭┈──[ • RIDZ TECH 𝖥𝖠𝖬𝖨𝖫𝖸 • ]───•*
      *│  ◦* *▢➠*
      *│  ◦* *▢➠ Kelvin tech*
      *│  ◦* *▢➠ Jinx*
      *│  ◦* *▢➠ Terri Dev*
      *│  ◦* *▢➠ Rivozn Coder*
      *│  ◦* *▢➠ Kinna Tech*
      *│  ◦* *▢➠ And You*
      *╰┈───────────────•*
        *•────────────•⟢*
      Family is not about blood,It's about the people who choose to be there for you, support you, and love you unconditionally, no matter what. They're the ones who show up, who listen, and who care 🤗
    `;
    try {
        await conn.sendMessage(m.chat, {
            image: { url: "https://files.catbox.moe/qwpimr.png" },
            caption: familyList.trim()
        }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply("❌ *An error occurred while fetching the family list. Please try again.*");
    }
});