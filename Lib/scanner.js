// =======================================
// NIMIRA MD AI MARKET SCANNER
// =======================================


const axios = require("axios");

const { analyzeMarket } = require("./anlise");


const BINANCE =
"https://api.binance.com/api/v3";




// ===============================
// Get All USDT Coins
// ===============================

async function getAllCoins(){


    try{


        const {data} =
        await axios.get(
            `${BINANCE}/exchangeInfo`
        );



        return data.symbols

        .filter(
            coin =>
            coin.quoteAsset === "USDT" &&
            coin.status === "TRADING"
        )

        .map(
            coin =>
            coin.symbol
        );


    }
    catch(err){


        console.log(
            "Coin Error:",
            err.message
        );


        return [];

    }

}







// ===============================
// Get Candles
// ===============================

async function getCandles(
    symbol,
    interval="15m",
    limit=250
){


    try{


        const {data} =
        await axios.get(
            `${BINANCE}/klines`,
            {
                params:{
                    symbol,
                    interval,
                    limit
                }
            }
        );



        return data.map(
            candle => ({

                open:Number(candle[1]),

                high:Number(candle[2]),

                low:Number(candle[3]),

                close:Number(candle[4]),

                volume:Number(candle[5])

            })
        );


    }
    catch(err){

        return [];

    }

}








// ===============================
// Analyze Single Coin
// ===============================

async function scanMarket(symbol){


    try{


        const candles =
        await getCandles(symbol);



        if(!candles.length)
            return null;




        const result =
        analyzeMarket(candles);



        const last =
        candles.at(-1);





        return {


            symbol,


            signal:
            result.signal,



            confidence:
            result.confidence,



            score:
            result.score,



            price:
            last.close,



            trend:
            result.indicators.trend,



            RSI:
            result.indicators.RSI,



            SMC:
            result.smc.orderBlock.type,



            ICT:
            result.ict.liquidity,



            Fibonacci:
            result.fibonacci.zone,



            Volume:
            result.volume.signal,



            VolumePressure:
            result.volume.pressure?.pressure,



            EWC:
            result.ewc.marketBias


        };


    }
    catch(err){


        return null;

    }

}








// ===============================
// Scan All Coins
// ===============================

async function scanAllCoins(){


    console.log(
        "🚀 NIMIRA MD FULL MARKET SCAN STARTED"
    );



    const coins =
    await getAllCoins();



    let results=[];



    for(
        const coin of coins
    ){


        const analysis =
        await scanMarket(coin);



        if(analysis){


            results.push(
                analysis
            );



            console.log(

            `${coin} | ${analysis.signal} | ${analysis.confidence}`

            );


        }



        // Binance rate protection

        await new Promise(
            resolve =>
            setTimeout(resolve,200)
        );


    }




    return results;


}








// ===============================
// Get Best Signals
// ===============================

async function getSignals(){


    const market =
    await scanAllCoins();




    return market

    .filter(
        coin =>
        coin.signal !== "WAIT"
    )


    .sort(
        (a,b)=>{


            const A =
            Number(
            a.confidence.replace("%","")
            );


            const B =
            Number(
            b.confidence.replace("%","")
            );


            return B-A;


        }
    );


}







module.exports = {


    getAllCoins,

    getCandles,

    scanMarket,

    scanAllCoins,

    getSignals


};
