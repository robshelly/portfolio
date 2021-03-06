var User = require('./models/user');

exports.seed = function(req, res) {

  // create a sample user
  var user = new User(
    {
      username: 'rob',
      password: 'password',
      cash: 100,
      holdings: [
        {
          name: 'AIB GROUP PLC',
          nameShort: 'AIB',
          stockExchange: 'ise',
          currency: 'euro',
          symbol: 'AIBG_I',
          currentPrice: 5.00,
          shares: [
            {
              date: 1514764800,
              qty: 1000,
              purchasePrice: 5.00
            }
          ]
        },
        {
          name: 'BK IRE GRP PLC',
          nameShort: 'Bank of Ireland',
          stockExchange: 'ise',
          currency: 'euro',
          symbol: 'BIRG_I',
          currentPrice: 4.00,
          shares: [
            {
              date: 1325376000,
              qty: 1000,
              purchasePrice: 4.00
            },
            {
              date: 1356998400,
              qty: 2000,
              purchasePrice: 3.50
            },
            {
              date: 1388534400,
              qty: 3000,
              purchasePrice: 3.00
            },
            {
              date: 1420070400,
              qty: 1000,
              purchasePrice: 3.50
            },
            {
              date: 1451606400,
              qty: 2000,
              purchasePrice: 3.50
            },
            {
              date: 1483228800,
              qty: 3000,
              purchasePrice: 4.00
            },
            {
              date: 1514764800,
              qty: 4000,
              purchasePrice: 5.50
            }
          ]
        },
        {
          name: 'CRH PLC',
          nameShort: 'CRH',
          stockExchange: 'ise',
          currency: 'euro',
          symbol: 'CRH_I',
          currentPrice: 30.00,
          shares: [
            {
              date: 1388534400,
              qty: 3000,
              purchasePrice: 20.00
            },
            {
              date: 1420070400,
              qty: 1000,
              purchasePrice: 25.00
            },
            {
              date: 1451606400,
              qty: 2000,
              purchasePrice: 30.00
            }
          ]
        },
        {
          name: 'Tesco',
          nameShort: 'Tesco',
          stockExchange: 'ftse350',
          currency: 'sterling',
          symbol: 'TSCO',
          currentPrice: 4.50,
          shares: [
            {
              date: 1388534400,
              qty: 4000,
              purchasePrice: 3.00
            },
            {
              date: 1420070400,
              qty: 8000,
              purchasePrice: 2.50
            },
            {
              date: 1451606400,
              qty: 2000,
              purchasePrice: 4.50
            }
          ]
        },
        {
          name: 'Ripple',
          nameShort: 'Ripple',
          stockExchange: 'coinranking',
          currency: 'dollar',
          symbol: 'ripple-xrp',
          currentPrice: 2.00,
          shares: [
            {
              date: 1451606400,
              qty: 3000,
              purchasePrice: 2.00
            },
            {
              date: 1483228800,
              qty: 1000,
              purchasePrice: 2.50
            },
            {
              date: 1514764800,
              qty: 2000,
              purchasePrice: 3.00
            }
          ]
        }
      ]
    }
  );

  // save the sample user
  user.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
};

