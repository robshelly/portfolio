var User = require('./../../models/user'); // get our mongoose model



exports.getHoldings = function(req, res) {

  User.findOne({
    _id: req.body.id
  }, function(err, user) {

    if (!user) {
      res.status(500).send({ error: "Transactions not found" });

    } else if (user) {

      var holdings = user.holdings
      var multiplier
      switch(req.body.testData) {
        case ("testCase0"):
            multiplier = 1
            break;
        case "testCase1":
            multiplier = 1.1
            break;
        case "testCase2":
            multiplier = 0.9
            break;
        case "testCase3":
            multiplier = 1.2
            break;
        case "testCase4":
            multiplier = 0.8
            break;
        case "testCase5":
            multiplier = 2
            break;
        default:
            multiplier = 1
      }
      
      // holdings = holdings.map((holding) => {
      //   holding.currentPrice *= multiplier
      // })

      holdings.forEach((holding) => {
        holding.currentPrice *= multiplier
      })


      res.json(
        {
          cash: user.cash,
          holdings: holdings
        }
      );
    }
  })
}