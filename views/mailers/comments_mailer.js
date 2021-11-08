const nodeMailer = require('../../config/nodemailer');
// this is another way of et is not publishedxporting a method
exports.newComment = (comment) => {
    // console.log('inside newComment mailer');

    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: "asifnasimofficial@gmail.com",
        to: comment.user.email,
        html:  htmlString
        // html:'<h1> Yup, your comment is now publlished! </h1>'
    }, (err, info) => {
        if(err){
            console.log('Error in sending mail', err);;
            return;
        }

        console.log('Message sent', info);
        return;
    });

}