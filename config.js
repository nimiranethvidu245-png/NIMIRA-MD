const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "4ItRCBxQ#JgEjsMrIZft9oeXigckDIrklKmiJOHGDMKOdpZ_liZs",
ALIVE_IMG: process.env.ALIVE_IMG || "https://github.com/nimiranethvidu245-png/NIMIRA-MD/blob/main/Images/IMG_20260719_092754.jpg",
ALIVE_MSG: process.env.ALIVE_MSG || "*『 ⚡ ᴘᴏᴡᴇʀꜰᴜʟ ᴡᴀ ⚡ 』
      
*👋 Hey I'am  NIMIRA MD 𝙒ᴀ ʙᴏᴛ😾, ᴀ ᴘᴏᴡᴇʀꜰᴜʟ ᴡᴀ  ᴀᴜᴛᴏᴍᴀᴛɪᴏɴ ʙᴏᴛ ᴅᴇꜱɪɢɴᴇᴅ ᴛᴏ ʜᴇʟᴘ ʏᴏᴜ ᴡɪᴛʜ ꜰᴀꜱᴛ ᴀɴᴅ ꜱᴍᴀʀᴛ ʀᴇᴘᴏɴꜱ 🫦 , ɪ ᴡᴀꜱ ᴄʀᴇᴀᴛᴇᴅ & ᴅᴇꜱɪɢɴ ニミラ・ネスヴィド🗣️🧚‍♀️*



> Gʜᴏꜱᴛ ✘ ᴀɪʀ Bᴏᴛ ᴠ1.0.0
> 🐥_Web Site: Nimira.site_*",
BOT_OWNER: '94769850638',  // Replace with the owner's phone number



};
