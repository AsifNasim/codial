// importing the post schema here
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
    Post.create({
        // post will be created in the content field of the schema and 
        // it has same name in the post-form
        // it will get the data from the browser and save it in DB
        content:req.body.content,
        user:req.user._id
        // fetching the user form DB schema
    }, function(err, post){
        if(err){console.log('Error in creating post');}

        return res.redirect('back');
    })
}

// Deleting posts
module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post){
        // mongoose will automatically converted it into strings
        // otherwise we will be using ._id
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post:req.params.id}, function(err){
                    return res.redirect('back');
            })
        } else{
            return res.redirect('back');
        }
    });
}