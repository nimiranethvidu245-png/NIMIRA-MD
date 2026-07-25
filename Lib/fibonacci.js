// ===============================
// Fibonacci Module
// ===============================

// Retracement Levels

function getFibonacciLevels(high, low) {

    const range = high - low;

    return {

        high,

        low,

        fib0: high,

        fib236: high - (range * 0.236),

        fib382: high - (range * 0.382),

        fib50: high - (range * 0.50),

        fib618: high - (range * 0.618),

        fib705: high - (range * 0.705),

        fib786: high - (range * 0.786),

        fib100: low

    };

}

// ===============================
// Fibonacci Extension
// ===============================

function getExtension(high, low) {

    const range = high - low;

    return {

        tp1: high + (range * 0.272),

        tp2: high + (range * 0.618),

        tp3: high + (range * 1.0),

        tp4: high + (range * 1.618)

    };

}
// ===============================
// Auto Swing High / Low
// ===============================

function getAutoFibonacci(candles) {

    const highs = candles.map(c => Number(c.high));
    const lows = candles.map(c => Number(c.low));

    const high = Math.max(...highs);
    const low = Math.min(...lows);

    return getFibonacciLevels(high, low);

}

// ===============================
// Trade Setup
// ===============================

function getTradeSetup(high, low) {

    const fib = getFibonacciLevels(high, low);
    const ext = getExtension(high, low);

    return {

        entry: fib.fib618,

        confirmation: fib.fib705,

        stopLoss: fib.fib786,

        takeProfit1: ext.tp1,

        takeProfit2: ext.tp2,

        takeProfit3: ext.tp3,

        takeProfit4: ext.tp4

    };

}

// ===============================
// Exports
// ===============================

module.exports = {

    getFibonacciLevels,

    getExtension,

    getAutoFibonacci,

    getTradeSetup

};
