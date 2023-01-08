const JFile = require("jsonfile");

const GetUsersData = ()=>
{
    return new Promise((resolve,reject)=>
    {
        return JFile.readFile(__dirname +"/Users.json", function(err,resp)
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

function CreateUser(data)
{
    return new Promise((resolve,reject)=>
    {
        JFile.writeFile(__dirname +"/Users.json",data, function(err)
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


module.exports = {GetUsersData, CreateUser};