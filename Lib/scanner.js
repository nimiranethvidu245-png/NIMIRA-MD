const axios = require("axios");

const BINANCE =
    "https://api.binance.com/api/v3";


// ===============================
// Get All USDT Coins
// ===============================

async function getAllCoins() {

    try {

        const { data } = await axios.get(
            `${BINANCE}/exchangeInfo`
        );


        return data.symbols
            .filter(
                coin =>
                    coin.quoteAsset === "USDT" &&
                    coin.status === "TRADING"
            )
            .map(
                coin => coin.symbol
            );


    } catch (err) {

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
    interval = "15m",
    limit = 250
) {

    try {


        const { data } = await axios.get(
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


    } catch {

        return [];

    }

}




// ===============================
// Analyze Coin
// ===============================

async function scanMarket(symbol) {


    const candles =
        await getCandles(symbol);


    if(!candles.length)
        return null;



    const first =
        candles[0];


    const last =
        candles[candles.length-1];



    const change =
        ((last.close-first.close)
        /first.close)*100;



    let trend="SIDEWAYS";

    let signal="WAIT";



    if(change > 1){

        trend="BULLISH";

        signal="BUY";

    }



    if(change < -1){

        trend="BEARISH";

        signal="SELL";

    }



    return {

        symbol,

        signal,

        trend,

        price:last.close,

        change:Number(
            change.toFixed(2)
        ),

        high:last.high,

        low:last.low,

        volume:last.volume

    };


}





// ===============================
// Scan ALL Coins
// ===============================

async function scanAllCoins(){


    console.log(
        "Starting Full Market Scan..."
    );


    const coins =
        await getAllCoins();



    let results=[];



    for(const coin of coins){


        const analysis =
            await scanMarket(coin);



        if(analysis){


            results.push(
                analysis
            );


            console.log(
                `${coin} | ${analysis.signal} | ${analysis.change}%`
            );


        }


        // API limit protection
        await new Promise(
            r=>setTimeout(r,200)
        );


    }



    return results;


}




// ===============================
// Best Signals Only
// ===============================

async function getSignals(){


    const market =
        await scanAllCoins();



    return market.filter(
        coin =>
            coin.signal !== "WAIT"
    );


}




module.exports = {


    getAllCoins,

    getCandles,

    scanMarket,

    scanAllCoins,

    getSignals


};
