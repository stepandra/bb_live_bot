  // Let's create our own strategy
var strat = {};

// Prepare everything our strat needs
strat.init = function() {
  // your code!
  this.count = 0
  this.stop = ""
  this.in = 0
  this.out = 0
  this.long = false
  this.max_price = 0
  this.min_price = 0
  this.hour_volume = 0
  this.firsttimetradetype = 'buy'
  this.requiredHistory = this.tradingAdvisor.historySize;
  // console.log(this.tradingAdvisor.historySize)
  var customBBSettings = {
    optInTimePeriod: this.tradingAdvisor.historySize,
    optInNbDevUp: 2,
    optInNbDevDn: 2,
    optInMAType: 0
  };
  // console.log(this.settings)

  // add the indicator to the strategy
  this.addTalibIndicator('mybb', 'bbands', customBBSettings);
}

// What happens on every new candle?
strat.update = function(candle) {
  // your code!

}

// For debugging purposes.
strat.log = function() {
  // your code!
}

// Based on the newly calculated
// information, check if we should
// update or not.
strat.check = function(candle) {
  var upBB = this.talibIndicators.mybb.result['outRealUpperBand'];
  var lowBB = this.talibIndicators.mybb.result['outRealLowerBand'];
  var midBB = this.talibIndicators.mybb.result['outRealMiddleBand'];
  // var macddiff = result['outMACD'] - result['outMACDSignal'];
  // console.log(upBB)
  //
  // if(candle.close > parseInt(upBB)){
  //   this.advice('short')
  // } else if(candle.close === parseInt(midBB)){
  //   this.advice('long')
  // }
  // console.log(candle)
  // this.min_price == 0 ? this.min_price = candle.low : this.min_price
  // if (candle.high > this.max_price){
  //   this.max_price = candle.high
  //   // console.log('HIGH: ' + this.max_price)
  // }
  // if (candle.low < this.min_price){
  //   this.min_price = candle.low
  //   // console.log('LOW: ' + this.min_price)
  // }
  // this.count++

  // console.log(candle.close)
  // if (this.count % 12 == 0) {
  //
  //   console.log('Volume 1h: ' + this.hour_volume)
  //   this.hour_volume = 0
  // } else {
  //   this.hour_volume = this.hour_volume + candle.volume
  // }

  //In the strategy init create the stoploss variable:
  // this.stop = "";
  //
  //
  // if(logic that determines a sell || this.stop != "" && price<this.stop){
  //
  // //if you want to show a stoploss being triggered in the console:
  //         if(this.stop != "" && price<this.stop){
  //             console.log("stoplosss triggered - "+ this.stop);
  //         }
  //
  //         this.direction="short";
  //         if(this.trend == "long"){
  //             this.stop = "";
  //             this.trend = this.direction;
  //             this.advice(this.direction);
  //         }
  //
  //     }else if(logic that determines a buy){
  //         if(this.stop==""){
  // //sets up the stoploss, you should make the .2 a variable in the strategy config really
  //             this.stop = price-(price*.2);
  //             this.direction="long";
  //             this.trend = this.direction;
  //             this.advice(this.direction);
  //         }
  //     }


  if (!this.long) {
    this.in = candle.close
    if (this.in >= upBB) {
      this.long = true;
      if (this.stop == "") {
        this.stop = this.in + this.in * 0.03
        console.log("in - " + this.in)
        this.in = 0
        this.advice('short')
      }
    }
    // console.log('SHORT, BITCH!')
  } else if (this.long) {
    this.out = candle.close
    if (this.out <= midBB ) {
      this.long = false
// || this.out >= this.stop
      // if (this.stop != "" && this.out >= this.stop) {
      //   console.log("stoplosss triggered - " + this.stop);
      //   this.stop = ""
      //   this.out = 0
      //   this.advice('long')
      // } else {
        this.stop = ""
        console.log("out - " + this.out)

        this.out = 0
        this.advice('long')
      // }
    }
    // console.log(candle.start.format())
  }
}

// Optional for executing code
// after completion of a backtest.
// This block will not execute in
// live use as a live gekko is
// never ending.

module.exports = strat;
