const Post =  require('../../../models/post');
const Comment = require('../../../models/comment'); 


module.exports.index = async function(req, res){

    // populate the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
    return res.json(200, {
        message: " List of posts v1",
        posts: posts
    });
};

module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post : req.params.id});
    
           return res.json(200, {
               message:"Post and associated comments deleted successfully!"
           });
        }else{
            return res.json(401, {
                // 401 : Unauthorised Error
                message:" You cannot delete this post!"
            });
        }

       

    }
    catch(err){
        console.log('Error', err);
         // 500 HTTP Status Code: 'Interval Server Error'
        return res.json(500,{
            message:"Internal Server Error"
        });
    }
}