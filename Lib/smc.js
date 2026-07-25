// ===============================
// SMC MODULE
// ===============================

// Swing High

function getSwingHigh(candles, lookback = 5) {

    const swings = [];

    for (let i = lookback; i < candles.length - lookback; i++) {

        let high = Number(candles[i].high);
        let swing = true;

        for (let j = i - lookback; j <= i + lookback; j++) {

            if (j === i) continue;

            if (Number(candles[j].high) >= high) {
                swing = false;
                break;
            }

        }

        if (swing) {

            swings.push({
                index: i,
                price: high
            });

        }

    }

    return swings;

}

// ===============================
// Swing Low
// ===============================

function getSwingLow(candles, lookback = 5) {

    const swings = [];

    for (let i = lookback; i < candles.length - lookback; i++) {

        let low = Number(candles[i].low);
        let swing = true;

        for (let j = i - lookback; j <= i + lookback; j++) {

            if (j === i) continue;

            if (Number(candles[j].low) <= low) {
                swing = false;
                break;
            }

        }

        if (swing) {

            swings.push({
                index: i,
                price: low
            });

        }

    }

    return swings;

}
// ===============================
// Market Structure
// ===============================

function detectMarketStructure(candles) {

    const highs = getSwingHigh(candles);
    const lows = getSwingLow(candles);

    if (highs.length < 2 || lows.length < 2) {

        return "RANGING";

    }

    const lastHigh = highs[highs.length - 1].price;
    const prevHigh = highs[highs.length - 2].price;

    const lastLow = lows[lows.length - 1].price;
    const prevLow = lows[lows.length - 2].price;

    if (lastHigh > prevHigh && lastLow > prevLow) {

        return "UPTREND";

    }

    if (lastHigh < prevHigh && lastLow < prevLow) {

        return "DOWNTREND";

    }

    return "RANGING";

}

// ===============================
// Break Of Structure (BOS)
// ===============================

function detectBOS(candles) {

    const structure = detectMarketStructure(candles);

    if (structure === "UPTREND") {

        return {
            signal: "BULLISH_BOS"
        };

    }

    if (structure === "DOWNTREND") {

        return {
            signal: "BEARISH_BOS"
        };

    }

    return null;

}

// ===============================
// Market Structure Shift (MSS)
// ===============================

function detectMSS(candles) {

    if (candles.length < 10)
        return null;

    const current = detectMarketStructure(candles);

    const previous = detectMarketStructure(
        candles.slice(0, candles.length - 3)
    );

    if (current !== previous) {

        return {

            from: previous,

            to: current,

            signal: "MSS"

        };

    }

    return null;

}
// ===============================
// Supply Zone
// ===============================

function detectSupplyZone(candles) {

    const high = Math.max(
        ...candles.slice(-20).map(c => Number(c.high))
    );

    return {
        zone: "SUPPLY",
        price: high
    };

}

// ===============================
// Demand Zone
// ===============================

function detectDemandZone(candles) {

    const low = Math.min(
        ...candles.slice(-20).map(c => Number(c.low))
    );

    return {
        zone: "DEMAND",
        price: low
    };

}

// ===============================
// Liquidity Pool
// ===============================

function detectLiquidityPool(candles) {

    const highs = getSwingHigh(candles);
    const lows = getSwingLow(candles);

    return {

        buySide:
            highs.length
                ? highs[highs.length - 1].price
                : null,

        sellSide:
            lows.length
                ? lows[lows.length - 1].price
                : null

    };

}

// ===============================
// Exports
// ===============================

module.exports = {

    getSwingHigh,

    getSwingLow,

    detectMarketStructure,

    detectBOS,

    detectMSS,

    detectSupplyZone,

    detectDemandZone,

    detectLiquidityPool

};
