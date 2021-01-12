module.exports.home = function(req, res){
    // return res.end('<h1>Express is up for social media app: Codial</h1>');
    console.log(req.cookies)
    res.cookie('user_id', 100);
    return res.render('home', {
        title:'Codial Web'
    });
}

module.exports.about = function(req, res){
    return res.end('<h1>About page of codial</h1>')
}

module.exports.post = function(req, res){
    return res.end('<h1>Post page of codial</h1>')
}

