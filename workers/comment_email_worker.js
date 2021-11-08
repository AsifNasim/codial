const queue = require('../config/kue');

const commmentsMailer = require('../views/mailers/comments_mailer');

queue.process('emails', function(job, done){
    console.log('emails worker is processing a job', job.data);

    commmentsMailer.newComment(job.data);

    done();
})
