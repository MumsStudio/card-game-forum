const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");

const app = express();
require("dotenv").config({ path: './backend/.env' });

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

console.log(process.env.DBPASS);

mongoose.connect("mongodb+srv://testDB:"+process.env.DBPASS+"@cluster0.jceaz.mongodb.net/card-game-forum?retryWrites=true&w=majority")
.then(()=>{
  console.log("Connected to database");
})
.catch((error)=>{
  console.log(error);
  console.log("Connection to database failed");
});


// set header handle CORS error
app.use((request, response, next)=>{
  response.setHeader("Access-Control-Allow-Origin","*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/blogs",blogRoutes);
app.use("/api/user", userRoutes);

module.exports = app;

