const express = require('express');
const app = express();
const port  = 8000;
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// The mongo store is used to store session cookie on a persistent storage and it also has an argument while requiring it
// which is session
const MongoStore  = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended', // it could be expanded
    prefix:'/css'
}))
app.use(express.urlencoded());
app.use(cookieParser());
// setting up static files(assets)
app.use(express.static('./assets')); 
// setting up layouts
app.use(expressLayout);
// So that the layout could read static files
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)



app.set('view engine', 'ejs');
app.set('views', './views')

// creating session
app.use(session({
    name:'codeial',
    // TODO change the secret before deployment in production mode
    secret:'hehehe',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
    ,
    // mongo store us used to store the session cookie in the db
    store: new MongoStore({
        mongooseConnection:db,
        autoRemove : 'disabled'
    },
    // there is the callback func in case the connection is not get established
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    }
    )
})); 

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
// since we have only one file in routes it will automatically fetch it
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in firing up the server: ${err}`);
    }

    console.log(`Server is up and running at port : ${port}`)
})