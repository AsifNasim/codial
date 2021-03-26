const passport = require('passport');

// we have to acquire the strategy
const LocalStrategy = require('passport-local').Strategy;

// Acquiring the User models
const User = require('../models/user');
// AUTHENTICATION USING PASSPORT
// we need to tell the passport to use the Local Strategy
passport.use(new LocalStrategy({
    // we need to pass fields of the schema here
    usernameField:'email'
    }, //second parameter is the callback function
    function(email, password, done){
        // 'done' is internal callback function to passport which handles, success, failure and error
        // FIND A USER AND ESTABLISH THE IDENTITY
        User.findOne({email:email}, function(err,user){
            // first email is the field of schema and second email param is what has been passed 
        // in callback function
            if(err){
                console.log('error in finding the user');
                return done(err);
                // In general done func receives two arguments
            }

            if((!user) || (user.password != password)){
                console.log('Invalid username/password');
                // the first argument in done shows the null as error and the second argument 
                // says that the authentication has not done
                return done(null, false)
            }

            // If user is found then
            return done(null, user);
        });
    }
));

// A serialise user function,
// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});
// A Deserialise user function
// Deserializing the user from the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user');
            return done(err);
        }
        return done(null, user);
    });
}); 

// check if the user is authenticated or not
passport.checkAuthentication = function(req, res, next){
    
    if(req.isAuthenticated()){
        // checks, if the user is authenticated, pass it to next fn(i.e controllers action)
        return next();
    }
    // if the user is not signed in them return it to the sign-in page
    return res.redirect('/users/sign-in');
}
// we use it as a middleware as we are using all three arguments that is req, res and next   
// to check whether the user is signed in or not
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.users contains the current signed in user from the session cookie and we are just sending this 
        // to the locals for the views
        res.locals.user = req.user;
    }
    next();
}
// we are not exporting the strategy, we are just exporting passport
module.exports = passport;