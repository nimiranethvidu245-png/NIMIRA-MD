const { cmd, commands } = require("../command");

cmd(
  {
    pattern: "menu",
    desc: "Displays all available commands",
    category: "main",
    filename: __filename,
  },
  async (
    NIMIRA MD,
    mek,
    m,
    {
      from,
      reply
    }
  ) => {
    try {
      const categories = {};

      for (let cmdName in commands) {
        const cmdData = commands[cmdName];
        const cat = cmdData.category?.toLowerCase() || "other";
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push({
          pattern: cmdData.pattern,
          desc: cmdData.desc || "No description"
        });
      }



> *·:·.┏━⋅━⋅━━⋅༻❁༺⋅━━⋅━⋅━┓:·.
.༻♡  📥 Download Menu 📥  ♡༺.
·:·. ╰━⋅━⋅━.· ✿༻༺✿·.━⋅━⋅━╯  :·.

══════ 🎀 `.song` ══════
   ✧ Download and play audio/mp3 files  
   🎵 Usage: .song baby baby  

══════ 🎀 `.video` ══════
   ✧ Download high quality video files  
   🎥 Usage: .video lelena  

══════ 🎀 `.tt` ══════
   ✧ Download TikTok videos without watermark  
   📱 Usage: .tt <Url>  

══════ 🎀 `.fb` ══════
   ✧ Download Facebook videos and reels  
   👥 Usage: .fb <Url>  

══════ 🎀 `.apk` ══════
   ✧ Search and download Android APK files  
   ⚙️ Usage: .apk whatsapp  

══════ 🎀 `.img` ══════
   ✧ Search and download HD images  
   🖼️ Usage: .img cat  

══════ 🎀 `.xnxx` ══════
   ✧ Download adult content from XNXX  
   🔞 Usage: .xnxx mia  

══════ 🎀 `.img2` ══════
   ✧ Search and download High Quality images  
   🖼️ Usage: .img2 Dog  

══════ 🎀 `.paper` ══════
   ✧ Download school/exam papers  
   📝 Education Hub  

══════ 🎀 `.novels` ══════
   ✧ Download novels and story books  
   📚 Usage: .novels Love  

══════ 🎀 `.alldl` ══════
   ✧ Download media from any link  
   🔗 Usage: .alldl <Link>  

══════ 🎀 `.mediafire` ══════
   ✧ Direct Mediafire link downloader  
   ☁️ Usage: .mediafire <Url>  

══════ 🎀 `.stdl` ══════
   ✧ Search and download WhatsApp stickers  
   🎭 Usage: .stdl cat*\n";

      for (const [cat, cmds] of Object.entries(categories)) {
        menuText += `\n📂*${cat.toUpperCase()}*\n`;
        cmds.forEach(c => {
          menuText += `- .${c.pattern} : ${c.desc}\n`;
        });
      }

      await reply(menuText.trim());
    } catch (err) {
      console.error(err);
      reply("❌ Error generating menu.");
    }
  }
);
