const nodeMailer = require("nodemailer");
const EmailTemplate = require('email-templates').EmailTemplate;

// Password of the email to use
var password = 'ReviewFetch2018';

var transporter = nodeMailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'ReviewFetch@gmail.com',
        pass: password
    }
});

// NOTE! - Must run test from within directory.

// Create template based sender function
// assumes text.{ext} and html.{ext} in emails/directory
var sendEmailTemplate = transporter.templateSender(
    new EmailTemplate('./emails'), {
        from: 'reviewfetch@gmail.com',
    });

// Export emailer function
exports.sendEmail = function (email, subject, id, name, message) {
    sendEmailTemplate({
        to: email,
        subject: subject
    }, {
        id: id,
        name: name,
        message: message
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n' + JSON.stringify(info));
        }
    });
};