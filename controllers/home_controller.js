const Post = require('../models/post');
const User =  require('../models/user');
module.exports.home = async function(req, res){
    // return res.end('<h1>Express is up for social media app: Codial</h1>');
    // console.log(req.cookies)
    // res.cookie('user_id', 100);

    // Post.find({}, function(err, posts){
    //     if(err){
    //         console.log('error in fetching data from DB');
    //         return;
    //     }

    //     // first argument inside render is the view
    //     return res.render('home',{
    //         title:'Codial Web',
    //         posts:posts
    //     })
    // })
    // we have shifted the above callback function to exec()

    //.........SIMPLE METHOD.................. 

    // Post.find({})
    // .populate('user')
    // .populate({
    //     path:'comments',
    //     populate:{
    //        path:'user' 
    //     }
    // })
    // .exec(function(err, posts){
    //     // Fetching all the users
    //     User.find({}, function(err, users){
    //         return res.render('home',{
    //             title:'Codial Web',
    //             posts:posts,
    //             all_users:users
    //         });
    //     });
    // }) 


    try{
        // populate the user of each post
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });

        let users = await User.find({});
            return res.render('home', {
                title: "Codeial | Home",
                posts: posts,
                all_users: users
            });
    } catch(err){
        console.log('Error', err);
        return;
    }

}

module.exports.about = function(req, res){
    return res.end('<h1>About page of codial</h1>')
}

module.exports.post = function(req, res){
    return res.end('<h1>Post page of codial</h1>')
}

