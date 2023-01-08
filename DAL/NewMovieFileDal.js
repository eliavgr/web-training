const JFile = require("jsonfile");


const GetNewMoviesData = ()=>
{
    return new Promise((resolve,reject)=>
    {
        return JFile.readFile(__dirname +"/NewMovies.json", function(err,resp)
        {
            if(err)
            {
                reject(err)  
            }
            else{
                resolve(resp) ; 
            }
        })
    })
}

function CreateMovie(data)
{
    return new Promise((resolve,reject)=>
    {
        JFile.writeFile(__dirname +"/NewMovies.json",data, function(err)
        {
            if(err)
            {
                reject(err) 
            }
            else{
                resolve("created!") 
            }
        })

    })
}


module.exports = {GetNewMoviesData, CreateMovie};