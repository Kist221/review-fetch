const Email = require('email-templates');
const nodeMailer = require("nodemailer");

// NOTE! - Must run test from within directory. 

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

const email = new Email({
  message: {
    from: 'ReviewFetch@gmail.com'
  },
  // uncomment below to send emails in development/test env:
  send: true,
  transport: transporter,
});

email
  .send({
    template: 'parts',
    message: {
      to: 'kist221@gmail.com' //change to test with your own email
    },
    locals: {
      name: 'Dillon',
      uid: 1
    }
  })
  .then(console.log)
  .catch(console.error);