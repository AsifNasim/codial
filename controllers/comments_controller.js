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


                // this is given by mongoDB
                post.comments.push(comment);
                // it tells the DB tht this is final version
                post.save();

                res.redirect('/');
            });
         }
    });
}

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if(comment.user == req.user.id){

            //saving the post in which the comment exist, so that it will 
            // not get deleted while deleting it.
            let postId = comment.post;

            comment.remove();

            // $pull is mongoDB CLI query syntax, 
            Post.findByIdAndUpdate(postId, {$pull: {
                // Id that we need to pull out from comment
                comments:req.params.id
            }}, function(err, post){
                return res.redirect('back');
            })
        }
        // if this doesnot match then we will do the same thing
        else{
            return res.redirect('back');
        }
    })
}