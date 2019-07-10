'use Strict';

const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { Strategy: GoogleStrategy} = require('passport-google-oauth').OAuth2Strategy;

const { User } = require('../users/models');
const { JWT_SECRET } = require('../config');

const localStrategy = new LocalStrategy((username, password, callback) => {
    console.log(username)
    console.log(password)
    let user;
    User
        .findOne({ username: username })
        .then(_user => {
            user = _user;
            if (!user) {
                return Promise.reject({
                    reason: 'LoginError',
                    message: 'Incorrect username or password'
                });
            }
            return user.validatePassword(password);
        })
        .then(isValid => {
            if (!isValid) {
                return Promise.reject({
                    reason: 'Login Error',
                    message: 'Incorrect username or password'
                });
            }
            return callback(null, user);
        })
        .catch(err => {
            if (err.reason === 'LoginError') {
                return callback(null, false, err);
            }
            return callback(err, false);
        });
});

const jwtStrategy = new JwtStrategy(
    {
        secretOrKey: JWT_SECRET,
        //Bearer auth header
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        //Only HS256 token
        algorithms: ['HS256']
    },
    (payload, done) => {
        done(null, payload.user);
    }
);


const GoogleStrategy = new GoogleStrategy (
    {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    function(accesstoken, refreshToken, profile, done) {
        User.findOrCreate({googleId: profile.id}, function (err, user) {
            return done(err, user); 
        });
    }
);

module.exports = { localStrategy, jwtStrategy };