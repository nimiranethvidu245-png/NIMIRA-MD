const {
    EMA,
    RSI,
    MACD,
    BollingerBands,
    ATR,
    SMA
} = require("technicalindicators");

// ===============================
// EMA
// ===============================

function calculateEMA(prices, period = 20) {
    return EMA.calculate({
        period,
        values: prices
    });
}

// ===============================
// RSI
// ===============================

function calculateRSI(prices, period = 14) {
    return RSI.calculate({
        period,
        values: prices
    });
}

// ===============================
// MACD
// ===============================

function calculateMACD(prices) {
    return MACD.calculate({
        values: prices,
        fastPeriod: 12,
        slowPeriod: 26,
        signalPeriod: 9,
        SimpleMAOscillator: false,
        SimpleMASignal: false
    });
}

// ===============================
// SMA
// ===============================

function calculateSMA(prices, period = 20) {
    return SMA.calculate({
        period,
        values: prices
    });
}
// ===============================
// Bollinger Bands
// ===============================

function calculateBollinger(prices, period = 20, stdDev = 2) {

    return BollingerBands.calculate({
        period,
        values: prices,
        stdDev
    });

}

// ===============================
// ATR (Average True Range)
// ===============================

function calculateATR(candles, period = 14) {

    return ATR.calculate({
        high: candles.map(c => Number(c.high)),
        low: candles.map(c => Number(c.low)),
        close: candles.map(c => Number(c.close)),
        period
    });

}

// ===============================
// VWAP
// ===============================

function calculateVWAP(candles) {

    let cumulativePV = 0;
    let cumulativeVolume = 0;

    for (const candle of candles) {

        const typicalPrice =
            (Number(candle.high) +
             Number(candle.low) +
             Number(candle.close)) / 3;

        cumulativePV +=
            typicalPrice * Number(candle.volume);

        cumulativeVolume +=
            Number(candle.volume);

    }

    if (cumulativeVolume === 0)
        return 0;

    return cumulativePV / cumulativeVolume;

}

// ===============================
// Volume Profile
// ===============================

function calculateVolumeProfile(candles, bins = 20) {

    const prices = candles.map(c => Number(c.close));
    const volumes = candles.map(c => Number(c.volume));

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const range = (maxPrice - minPrice) / bins;

    const profile = [];

    for (let i = 0; i < bins; i++) {

        profile.push({
            low: minPrice + (range * i),
            high: minPrice + (range * (i + 1)),
            volume: 0
        });

    }

    candles.forEach((candle) => {

        let index = Math.floor(
            (Number(candle.close) - minPrice) / range
        );

        if (index < 0) index = 0;
        if (index >= bins) index = bins - 1;

        profile[index].volume +=
            Number(candle.volume);

    });

    const POC = profile.reduce(
        (a, b) => a.volume > b.volume ? a : b
    );

    return {
        profile,
        POC
    };

}
// ===============================
// Trend Detection
// ===============================

function detectTrend(indicators) {

    const {
        EMA20,
        EMA50,
        EMA200,
        RSI,
        MACD
    } = indicators;

    let trend = "NEUTRAL";

    if (
        EMA20 > EMA50 &&
        EMA50 > EMA200 &&
        RSI > 55 &&
        MACD.histogram > 0
    ) {
        trend = "BULLISH";
    }

    if (
        EMA20 < EMA50 &&
        EMA50 < EMA200 &&
        RSI < 45 &&
        MACD.histogram < 0
    ) {
        trend = "BEARISH";
    }

    return trend;
}

// ===============================
// EMA Cross
// ===============================

function getEMASignal(ema20, ema50) {

    if (ema20 > ema50)
        return "BUY";

    if (ema20 < ema50)
        return "SELL";

    return "WAIT";
}

// ===============================
// RSI Signal
// ===============================

function getRSISignal(rsi) {

    if (rsi >= 70)
        return "OVERBOUGHT";

    if (rsi <= 30)
        return "OVERSOLD";

    return "NEUTRAL";
}

// ===============================
// MACD Signal
// ===============================

function getMACDSignal(macd) {

    if (macd.histogram > 0)
        return "BUY";

    if (macd.histogram < 0)
        return "SELL";

    return "WAIT";
}

// ===============================
// Market Strength
// ===============================

function getMarketStrength(rsi, atr) {

    if (rsi > 60 && atr > 0)
        return "STRONG";

    if (rsi < 40 && atr > 0)
        return "WEAK";

    return "NORMAL";
}
// ===============================
// Main Indicator Engine
// ===============================


    const ema20 = calculateEMA(closes, 20);
    const ema50 = calculateEMA(closes, 50);
    const ema200 = calculateEMA(closes, 200);

    const rsi = calculateRSI(closes);
    const macd = calculateMACD(closes);
    const bb = calculateBollinger(closes);
    const atr = calculateATR(candles);
    const vwap = calculateVWAP(candles);
    const volumeProfile = cafunction getIndicators(candles) {

    if (!candles || candles.length < 200) {
        throw new Error("Not enough candle data.");
    }

    function getIndicators(candles) {

    if (!candles || candles.length < 200) {
        throw new Error("Not enough candle data.");
    }

    const closes = candles.map(c => Number(c.close));lculateVolumeProfile(candles);


        VWAP: vwap,

        VolumeProfile: volumeProfile

    };

    indicators.trend =
        detectTrend(indicators);

    indicators.emaSignal =
        getEMASignal(
            indicators.EMA20,
            indicators.EMA50
        );

    indicators.rsiSignal =
        getRSISignal(
            indicators.RSI
        );

    indicators.macdSignal =
        getMACDSignal(
            indicators.MACD
        );

    indicators.marketStrength =
        getMarketStrength(
            indicators.RSI,
            indicators.ATR
        );

    return const indicators = {

    EMA20: ema20.length ? ema20[ema20.length - 1] : null,

    EMA50: ema50.length ? ema50[ema50.length - 1] : null,

    EMA200: ema200.length ? ema200[ema200.length - 1] : null,

    RSI: rsi.length ? rsi[rsi.length - 1] : null,

    MACD: macd.length ? macd[macd.length - 1] : null,

    Bollinger: bb.length ? bb[bb.length - 1] : null,

    ATR: atr.length ? atr[atr.length - 1] : null,

    VWAP: vwap,

    VolumeProfile: volumeProfile

};indicators;

}

// ===============================
// Exports
// ===============================

module.exports = {

    getIndicators,

    calculateEMA,
    calculateRSI,
    calculateMACD,
    calculateSMA,

    calculateBollinger,
    calculateATR,
    calculateVWAP,
    calculateVolumeProfile,

    detectTrend,
    getEMASignal,
    getRSISignal,
    getMACDSignal,
    getMarketStrength

};
