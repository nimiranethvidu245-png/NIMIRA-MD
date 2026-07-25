const axios = require("axios");

const { analyzeMarket } = require("../Lib/anlise");




// Binance Futures candles

async function getCandles(symbol){

    symbol = symbol.toUpperCase();


    const url =
    `https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=15m&limit=100`;


    const res =
    await axios.get(url);



    return res.data.map(c => ({

        open:Number(c[1]),
        high:Number(c[2]),
        low:Number(c[3]),
        close:Number(c[4]),
        volume:Number(c[5])

    }));

}




// Simple Risk Calculator

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


        stopLoss = "-";

        takeProfit1 = "-";

        takeProfit2 = "-";

    }



    return {

        entry:entry.toFixed(4),

        stopLoss:
        typeof stopLoss === "number"
        ?
        stopLoss.toFixed(4)
        :
        stopLoss,


        takeProfit1:
        typeof takeProfit1 === "number"
        ?
        takeProfit1.toFixed(4)
        :
        takeProfit1,


        takeProfit2:
        typeof takeProfit2 === "number"
        ?
        takeProfit2.toFixed(4)
        :
        takeProfit2

    };

}





async function signalCommand(sock,msg,args){


try{


    if(!args[0]){


        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                "❌ Coin එක දෙන්න\n\nExample:\n.signal BTCUSDT"
            }
        );

    }




    const symbol =
    args[0].toUpperCase();



    const candles =
    await getCandles(symbol);



    const result =
    analyzeMarket(candles);



    const price =
    candles.at(-1).close;




    const risk =
    calculateRisk(
        price,
        result.signal
    );





const text =

`🤖 NIMIRA MD FUTURES AI


PAIR:
${symbol}


TIMEFRAME:
15M


SIGNAL:
${result.signal}


CONFIDENCE:
${result.confidence}



💰 TRADE PLAN


ENTRY:
${risk.entry}


STOP LOSS:
${risk.stopLoss}


TAKE PROFIT 1:
${risk.takeProfit1}


TAKE PROFIT 2:
${risk.takeProfit2}




📊 INDICATORS


TREND:
${result.indicators.trend}


RSI:
${result.indicators.RSI}




🧠 ICT


Liquidity:
${result.ict.liquidity}


BOS:
${result.ict.BOS}


FVG:
${result.ict.FVG.type}




💎 SMC


Structure:
${result.smc.structure}


Order Block:
${result.smc.orderBlock.type}




📐 FIBONACCI


Zone:
${result.fibonacci.zone}




📈 SNR


Zone:
${result.snr.zone.zone}




📊 VOLUME


Signal:
${result.volume.signal}


Pressure:
${result.volume.pressure?.pressure}




🌊 EWC


Bias:
${result.ewc.marketBias}




⚡ NIMIRA MD`;




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
        "❌ Signal Error - Check Coin Symbol"
    }
);


}



}



module.exports = {

    signalCommand

};2
