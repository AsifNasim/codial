const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');


//This thing defines how the commmunication takes place
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host:'smtp.gmail.com',
    port:'587',
    secure: false,
    auth : {
        user: 'userID',
        pass : 'userPassword'
    }
});


let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){console.log('error in rendering template', err); return }

            mailHTML = template;
        }

    )

    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}