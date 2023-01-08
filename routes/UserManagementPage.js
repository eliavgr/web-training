var express = require('express');
var router = express.Router();
const jsonBL = require("../models/jsonBL");


/* GET UserManegmentPage page. */
router.get('/', async function (req, res, next) {
  let Users = await jsonBL.GetUsersData();
  res.render('UserManagementPage', { Users: Users });
});

/* POST UserManegmentPage page. */
router.post('/', async function (req, res, next) {
  let user = {
    Username: req.body.username,
    Password: req.body.password,
    CreateDate: req.body.date,
    NumTransactions: req.body.transactions
  }

  if (req.session.edit == "update") {
    // console.log(await jsonBL.GetUserDataByUsername(user.Username));
    // console.log(req.session.userUpdate.Username);
    if (user.Username == req.session.userUpdate.Username)
    {
      await jsonBL.UpdateUserData(user);
      let Users = await jsonBL.GetUsersData();
      res.render('UserManagementPage', { Users: Users })
    }
    else {
      req.session.edit = "update";
      user.Username = req.session.userUpdate.Username;
      user.err = "you can't changing your username!";
      res.render('EditUsers', { user: user});
    }
  }
  else if (req.session.edit == "edit") {
    if (await jsonBL.GetUserDataByUsername(user.Username)) {
      req.session.edit = "edit";
      let user = { id: null, Username: null, Password: null, CreateDate: null, NumTransactions: null, err: "this username already exsist!" }
      res.render('EditUsers', { user: user });
    }
    else {
      await jsonBL.CreateUserData(user);
      let Users = await jsonBL.GetUsersData();
      res.render('UserManagementPage', { Users: Users });
    }
  }

});





module.exports = router;
