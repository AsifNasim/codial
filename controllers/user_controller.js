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