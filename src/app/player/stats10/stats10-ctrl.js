angular.module('player.stats10', [])
  .controller('StatsCtrl', function(getId, history) {
    var subctrl = this;

    var csDiffPerMinDeltas = [],
        damageTakenDiffPerMinDeltas = [],
        xpDiffPerMinDeltas = [];

    var timelineArray = _.map(history.matches, function(match) {
      return match['participants'][0]['timeline'];
    });

    console.log(timelineArray);
    _.forEach(timelineArray, function(match) {
      csDiffPerMinDeltas.push(match.csDiffPerMinDeltas);
      damageTakenDiffPerMinDeltas.push(match.damageTakenDiffPerMinDeltas);
      xpDiffPerMinDeltas.push(match.xpDiffPerMinDeltas);
    });

    var avgCsDiff = {
      'zeroToTen' : (_.sum(csDiffPerMinDeltas, function(obj) { return obj.zeroToTen; }) * 10 / csDiffPerMinDeltas.length).toFixed(2),
      'tenToTwenty' : (_.sum(csDiffPerMinDeltas, function(obj) { return obj.tenToTwenty; }) * 10 / csDiffPerMinDeltas.length).toFixed(2),
      'twentyToThirty' : (_.sum(csDiffPerMinDeltas, function(obj) { return obj.twentyToThirty; }) * 10 / csDiffPerMinDeltas.length).toFixed(2),
      'thirtyToEnd' : (_.sum(csDiffPerMinDeltas, function(obj) { return obj.thirtyToEnd; }) * 10 / csDiffPerMinDeltas.length).toFixed(2),
    };

    var avgDamageTradeDiff = {
      'zeroToTen' : (_.sum(damageTakenDiffPerMinDeltas, function(obj) { return obj.zeroToTen; }) * 10 / damageTakenDiffPerMinDeltas.length).toFixed(2),
      'tenToTwenty' : (_.sum(damageTakenDiffPerMinDeltas, function(obj) { return obj.tenToTwenty; }) * 10 / damageTakenDiffPerMinDeltas.length).toFixed(2),
      'twentyToThirty' : (_.sum(damageTakenDiffPerMinDeltas, function(obj) { return obj.twentyToThirty; }) * 10 / damageTakenDiffPerMinDeltas.length).toFixed(2),
      'thirtyToEnd' : (_.sum(damageTakenDiffPerMinDeltas, function(obj) { return obj.thirtyToEnd; }) * 10 / damageTakenDiffPerMinDeltas.length).toFixed(2),
    };



    var avgXpDiff = {
      'zeroToTen' : (_.sum(xpDiffPerMinDeltas, function(obj) { return obj.zeroToTen; }) * 10 / xpDiffPerMinDeltas.length).toFixed(2),
      'tenToTwenty' : (_.sum(xpDiffPerMinDeltas, function(obj) { return obj.tenToTwenty; }) * 10 / xpDiffPerMinDeltas.length).toFixed(2),
      'twentyToThirty' : (_.sum(xpDiffPerMinDeltas, function(obj) { return obj.twentyToThirty; }) * 10 / xpDiffPerMinDeltas.length).toFixed(2),
      'thirtyToEnd' : (_.sum(xpDiffPerMinDeltas, function(obj) { return obj.thirtyToEnd; }) * 10 / xpDiffPerMinDeltas.length).toFixed(2),
    };

    subctrl.data = {
      labels: ["0", "0 - 10 Minutes", "10 - 20 Minutes", "20 - 30 Minutes", "30 - End"],
      datasets: [
        {
          label: "CS Diff",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [0, avgCsDiff.zeroToTen, avgCsDiff.tenToTwenty, avgCsDiff.twentyToThirty, avgCsDiff.thirtyToEnd ]
        },
        {
          label: "Damage Taken Diff",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [0, avgDamageTradeDiff.zeroToTen, avgDamageTradeDiff.tenToTwenty, avgDamageTradeDiff.twentyToThirty, avgDamageTradeDiff.thirtyToEnd ]
        },
        {
          label: "XP Diff",
          fillColor: "rgba(120,220,220,0.2)",
          strokeColor: "rgba(120,220,220,1)",
          pointColor: "rgba(120,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [0, avgXpDiff.zeroToTen, avgXpDiff.tenToTwenty, avgXpDiff.twentyToThirty, avgXpDiff.thirtyToEnd ]
        },
      ]
    };

  });