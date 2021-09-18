const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type: String
    }
},{
    timestamps:true
})

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        // it will join the path of the currwnt user
        cb(null, path.join(__dirname,'..', AVATAR_PATH));
    },

    filename : function(req, file, cb){
        // Date.now()  give date in miliseconds so that we can diffrentiate between two files uploaded with
        // the same name 
        // Every file will be saved as avatar-Date.now()
        cb(null, file.fieldname+ '-' + Date.now);
    }
});
/*Statics  : static function are those functions that can be called over the whole class*/ 
// this attaches the diskStorage property of multer to storage property
userSchema.statics.uploadedAvatar = multer({
    storage : storage
    // only one file should be addded.
}).single('avatar');


userSchema.statics.avatarPath = AVATAR_PATH;
const User = mongoose.model('User', userSchema);

module.exports = User;