var express = require('express');
var router = express.Router();
const dbBL = require("../models/dbBL")
const wsBL = require("../models/wsBL")

/* GET home page. */
router.get('/:id',async function(req, res, next) {
  let id = req.params.id
  //console.log(id);
  let movie = await wsBL.GetMovie(id);
  //console.log(movie);
  if(!movie)
  {
    movie = await dbBL.getMovieById(id);
  }
  req.session.location = 'MoviePage';
  res.render('MoviePage', {movie : movie });
});



module.exports = router;
