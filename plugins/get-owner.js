const { lite } = require('../marwld');
const config = require('../config');

lite({
    pattern: "owner",
    react: "🔮", 
    desc: "Get owner number",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER;
        const ownerName = config.OWNER_NAME;

        const caption = 
`*Hello 👋, I am Ridz Coder.*

_I laugh at everyone who laughs at me._

*I am the last thief*, but don't chase after me  
because I will change myself.

Ask them all and they will tell you:

• If you stand *behind me*, I protect you.  
• If you stand *beside me*, I respect you.  
• But if you stand *against me*, I show *no mercy*.

👤 *${ownerName}*  
📞 *${ownerNumber}*`;

        const vcard =
            'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            `FN:${ownerName}\n` +
            `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\n` +
            'END:VCARD';

        // Send contact card with styled caption
        await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            },
            caption: caption
        });

    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});