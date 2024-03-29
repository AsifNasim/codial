const User = require('../models/user');
const fs = require('fs');
const path = require('path');
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_Profile',{
            title: 'User Profile',
            profile_user: user
        });
    });
}


// Updating Profile
module.exports.update = async function(req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('UnAuthorized');
    // }
    if(req.user.id == req.params.id){

        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('***********Multer Error:', err);
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    // checking if the avatar already exists
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..', user.avatar))
                    }
                    user.avatar = User.avatarPath + '/'+ req.file.filename;
                }
                user.save();
                return res.redirect('back');    
            });
            
        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }

    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('UnAuthorized');
    }

}


module.exports.contact = function(req, res){
    return res.end('<h1>Contact Us </h1>')
}

module.exports.post = function(req, res){
    return res.end('<h1>Post posted successfully</h1>');
}
// Render the sign in page
module.exports.signin = function(req, res){
    if(req.isAuthenticated()){
       return req.redirect('/users/profile');
    }
    return res.render('sign-in', {
        title:'Codeial | Sign-in Page'
    });
}

// Render the sign up page
module.exports.signup = function(req, res){
    // we will check here if the user is signed in and if yes, then 
    // we will redirect it to profile page
    if(req.isAuthenticated()){
       return req.redirect('/users/profile');
    }
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
    // The message sent on the web page when successfullly signed in
    req.flash('success', 'Logged in Successfully');
    // Redirecting to the homepage
    return res.redirect('/');
}


module.exports.destroySession = function(req, res){
    // this logout function is given by passport authentication library
    req.logout();
    req.flash('success', 'Logged out Successfully');

    return res.redirect('/');
}