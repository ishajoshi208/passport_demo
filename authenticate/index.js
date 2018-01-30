var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./../app/models/user');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function (passport) {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            UserModel.getUserByUsername(username, function (err, user) {
                if (err) {
                    console.log(err)
                }
                if (!user) {
                    return done(null, false, { message: 'unknown user' })
                }
                console.log("user", user);
                UserModel.comparePassword(password, user.password, function (err, isMatch) {
                    if (err) {
                        console.log(err)
                    }
                    if (isMatch) {
                        console.log("ismatch", isMatch)
                        return done(null, user)
                    }
                    else {
                        return done(null, false, { message: "invalid password" })
                    }
                })
            })
        }
    ));
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        UserModel.getUserById(id, function (err, user) {
            done(err, user);
        });
    });

    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secretKey;

    passport.use(new JWTStrategy(opts,
        (jwt_payload, done) => {
            console.log("jwt payload", jwt_payload);
            UserModel.findOne({ _id: jwt_payload._id }, (err, user) => {
                if (err) {
                    console.log(err);
                    return done(err, false);
                }
                else if (user) {
                    return done(null, user);
                }
                else {
                    return done(null, false);
                }

            })
        }));
}
// exports.verifyUser = passport.authenticate('jwt', { session: false });