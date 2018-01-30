const express = require("express");
const router = express.Router();
const passport = require('passport')
const authenticate = require('../../authenticate');
const comments = require('../controllers/comments');

router.post('/newComment',passport.authenticate('jwt', { session: false }), comments.postComment);

module.exports=router;