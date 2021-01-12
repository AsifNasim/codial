const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection

db.on('error', console.error.bind(console,'Error in connecting to the DataBase'));

db.once('open', function(){
    console.log('Connected to the DataBase :: MongoDB')
})

module.exports = db;