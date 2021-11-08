const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../views/mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');


// if we find the post then only will create the comment
module.exports.create = async function(req, res){

    // .............SIMPLE WAY
    // this will come from HTML form
    // Post.findById(req.body.post, function(err, post){
    //      if(post){
    //         //  if we found the post the we will create the comment e comment
    //         Comment.create({
    //             content: req.body.content,
    //             post : req.body.post,
    //             user : req.user._id
    //         }, function(err, comment){
    //             // handle error here


    //             // this is given by mongoDB
    //             post.comments.push(comment);
    //             // it tells the DB tht this is final version
    //             post.save();

    //             res.redirect('/');
    //         });
    //      }
    // });

    try{

        let post = await Post.findById(req.body.post);
            if(post){
               //  if we found the post the we will create the comment
             let comment = await  Comment.create({
                   content: req.body.content,
                   post : req.body.post,
                   user : req.user._id
               });
                   // handle error here
   
   
                   // this is given by mongoDB
                   post.comments.push(comment);
                   // it tells the DB tht this is final version
                   post.save();
                //    let populate user everytime
                   comment = await comment.populate('user', 'name email').execPopulate();
                //    commentsMailer.newComment(comment);
               let job =   queue.create('emails', comment).save(function(err){
                    if(err){
                        console.log('error in creating queue', err);
                    }
                    console.log('job enqueued',job.id);
                })
               
                   if(req.xhr){
                       

                       return res.status(200).json({
                           data: {
                               comment:comment
                           },
                           message:"Post created!"
                       });
                   } 
                   req.flash('success', 'Comment published!');
                   res.redirect('/');
               
            }
       

    }catch(err){
        console.log('ERROR', err);
        return;
    }
}

module.exports.destroy = async function(req, res){

    //............SIMPLE WAY

    // Comment.findById(req.params.id, function(err, comment){
    //     if(comment.user == req.user.id){

    //         //saving the post in which the comment exist, so that it will 
    //         // not get deleted while deleting it.
    //         let postId = comment.post;

    //         comment.remove();

    //         // $pull is mongoDB CLI query syntax, 
    //         Post.findByIdAndUpdate(postId, {$pull: {
    //             // Id that we need to pull out from comment
    //             comments:req.params.id
    //         }}, function(err, post){
    //             return res.redirect('back');
    //         })
    //     }
    //     // if this doesnot match then we will do the same thing
    //     else{
    //         return res.redirect('back');
    //     }
    // })

    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){

            //saving the post in which the comment exist, so that it will 
            // not get deleted while deleting it.
            let postId = comment.post;

            comment.remove();

            // $pull is mongoDB CLI query syntax, 
           let post = await Post.findByIdAndUpdate(postId, {$pull: {
                // Id that we need to pull out from comment
                comments:req.params.id
            }});
                return res.redirect('back');
            
        }
        // if this doesnot match then we will do the same thing
        else{
            return res.redirect('back');
        }
        

    } catch(err){
        console.log('ERROR',err);
        return;
    }
}