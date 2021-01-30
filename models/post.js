const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    // schema fields here
    content: {
        type:String,
        required:true
    },

    user: {
        // we have to connect user to the post , in other words we 
        // have to create relations between user and posts
        type:mongoose.Schema.Types.ObjectId,
        // User is the schema we are refferring to
        ref: 'User'
    }
}, {
    // it creates two things in the DB one is 
    timestamps:true
})

// we need to export the model here
const Post = mongoose.model('Post', postSchema);
module.exports = Post;