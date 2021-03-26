// importing the post schema here
const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.create({
        // post will be created in the content field of the schema and 
        // it has same name in the post-form
        content:req.body.content,
        user:req.user._id
        // fetching the user form DB schema
    }, function(err, post){
        if(err){console.log('Error in creating post');}

        return res.redirect('back');
    })
}