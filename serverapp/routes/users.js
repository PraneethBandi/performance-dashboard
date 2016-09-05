var express = require('express');
var router = express.Router();
var DBservice = require('../Services/dbservice');

/* GET users listing. */
router.get('/', function (req, res, next) {
  DBservice.connect();
  res.send('respond with a resource');
});

module.exports = router;
