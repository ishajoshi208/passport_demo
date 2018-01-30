const User = require('../models/user');
// const passport = require('passport');


exports.postUser = function (req, res) {
    var newUser = new User(req.body)
    User.createUser(newUser, function (err, user) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(user);
            newUser.save(function (err, data) {
                if (err) {
                    res.json({
                        success: false,
                        message: "Error occured"
                    })
                }
                else {
                    res.json({
                        success: true,
                        data: data,
                        message: "valid"
                    });
                    console.log("dataaaa", data);
                }
            })
        }
    })

}
exports.getUser = function(req,res){
    User.find()
    .exec((err,data)=>{
        if(err){
            res.send(err)
        }
        else{
            console.log(data)
        }
    })
}


