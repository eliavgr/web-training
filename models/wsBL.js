const WsMoviesData = require("../DAL/MoviesWsDal");

async function GetMovies()
{
    let Data = await WsMoviesData.GetMoviesData();
    Data = Data.data;
    return Data;
}

async function GetMovie(id)
{
    let Data = await WsMoviesData.GetMovieData(id);
    Data = Data.data;
    return Data;
}

async function GetMovieByName(name)
{
    let allData = await WsMoviesData.GetMoviesData();
    let Data = allData.data;
    let movie = Data.find(x => x.name===name);
    if(movie)
    {
        return movie;
    }
    return false;
}

async function SearchMovieByGenres(genres)
{
    let Data = await WsMoviesData.GetMoviesData();
    Data = Data.data;

    let movies = Data.filter(x=> x.genres.includes(genres));

    if(movies)
    {
        return movies;
    }
    return false;
}




module.exports = {GetMovies, GetMovie,GetMovieByName, SearchMovieByGenres};
