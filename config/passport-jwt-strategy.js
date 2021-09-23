const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;

// Extract JWt from header

const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey :'codial'
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    //  JWt payload contain the id of the user
    User.findById(jwtPayLoad._id, function(err, user){
        if(err){
            console.log('Error in finding user from JWT');
            return;
        }

        if(user){
            // Callback Function
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
}));

module.exports = passport;