var express = require('express');
var router = express.Router();
const jsonBL = require("../models/jsonBL");


/* GET edit user page. */
router.get('/', function(req, res, next) {
  req.session.edit = "edit";
  let user = {id:null ,Username:null ,Password:null , CreateDate:null , NumTransactions:null}
  res.render('EditUsers', {user: user });
});

/* Get edit user page regarding the delete and update */ 
router.get('/:move',async function(req, res, next) {
  console.log(req.params.move);
   if(req.params.move === "delete")
   {
    await jsonBL.DeleteUser(req.query.user);
    let users = await jsonBL.GetUsersData();
    res.render('UserManagementPage', { Users : users});
   } 
   else if(req.params.move === "update")
   {
    req.session.edit = "update";
    let user = await jsonBL.GetUserDataById(req.query.user);
    req.session.userUpdate = user;
    res.render('EditUsers', {user:req.session.userUpdate });
   }
   else{
    req.session.edit = "edit";
    let user = {id:null,Username:null,Password:null, CreateDate:null, NumTransactions:null}
    res.render('EditUsers', {user: user });
   }

});

module.exports = router;
