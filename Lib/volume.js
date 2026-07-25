// =======================================
// NIMIRA-MD Volume Analysis
// Volume Profile
// POC / HVN / LVN
// Volume Spike
// Buy Sell Pressure
// =======================================


function calculateVolumeProfile(candles, bins = 20) {

    const prices = candles.map(c => Number(c.close));
    const volumes = candles.map(c => Number(c.volume));


    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);


    const step = (maxPrice - minPrice) / bins;


    let profile = [];


    for(let i = 0; i < bins; i++){

        profile.push({

            low:
            minPrice + (step * i),

            high:
            minPrice + (step * (i + 1)),

            volume:0

        });

    }



    candles.forEach(candle => {

        const price = Number(candle.close);
        const volume = Number(candle.volume);


        let index =
        Math.floor(
            (price - minPrice) / step
        );


        if(index >= bins)
            index = bins - 1;


        if(index < 0)
            index = 0;



        profile[index].volume += volume;

    });



    const sorted =
    [...profile]
    .sort(
        (a,b)=>b.volume-a.volume
    );



    return {

        POC: sorted[0],

        HVN: sorted.slice(0,3),

        LVN: sorted.slice(-3),

        profile

    };

}




// Average Volume

function averageVolume(candles, period = 20){

    const volumes =
    candles
    .slice(-period)
    .map(c=>Number(c.volume));


    return (
        volumes.reduce(
            (a,b)=>a+b,0
        )
        /
        volumes.length
    );

}




// Volume Spike Detection

function volumeSpike(candles){


    const current =
    Number(
        candles.at(-1).volume
    );


    const avg =
    averageVolume(candles);



    return {

        spike:
        current > avg * 1.5,

        ratio:
        (current / avg).toFixed(2)

    };

}




// Buy / Sell Volume Pressure

function volumePressure(candles){


    let buy = 0;
    let sell = 0;



    candles.forEach(c=>{

        const volume =
        Number(c.volume);


        if(
            Number(c.close)
            >
            Number(c.open)
        ){

            buy += volume;

        }
        else{

            sell += volume;

        }

    });



    const total =
    buy + sell;



    return {

        buyPercent:
        ((buy/total)*100).toFixed(2),


        sellPercent:
        ((sell/total)*100).toFixed(2),


        pressure:
        buy > sell
        ?
        "BUY"
        :
        "SELL"

    };

}




function volumeSignal(candles){


    const profile =
    calculateVolumeProfile(candles);


    const spike =
    volumeSpike(candles);


    const pressure =
    volumePressure(candles);



    const price =
    Number(
        candles.at(-1).close
    );



    let signal = "NORMAL";

    let message =
    "Normal volume condition";



    if(
        price >= profile.POC.low &&
        price <= profile.POC.high
    ){

        signal="POC_ZONE";

        message=
        "Price inside high volume zone";

    }



    if(spike.spike){

        signal="VOLUME_SPIKE";

        message=
        "Strong volume expansion detected";

    }



    return {

        signal,

        message,

        spike,

        pressure,

        POC:profile.POC,

        HVN:profile.HVN,

        LVN:profile.LVN

    };

}




module.exports = {

    calculateVolumeProfile,

    averageVolume,

    volumeSpike,

    volumePressure,

    volumeSignal

};
