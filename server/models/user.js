var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
// module.exports = mongoose.model('User',
//   new Schema(
//     { 
//       username: String, 
//       password: String,
//       holdings: Array
//     }
//   )
// );

var SharesSchema = mongoose.Schema(
  {
    date: {type: Number, required: true},
    qty: {type: Number, required: true},
    purchasePrice: {type: Number, required: true}
  }
)

var HoldingsSchema = mongoose.Schema(
  {
    name: {type: String, required: true},
    nameShort: {type: String, required: true},
    stockExchange: {type: String, required: true},
    currency: {type: String, required: true},
    symbol: {type: String, required: true},
    currentPrice: {type: Number, required: true},
    shares: {type: [SharesSchema], default: []}
  }

)

var UserSchema = mongoose.Schema(
  {
    username: {type: String, required: true},
    password: {type: String, required: true},
    cash:     {type: Number, default: 0},
    holdings: {type: [HoldingsSchema], default: []}
  }
);

var User = mongoose.model('User', UserSchema);

module.exports = User