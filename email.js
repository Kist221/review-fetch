const Email = require('email-templates');
const nodeMailer = require("nodemailer");

var EmailTemplate = require('email-templates').EmailTemplate;

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

// const NewEmail = function(to, name, id) {

// const email = new Email({
//   message: {
//     from: 'ReviewFetch@gmail.com'
//   },
//   // uncomment below to send emails in development/test env:
//   send: true,
//   transport: transporter,
// });

// return email
//   .send({
//     template: 'parts',
//     message: {
//       to: to //change to test with your own email
//     },
//     locals: {
//       name: name,
//       id: id
//     }
//   });
//   // .then(console.log)
//   // .catch(console.error);

// };

// Create template based sender function
// assumes text.{ext} and html.{ext} in emails/directory
var sendEmailTemplate = transporter.templateSender(
    new EmailTemplate('./emails'), {
        from: 'reviewfetch@gmail.com',
    });

// Export emailer function
// module.exports = NewEmail;
exports.sendEmail = function (subject, email, name, id, message) {
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