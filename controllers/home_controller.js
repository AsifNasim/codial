module.exports.home = function(req, res){
    return res.end('<h1>Express is up for social media app: Codial</h1>');
}

module.exports.about = function(req, res){
    return res.end('<h1>About page of codial</h1>')
}