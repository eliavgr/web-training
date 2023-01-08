const UsersData = require("../DAL/UsersFileDal");
const uuid = require("uuid")

async function GetUsersData() {
    let AllUsersData = await UsersData.GetUsersData();
    AllUsersData = AllUsersData.users;
    return AllUsersData;
}

async function GetUserDataById(id) {
    let AllUsersData = await UsersData.GetUsersData();
    AllUsersData = AllUsersData.users;
    let User = AllUsersData.find(x => x.id === id);
    if (User) {
        return User;
    }
    else {
        return false;
    }

}
async function GetUserDataByUsername(username) {
    let AllUsersData = await UsersData.GetUsersData();
    AllUsersData = AllUsersData.users;
    let User = AllUsersData.find(x => x.Username === username);
    if (User) {
        return User;
    }
    else {
        return false;
    }

}

async function CreateUserData(user) {
    let AllUsersData = await UsersData.GetUsersData();
    let NewUsersData = { users: AllUsersData.users };
    user.id = uuid.v4();
    NewUsersData.users.push(user);
    await UsersData.CreateUser(NewUsersData);
    return "created!";

}

async function UpdateUserData(user) {
    let AllUsersData = await UsersData.GetUsersData();
    let NewUsersData = { users: AllUsersData.users };
    NewUsersData.users = NewUsersData.users.map(function(x){
        if(x.Username == user.Username)
        {
            user.id = x.id;
            return user;
        }
        else{
            return x;
        }
    });
    await UsersData.CreateUser(NewUsersData);
    return "update!";

}
async function DeleteUser(id) {
    console.log(id);
    let AllUsersData = await UsersData.GetUsersData();
    let JustUsersData = AllUsersData.users;
    let NewUsersData = JustUsersData.filter(x => x.id != id);
    console.log(NewUsersData);
    NewUsersData = {users: NewUsersData};
    await UsersData.CreateUser(NewUsersData);
    return "created!";

}

module.exports = { GetUsersData, GetUserDataById,GetUserDataByUsername,  CreateUserData, UpdateUserData ,DeleteUser};