const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    // schema fields here
    content: {
        type:String,
        required:true // without this the post will not be saved in th DB
    },

    user: {
        // we have to connect user to the post , in other words we 
        // have to create relations between user and posts
        type:mongoose.Schema.Types.ObjectId,
        // User is the schema we are refferring to
        ref: 'User'
    },

    // include the array of IDs of all the comments 
    // in this post schema itself
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            // referring to schema
            ref: 'Comment'
        }
    ]

}, {
    // it creates two things in the DB one is 
    timestamps:true
})

// we need to export the model here
// we need to tell the it is a model in the database
const Post = mongoose.model('Post', postSchema);
module.exports = Post;