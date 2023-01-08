
const moviesModel = require('./movieModel');

const getMovies = function()
{
    return new Promise((resolve, reject) =>
    {
        moviesModel.find({}, function(err, data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data)
            }
        })
    })
}

const getMovieById = function(id)
{
    return new Promise((resolve, reject) =>
    {
        moviesModel.findById(id, function(err, data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data);
            }
        })
    })
}
const getMovieByName = function(name)
{
    return new Promise((resolve, reject) =>
    {
        moviesModel.find({}, function(err, data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                let movie = data.find(x => x.name === name);
                if(movie){
                    resolve(movie);
                }
                else{
                    resolve(false);
                }
                
            }
        })
    })
}


const createMovie = function(obj)
{
    return new Promise((resolve, reject) =>
    {

        let movie = moviesModel({
           // id : obg.Id,
            name : obj.Name,
            language : obj.Language,
            genres : obj.Genres,
            url : obj.Url
        });


        movie.save(function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(movie._id);
            }
        })
    })
}


const updateMovie = function(id,obj)
{
    return new Promise((resolve, reject) =>
    {

        moviesModel.findByIdAndUpdate(id,
            {
                //id : obg.Id,
                name : obj.Name,
                language : obj.Language,
                genres : obj.Genres
            }, function(err)
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve('Updated !!')
                }
            })



    })
}


const deleteMovie = function(id)
{
    return new Promise((resolve, reject) =>
    {

        moviesModel.findByIdAndDelete(id,function(err)
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve('Deleted !!')
                }
            })



    })
}




module.exports = {getMovies, getMovieById, getMovieByName, createMovie,updateMovie,deleteMovie}

