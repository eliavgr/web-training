var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.login = false;
  req.session.location = 'login';
  res.render('login', { });
});


module.exports = router;
