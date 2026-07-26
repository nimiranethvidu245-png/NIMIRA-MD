const fs = require("fs");

if (fs.existsSync("./config.env")) {
  require("dotenv").config({ path: "./config.env" });
}

module.exports = {
  SESSION_ID: process.env.SESSION_ID || "FV9nmBYR#ns4It_259sIT-u6oeUbUUVZmha_odNOeVyOc8EkKP3U",
  ALIVE_IMG:
    process.env.ALIVE_IMG ||
    "https://raw.githubusercontent.com/nimiranethvidu245-png/NIMIRA-MD/main/Images/IMG_20260719_092754.jpg",

  ALIVE_MSG:
    process.env.ALIVE_MSG ||
`*『 ⚡ POWERFUL WA ⚡ 』*

👋 Hey, I'm NIMIRA MD WhatsApp Bot.

⚡ Fast • Secure • Reliable

🤖 Multi-Device WhatsApp Bot
💬 Ready to Receive Commands
🚀 Running 24/7

Owner: NIMIRA`,

  BOT_OWNER: process.env.BOT_OWNER || "94701275068",
  PREFIX: process.env.PREFIX || ".",
  PORT: process.env.PORT || 8000
};
