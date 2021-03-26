const Comment = require('../models/comment');
const Post = require('../models/post');

// if we find the post then only will create the comment
module.exports.create = function(req, res){
    // this will come from HTML form
    Post.findById(req.body.post, function(err, post){
         if(post){
            //  if we found the post the we will create the comment
            Comment.create({
                content: req.body.content,
                post : req.body.post,
                user : req.user._id
            }, function(err, comment){
                // handle error here
                post.comments.push(comment);
                // it tells the DB tht this is final one
                post.save();

                res.redirect('/');
            });
         }
    });
}