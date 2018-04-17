var express = require('express');
var controller = require('./holdings.controller');

var router = express.Router();

router.post('/', controller.getHoldings);

module.exports = router;