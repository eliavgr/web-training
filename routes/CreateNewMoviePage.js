var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.location = 'createMovie';
  res.render('CreateNewMoviePage', { });
});



module.exports = router;
