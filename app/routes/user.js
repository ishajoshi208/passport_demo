const express = require("express");
const router = express.Router();
const UserCont = require('../controllers/user');
const passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;
const authenticate = require('../../authenticate');
const generateToken = require('../../tokenGenerate');

router.post('/register', UserCont.postUser);
router.post('/login', passport.authenticate('local'),(req,res)=>{

    var token = generateToken.getToken({_id:req.user._id})
    res.statusCode=200;
    res.json({success: true,token: token, status:"Login Successful"})
});
// router.get('/',UserCont.getUser)


module.exports = router;