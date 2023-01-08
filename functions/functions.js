const dbBl = require("../models/dbBL")
const wsBl = require("../models/wsBL")



async function GetSearchMovie(req) {
    //checks if the user has not entered enough ditals
    if (!req.body.language || !req.body.moviename || !req.body.genres) {
        return [false, false]
    }

    let language = req.body.language;
    let movieName = await wsBl.GetMovieByName(req.body.moviename);
    let moviesGenres = await wsBl.SearchMovieByGenres(req.body.genres);
    let NewmovieName = await dbBl.getMovieByName(req.body.moviename);
    //checks if the movie is not found in the WS and found in the new movies in the DB
    if (!movieName && NewmovieName) {
        movieName = NewmovieName;
    }

    //checks if not found more movies in this genres 
    if (!moviesGenres) {
        moviesGenres = "notGeners";
    }

    //checks if found the movie by the name and decided what to return
    if (movieName) {
        if (movieName.genres.includes(req.body.genres) && movieName.language == language) {
            return [movieName, moviesGenres];
        }
        if (movieName.genres.includes(req.body.genres)) {
            return ["notSameLanguage", moviesGenres];
        }
        if (movieName.language == language) {
            return ["notSameGenres", moviesGenres];
        }
        return ["notSameGenresAndLanguage", moviesGenres];
    }
    return ["notSameName", moviesGenres];

}

module.exports = { GetSearchMovie };