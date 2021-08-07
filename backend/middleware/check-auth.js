const jwt = require("jsonwebtoken");
require("dotenv").config({ path: './backend/.env' });

module.exports = (req, res, next)=>{
  try{
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token,process.env.JWT_SECRTE);
    req.userData = {username: decodedToken.username, userID: decodedToken.userID};
    next();
  }catch(error){
    res.status(401).json({message: "auth failed"});
  }
};
