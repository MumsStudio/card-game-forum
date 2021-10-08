const express = require("express");

const UserController = require("../controller/user");

const router = express.Router();

// create new user
router.post("/signup", UserController.createUser);
// login user
router.post("/login", UserController.login);

// admin functions
// list user


// router.get("/", (req, res, next)=>{
//   const pageSize = +request.query.pageSize;
//   const currPage = +request.query.currPage;
//   const UserQuery = User.find();
// });


module.exports = router;
