const fs = require('fs');
const path = require('path');
const config = require('../config)
const {marwld , commands} = require('../marwld')


//auto recording
marwld({
  on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {       
 if (config.AUTO_RECORDING === 'true') {
                await conn.sendPresenceUpdate('recording', from);
            }
         } 
   );
