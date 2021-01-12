const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const app = express();

app.use(cookieParser());
app.use(express.urlencoded());
// setting up layouts
app.use(expressLayout);
// So that the layout could read static files
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

// setting up static files(assets)
app.use(express.static('./assets'));
// since we have only one file in routes it will automatically fetch it
app.use('/', require('./routes'));
app.set('view engine', 'ejs');
app.set('views', './views')
const port  = 8000

app.listen(port, function(err){
    if(err){
        console.log(`Error in firing up the server: ${err}`);
    }

    console.log(`Server is up and running at port : ${port}`)
})