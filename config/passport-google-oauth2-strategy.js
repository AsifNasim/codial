const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID:'448487103035-m3assm4hqjfgmss47jgvjbl230pgmfgq.apps.googleusercontent.com',
        clientSecret:'QOxXTH3qDiGuBWpyk3vQnfHV',
        callbackURL:'http://localhost:8000/users/auth/google/callback',
},
// if your access token expires, then refresh token will generate the access token without the intervention of user
function(accessToken, refreshToken, profile, done){
    // google will return the array of emails associated with the users
    
    User.findOne({email:profile.emails[0].value}).exec(function(err, user){
        // checks if the user exist in the database
        if(err){console.log('error in google strategy-passport', err); return;}
        console.log(profile);

        if(user){
            return done(null, user);
        }else{
            User.create({
                name:profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err, user){
                if(err){console.log('error in google strategy-passport', err); return;}

                return done(null, user);
            });
        }
    });
}
));

module.exports = passport;