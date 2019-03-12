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


  // console.log(candle.close)
  // if (this.count % 12 == 0) {
  //
  //   console.log('Volume 1h: ' + this.hour_volume)
  //   this.hour_volume = 0
  // } else {
  //   this.hour_volume = this.hour_volume + candle.volume
  // }




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
    if (this.out <= lowBB) {
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
