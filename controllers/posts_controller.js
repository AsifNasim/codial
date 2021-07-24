// importing the post schema here
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){

    // ...................SIMPLE WAY
    // Post.create({
    //     // post will be created in the content field of the schema and 
    //     // it has same name in the post-form
    //     // it will get the data from the browser and save it in DB
    //     content:req.body.content,
    //     user:req.user._id
    //     // fetching the user form DB schema
    // }, function(err, post){
    //     if(err){console.log('Error in creating post');}

    //     return res.redirect('back');
    // })

    // ...................ASYNC WAY
    
    try{
        let post = await Post.create({
            //     // post will be created in the content field of the schema and 
            //     // it has same name in the post-form
            //     // it will get the data from the browser and save it in DB
                content:req.body.content,
                user:req.user._id
                // fetching the user form DB schema
            });
            // To check any Ajax Request
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post:post
                    },
                    message: "Post Created!"
                });
            }
            req.flash('Success', 'Post Published !' );
            return res.redirect('back');

    }catch(err){
        // console.log('ERROR', err);
        req.flash('error', err );
        return;
    }
}

// Deleting posts
module.exports.destroy = async function(req, res){
    // ..............SIMPLE WAY
    // Post.findById(req.params.id, function(err, post){
    //     // mongoose will automatically converted it into strings
    //     // otherwise we will be using ._id
    //     if(post.user == req.user.id){
    //         post.remove();

    //         Comment.deleteMany({post:req.params.id}, function(err){
    //                 return res.redirect('back');
    //         })
    //     } else{
    //         return res.redirect('back');
    //     }
    // });

    // ...........ASYNC WAY
    try{

        let post = await Post.findById(req.params.id);
    //     // mongoose will automatically converted it into strings
    //     // otherwise we will be using ._id
        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post:req.params.id});


            if(req.xhr){
                return res.status(200).json({
                    data : {
                        post_id:req.params.id
                    },
                    message:"Post deleted"
                })
            }
            req.flash('Success', 'Post and associated deleted !' );
            return res.redirect('back');
        } else{
            req.flash('error', 'You cannot delete this post !' );
            return res.redirect('back');
        }
    

    }catch(err){
        req.flash('error', err );
        // console.log('Error',err);
        return res.redirect('back');
    }
}