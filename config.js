const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "0E9GXQ6b#AUAlbqNClkPUx_J5zSPe69JjCUKRl0eqgIeYwIPqE0w",
ALIVE_IMG: process.env.ALIVE_IMG || "https://github.com/nimiranethvidu245-png/NIMIRA-MD/blob/main/Images/IMG_20260719_092754.jpg",
ALIVE_MSG: process.env.ALIVE_MSG || "*Hello👋 NIMIRA-MD Is Alive Now😍*",
BOT_OWNER: '94769850638',  // Replace with the owner's phone number



};
