const mongoose = require('mongoose');
const express = require('express');
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    userName: {
        type: String
    },
    password: {
        type: String
    },
    confirmPassword: {
        type: String
    }
})

var User = module.exports = mongoose.model('user', userSchema);

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            // Store hash in your password DB. 
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByUsername = function(username,callback){
    var query = {userName: username};
    User.findOne(query,callback);
    console.log()
}


module.exports.getUserById = function(id,callback){
    User.findById(id,callback)
}

module.exports.comparePassword = function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,function(err,isMatch){
        if(err){
            console.log(err)
        }
        callback(null,isMatch)
    })
}

