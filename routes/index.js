var express = require('express');
var router = express.Router();
require('../models/Truck')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quicargo' });
});

module.exports = router;
