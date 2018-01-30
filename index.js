const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const routesUser = require('./app/routes/user');
const routeComment = require('./app/routes/comments');
const passport = require("passport");
const config = require('./config');

app.listen(3000, function (err, data) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Server Started at port 3000");
    }
});

config.mongoUrl;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
require('./authenticate')(passport);//add this line
app.use("/user",routesUser);
app.use("/comments",routeComment);