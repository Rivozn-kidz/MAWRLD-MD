const fs = require('fs');
const path = require('path');
const config = require('../config')
const {lite , commands} = require('../marwld')


// Composing (Auto Typing)
lite({
    on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {
    if (config.AUTO_TYPING === 'true') {
        await conn.sendPresenceUpdate('composing', from); // send typing 
    }
});
