const axios = require("axios");

const BINANCE_API =
    "https://api.binance.com/api/v3/klines";

// ===============================
// Get Market Candles
// ===============================

async function getCandles(
    symbol = "BTCUSDT",
    interval = "15m",
    limit = 250
) {

    try {

        const { data } = await axios.get(
            BINANCE_API,
            {
                params: {
                    symbol,
                    interval,
                    limit
                }
            }
        );

        return data.map(candle => ({

            openTime: candle[0],

            open: Number(candle[1]),

            high: Number(candle[2]),

            low: Number(candle[3]),

            close: Number(candle[4]),

            volume: Number(candle[5]),

            closeTime: candle[6]

        }));

    } catch (err) {

        console.log("Scanner Error:", err.message);

        return [];

    }

}

// ===============================
// Current Price
// ===============================

async function getPrice(symbol = "BTCUSDT") {

    try {

        const { data } = await axios.get(
            "https://api.binance.com/api/v3/ticker/price",
            {
                params: {
                    symbol
                }
            }
        );

        return Number(data.price);

    } catch {

        return null;

    }

}
// ===============================
// Trend Scanner
// ===============================

async function scanMarket(symbol = "BTCUSDT") {

    const candles = await getCandles(symbol);

    if (!candles.length) {
        return null;
    }

    const last = candles[candles.length - 1];
    const first = candles[0];

    const change =
        ((last.close - first.close) / first.close) * 100;

    let trend = "SIDEWAYS";

    if (change > 1)
        trend = "BULLISH";

    if (change < -1)
        trend = "BEARISH";

    return {

        symbol,

        trend,

        price: last.close,

        high: last.high,

        low: last.low,

        volume: last.volume,

        change: Number(change.toFixed(2))

    };

}

// ===============================
// Market Summary
// ===============================

async function getMarketSummary(symbol = "BTCUSDT") {

    const market = await scanMarket(symbol);

    if (!market)
        return null;

    let signal = "WAIT";

    if (market.trend === "BULLISH")
        signal = "BUY";

    if (market.trend === "BEARISH")
        signal = "SELL";

    return {

        symbol: market.symbol,

        signal,

        trend: market.trend,

        currentPrice: market.price,

        dailyHigh: market.high,

        dailyLow: market.low,

        volume: market.volume,

        change: market.change

    };

}

// ===============================
// Exports
// ===============================

module.exports = {

    getCandles,

    getPrice,

    scanMarket,

    getMarketSummary

};
