const Email = require('email-templates');
var nodeMailer = require("nodemailer");

// The email to use in sending the email
//(@ symbol changed to %40)
var sender = 'smtps://ReviewFetch%40gmail.com';
// Password of the email to use
var password = 'ReviewFetch2018';

var transporter = nodeMailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'ReviewFetch@gmail.com',
        pass: 'ReviewFetch2018'
    }
});

const email = new Email({
  message: {
    from: 'ReviewFetch@gmail.com'
  },
  // uncomment below to send emails in development/test env:
  send: true,
  transport: transporter
});
 
email
  .send({
    template: 'parts',
    message: {
      to: 'kist221@gmail.com' //change to test with your own email
    },
    locals: {
      name: 'Dillon'
    }
  })
  .then(console.log)
  .catch(console.error);