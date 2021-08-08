const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

require("dotenv").config({ path: './backend/.env' });

const router = express.Router();

router.post("/signup", (req, res, next)=>{
  bcrypt.hash(req.body.password, 10).then(resultHash=>{
    const user = new User({
      username: req.body.username,
      password: resultHash
    });
    user.save()
    .then(result=>{
      res.status(201).json({
        message: "Successfully registered"
      });
    })
    .catch(error=>{
      console.log(error);
      res.status(500).json({
        error: error
      });
    });
  });
});

router.post("/login", (req, res,next)=>{
  let fetchedUser;
  User.findOne({ username: req.body.username}).then(user=>{
    if (!user){
      return res.status(401).json({
        message: "auth failed"
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password)
  })
  .then(result=>{
    if(!result){
      return res.status(401).json({
        message: "auth failed"
      });
    }
    console.log(process.env.JWT_SECRTE);
    const token = jwt.sign({username:fetchedUser.username, userID: fetchedUser._id},process.env.JWT_SECRTE, {expiresIn: "1h"});
    res.status(200).json({
      token:token,
      expiresIn: 3600,
      userID: fetchedUser._id
    });
  })
  .catch(error=>{
    return res.status(401).json({
      message: "auth failed",
    });
  });
});


module.exports = router;
