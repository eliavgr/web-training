const axios = require("axios");

function GetMoviesData()
{
    return axios.get("http://api.tvmaze.com/shows");
}

function GetMovieData(id)
{
    return axios.get("http://api.tvmaze.com/shows/"+id);
}


module.exports = {GetMoviesData,GetMovieData};

