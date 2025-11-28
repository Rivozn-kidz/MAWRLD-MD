
const fs = require('fs');
const path = require('path');
const config = require('../config');
const { marwld } = require('../marwld');

marwld({
  on: "body"
},
async (conn, mek, m, { from, body }) => {
    const filePath = path.join(__dirname, '../all/autosticker.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const text in data) {
        if (body.toLowerCase() === text.toLowerCase()) {
            if (config.AUTO_STICKER === 'true') {
                const stickerPath = path.join(__dirname, '../all/autosticker', data[text]);

                if (fs.existsSync(stickerPath)) {
                    const stickerBuffer = fs.readFileSync(stickerPath);

                    await conn.sendMessage(from, {
                        sticker: stickerBuffer,
                        packname: 'MAWRLD MD',
                        author: 'Ridz Coder'
                    }, { quoted: mek });
                } else {
                    console.warn(`Sticker not found: ${stickerPath}`);
                }
            }
        }
    }
});
