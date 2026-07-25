// =======================================
// NIMIRA MD ALL SIGNAL COMMAND
// =======================================

const { cmd } = require("../command");
const { getSignals } = require("../Lib/scanner");



// Risk Calculator

function calculateRisk(price, signal){

    let stopLoss;
    let tp1;
    let tp2;


    if(signal === "BUY"){

        stopLoss = price * 0.995;
        tp1 = price * 1.01;
        tp2 = price * 1.02;

    }

    else if(signal === "SELL"){

        stopLoss = price * 1.005;
        tp1 = price * 0.99;
        tp2 = price * 0.98;

    }

    else {

        return {
            entry:"-",
            stopLoss:"-",
            tp1:"-",
            tp2:"-",
            rr:"-"
        };

    }


    return {

        entry: price.toFixed(4),

        stopLoss:
        stopLoss.toFixed(4),

        tp1:
        tp1.toFixed(4),

        tp2:
        tp2.toFixed(4),

        rr:"1:2"

    };

}





cmd(
{

    pattern:"signalall",

    alias:[
        "scanall",
        "allsignal"
    ],

    desc:
    "Scan all USDT coins",

    category:
    "trading",

    react:"🚀"

},


async (
    NIMIRA_MD,
    mek,
    m,
    {
        from,
        reply
    }

)=>{


try{


    await reply(
        "🚀 NIMIRA MD AI SCANNER\n\n⏳ Scanning market..."
    );



    const signals =
    await getSignals();




    if(!signals.length){

        return reply(
            "❌ No strong signals found"
        );

    }




    let text =
`
🤖 NIMIRA MD FUTURES AI

🔥 TOP SIGNALS

`;



    signals
    .slice(0,10)
    .forEach(
    (coin,index)=>{


        const risk =
        calculateRisk(
            coin.price,
            coin.signal
        );



        text +=

`
━━━━━━━━━━━━━━

${index+1}. ${coin.symbol}

📌 SIGNAL:
${coin.signal}

🔥 CONFIDENCE:
${coin.confidence}


💰 TRADE PLAN

ENTRY:
${risk.entry}

STOP LOSS:
${risk.stopLoss}

TAKE PROFIT 1:
${risk.tp1}

TAKE PROFIT 2:
${risk.tp2}

RISK:
${risk.rr}


📊 TREND:
${coin.trend}

💎 SMC:
${coin.SMC}

🧠 ICT:
${coin.ICT}

📐 FIB:
${coin.Fibonacci}

📈 VOLUME:
${coin.Volume}

🌊 EWC:
${coin.EWC}

`;



    });



    text +=
`
━━━━━━━━━━━━━━

⚡ NIMIRA MD AI ENGINE
`;



    await reply(text);



}

catch(err){

    console.log(err);

    await reply(
        "❌ All Signal Scanner Error"
    );

}


});
