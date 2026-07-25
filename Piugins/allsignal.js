// =======================================
// NIMIRA MD ALL COIN SIGNAL COMMAND
// =======================================


const { getSignals } = require("../Lib/scanner");




// ===============================
// Risk Calculator
// ===============================

function calculateRisk(price, signal){


    let entry = price;

    let stopLoss;
    let takeProfit1;
    let takeProfit2;



    if(signal === "BUY"){


        stopLoss =
        price * 0.995;


        takeProfit1 =
        price * 1.01;


        takeProfit2 =
        price * 1.02;


    }


    else if(signal === "SELL"){


        stopLoss =
        price * 1.005;


        takeProfit1 =
        price * 0.99;


        takeProfit2 =
        price * 0.98;


    }


    else{


        return {

            entry:"-",
            stopLoss:"-",
            takeProfit1:"-",
            takeProfit2:"-",
            rr:"-"

        };

    }




    const risk =
    Math.abs(
        entry - stopLoss
    );


    const reward =
    Math.abs(
        takeProfit1 - entry
    );




    return {


        entry:
        entry.toFixed(4),


        stopLoss:
        stopLoss.toFixed(4),


        takeProfit1:
        takeProfit1.toFixed(4),


        takeProfit2:
        takeProfit2.toFixed(4),



        rr:
        (reward / risk)
        .toFixed(2)

    };


}







// ===============================
// ALL SIGNAL COMMAND
// ===============================

async function allSignalCommand(
    sock,
    msg
){



try{


    await sock.sendMessage(

        msg.key.remoteJid,

        {

            text:
            "🚀 NIMIRA MD AI SCANNER\n\n⏳ Scanning All USDT Coins..."

        }

    );





    const signals =
    await getSignals();





    if(!signals.length){


        return sock.sendMessage(

            msg.key.remoteJid,

            {

                text:
                "❌ No strong signals found"

            }

        );


    }






    let text =

`🤖 NIMIRA MD FUTURES AI

🔥 TOP MARKET SIGNALS

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

${index + 1}. ${coin.symbol}


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
${risk.takeProfit1}


TAKE PROFIT 2:
${risk.takeProfit2}


RISK / REWARD:
1:${risk.rr}




📊 TREND:
${coin.trend}


📈 RSI:
${coin.RSI}



💎 SMC:
${coin.SMC}



🧠 ICT:
${coin.ICT}



📐 FIBONACCI:
${coin.Fibonacci}



📊 VOLUME:
${coin.Volume}


PRESSURE:
${coin.VolumePressure}



🌊 EWC:
${coin.EWC}


`;



    });







    text +=

`
━━━━━━━━━━━━━━

⚡ NIMIRA MD AI ENGINE
`;







    await sock.sendMessage(

        msg.key.remoteJid,

        {

            text

        }

    );





}



catch(err){


    console.log(err);



    await sock.sendMessage(

        msg.key.remoteJid,

        {

            text:
            "❌ All Signal Scanner Error"

        }

    );


}



}






module.exports = {


    allSignalCommand


};
