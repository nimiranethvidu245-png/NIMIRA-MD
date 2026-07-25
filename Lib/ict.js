// ===============================
// ICT MODULE
// ===============================

// Kill Zone

function getKillZone(date = new Date()) {

    const utcHour = date.getUTCHours();
    const utcMinute = date.getUTCMinutes();

    const minutes = utcHour * 60 + utcMinute;

    // Asian Session
    if (minutes >= 0 && minutes <= 300) {
        return {
            active: true,
            session: "ASIAN"
        };
    }

    // London Kill Zone
    if (minutes >= 420 && minutes <= 600) {
        return {
            active: true,
            session: "LONDON"
        };
    }

    // New York Kill Zone
    if (minutes >= 750 && minutes <= 930) {
        return {
            active: true,
            session: "NEW YORK"
        };
    }

    return {
        active: false,
        session: "NONE"
    };
}

// ===============================
// Fair Value Gap (FVG)
// ===============================

function detectFVG(candles) {

    const gaps = [];

    for (let i = 2; i < candles.length; i++) {

        const c1 = candles[i - 2];
        const c2 = candles[i - 1];
        const c3 = candles[i];

        // Bullish FVG
        if (Number(c1.high) < Number(c3.low)) {

            gaps.push({
                type: "BULLISH",
                high: Number(c3.low),
                low: Number(c1.high)
            });

        }

        // Bearish FVG
        if (Number(c1.low) > Number(c3.high)) {

            gaps.push({
                type: "BEARISH",
                high: Number(c1.low),
                low: Number(c3.high)
            });

        }

    }

    return gaps;

}
// ===============================
// Break Of Structure (BOS)
// ===============================

function detectBOS(candles) {

    if (candles.length < 3)
        return null;

    const prevHigh = Number(candles[candles.length - 2].high);
    const prevLow = Number(candles[candles.length - 2].low);

    const lastClose = Number(candles[candles.length - 1].close);

    if (lastClose > prevHigh) {

        return {
            type: "BULLISH_BOS",
            level: prevHigh
        };

    }

    if (lastClose < prevLow) {

        return {
            type: "BEARISH_BOS",
            level: prevLow
        };

    }

    return null;

}

// ===============================
// Change Of Character (CHOCH)
// ===============================

function detectCHOCH(candles) {

    if (candles.length < 5)
        return null;

    const current = Number(candles[candles.length - 1].close);
    const previous = Number(candles[candles.length - 2].close);

    if (current > previous) {

        return {
            trend: "BULLISH",
            signal: "CHOCH"
        };

    }

    if (current < previous) {

        return {
            trend: "BEARISH",
            signal: "CHOCH"
        };

    }

    return null;

}

// ===============================
// Liquidity Sweep
// ===============================

function detectLiquiditySweep(candles) {

    if (candles.length < 3)
        return null;

    const prev = candles[candles.length - 2];
    const last = candles[candles.length - 1];

    if (
        Number(last.high) > Number(prev.high) &&
        Number(last.close) < Number(prev.high)
    ) {

        return {
            type: "BUY_SIDE_LIQUIDITY"
        };

    }

    if (
        Number(last.low) < Number(prev.low) &&
        Number(last.close) > Number(prev.low)
    ) {

        return {
            type: "SELL_SIDE_LIQUIDITY"
        };

    }

    return null;

}
// ===============================
// Order Block
// ===============================

function detectOrderBlock(candles) {

    if (candles.length < 5)
        return null;

    const candle = candles[candles.length - 2];

    if (Number(candle.close) > Number(candle.open)) {

        return {
            type: "BULLISH",
            high: Number(candle.high),
            low: Number(candle.low)
        };

    }

    return {

        type: "BEARISH",
        high: Number(candle.high),
        low: Number(candle.low)

    };

}

// ===============================
// Premium / Discount Zone
// ===============================

function getPremiumDiscount(high, low, price) {

    const equilibrium = (high + low) / 2;

    if (price > equilibrium) {

        return "PREMIUM";

    }

    if (price < equilibrium) {

        return "DISCOUNT";

    }

    return "EQUILIBRIUM";

}

// ===============================
// Optimal Trade Entry (OTE)
// ===============================

function calculateOTE(high, low) {

    const range = high - low;

    return {

        fib62: high - (range * 0.62),

        fib70: high - (range * 0.705),

        fib79: high - (range * 0.79)

    };

}

// ===============================
// Exports
// ===============================

module.exports = {

    getKillZone,

    detectFVG,

    detectBOS,

    detectCHOCH,

    detectLiquiditySweep,

    detectOrderBlock,

    getPremiumDiscount,

    calculateOTE

};
