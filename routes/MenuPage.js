var express = require('express');
var router = express.Router();
const jsonBL = require("../models/jsonBL");
const dbBL = require("../models/dbBL");
const wsBL = require("../models/wsBL");

/* GET home page. */
router.post('/', async function(req, res, next) 
{
    req.session.createMovie = null;
    if(req.session.login)
    {
        //make a new movie from the create movie page
        if(req.session.location == "createMovie")
        {
            if(!req.body.moviename ||  !req.body.language || !req.body.genres || !req.body.url)
            {
                req.session.createMovie = "Details are missing, please try agian";
                req.session.location = 'menu';
                res.render('MenuPage', {user: req.session});
            }
            else
            {
                let movie = {
                    Name : req.body.moviename,
                    Language : req.body.language,
                    Genres : req.body.genres,
                    Url : req.body.url
                }
                let searchMovieDb = await dbBL.getMovieByName(movie.Name);
                let searchMovieWs = await wsBL.GetMovieByName(movie.Name);

                //console.log(searchMovie);
                if(searchMovieDb || searchMovieWs)
                {
                    req.session.createMovie = "the movie is already Exists";
                    req.session.location = 'menu';
                    res.render('MenuPage', {user: req.session});
                }
                else
                {
                    let newId = await dbBL.createMovie(movie);
                    req.session.createMovie = "created the movie!";
                    req.session.location = 'menu';
                    res.render('MenuPage', {user: req.session});
                }
            }
        }
        //if the user alredy login
        else
        {
            req.session.location = 'menu';
            res.render('MenuPage', {user: req.session});
        }

    }
    // Check if the username and the password from the login page its avilble in the users json file
    else
    {
        if(req.session.location == "login")
        {
            if(req.body.username)
            {
                let User = await jsonBL.GetUserDataByUsername(req.body.username);
                if(User)
                {
                    if(req.body.username == User.Username && req.body.password == User.Password)
                    {
                        req.session.login = true;
                        req.session.user = User;
                        if(req.session.user.admin)
                        {
                            req.session.admin = true;
                        }
                        else
                        {
                            req.session.admin = false;
                        }
                        req.session.location = 'menu';
                        res.render('MenuPage',{user: req.session});

                    }
                    else
                    {
                        res.redirect('login');
                    }
                    
                }
                else
                {
                    res.redirect('login');
                }
            
            }
            else
            {
                res.redirect('login');
            }
        }
    }
});

router.get('/', function(req, res, next) {

    if(req.session.login)
    {
        req.session.location = 'menu';
        res.render('MenuPage',{user: req.session});
    }
    else
    {
       res.redirect('login', { });
    }
});




module.exports = router;
