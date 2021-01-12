const User = require('../models/user');
module.exports.profile = function(req, res){
    return res.render('user_Profile',{
        title: 'Profile'
    });
}

module.exports.contact = function(req, res){
    return res.end('<h1>Contact Us </h1>')
}

module.exports.posts = function(req, res){
    return res.end('<h1>Posts of codial media app</h1>')
}
// Render the sign in page
module.exports.signin = function(req, res){
    return res.render('sign-in', {
        title:'Codeial | Sign-in Page'
    });
}

// Render the sign up page
module.exports.signup = function(req, res){
    return res.render('sign-up', {
        title:'Codeial | Sign-up Page'
    });
}

module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email}, function(err, user){
        if(err){console.log('error in finding the user in signing up'); return}
        // If user is not there
        if(!user){
            console.log(req.body);
            // then we will create a new one 
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating the user in signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })
}

module.exports.createSession = function(req, res){
    // To DO LATER
}
