const axios = require("axios");

const BASE_URL = "https://api.binance.com/api/v3";

// Live Price
async function getPrice(symbol = "BTCUSDT") {
    try {
        const { data } = await axios.get(
            `${BASE_URL}/ticker/price?symbol=${symbol.toUpperCase()}`
        );

        return Number(data.price);

    } catch (err) {
        console.error("Price Error:", err.message);
        return null;
    }
}

// 24h Statistics
async function getTicker(symbol = "BTCUSDT") {
    try {
        const { data } = await axios.get(
            `${BASE_URL}/ticker/24hr?symbol=${symbol.toUpperCase()}`
        );

        return {
            symbol: data.symbol,
            price: Number(data.lastPrice),
            change: Number(data.priceChangePercent),
            high: Number(data.highPrice),
            low: Number(data.lowPrice),
            volume: Number(data.volume),
            quoteVolume: Number(data.quoteVolume)
        };

    } catch (err) {
        console.error("Ticker Error:", err.message);
        return null;
    }
}

// Live Candles
async function getCandles(symbol = "BTCUSDT", interval = "15m", limit = 200) {
    try {

        const { data } = await axios.get(
            `${BASE_URL}/klines`,
            {
                params: {
                    symbol: symbol.toUpperCase(),
                    interval,
                    limit
                }
            }
        );

        return data.map(c => ({
            time: Number(c[0]),
            open: Number(c[1]),
            high: Number(c[2]),
            low: Number(c[3]),
            close: Number(c[4]),
            volume: Number(c[5]),
            closeTime: Number(c[6])
        }));

    } catch (err) {
        console.error("Candles Error:", err.message);
        return [];
    }
}

// Order Book
async function getOrderBook(symbol = "BTCUSDT", limit = 20) {

    try {

        const { data } = await axios.get(
            `${BASE_URL}/depth`,
            {
                params: {
                    symbol: symbol.toUpperCase(),
                    limit
                }
            }
        );

        return data;

    } catch (err) {

        console.error("OrderBook Error:", err.message);

        return null;
    }
}

// Symbol Validation
async function isValidSymbol(symbol) {

    try {

        await axios.get(
            `${BASE_URL}/ticker/price?symbol=${symbol.toUpperCase()}`
        );

        return true;

    } catch {

        return false;
    }
}

module.exports = {
    getPrice,
    getTicker,
    getCandles,
    getOrderBook,
    isValidSymbol
};l
