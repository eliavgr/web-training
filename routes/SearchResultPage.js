var express = require('express');
var router = express.Router();
const functions = require("../functions/functions")


/* GET home page. */
router.post('/', async function(req, res, next) {
  console.log(req.session.login);
  if(req.session.login)
    {
      console.log(req.session.location);
      if(req.session.location == "searchMovie")
      {
        let resp = await functions.GetSearchMovie(req);
        req.session.MovieName = resp[0];
        req.session.MoviesGenres = resp[1];
        res.render('SearchResultPage', {movieName: req.session.MovieName, moviesGenres: req.session.MoviesGenres});
      }
      else
      {
        res.render('MenuPage',{user: req.session});
      }      
    }

  else
    {
      res.redirect('login');
    }
});

router.get('/', function(req, res, next) {
  if(req.session.location == 'MoviePage')
  {
    req.session.location = 'resultMovie';
    //console.log(req.session.MovieName)
    res.render('SearchResultPage', {movieName: req.session.MovieName, moviesGenres: req.session.MoviesGenres});
  }
    res.render('MenuPage',{user: req.session});
  });
  

module.exports = router;
