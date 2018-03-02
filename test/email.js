var path           = require('path')
  , templatesDir   = path.resolve(__dirname, '..', 'templates')
  , emailTemplates = require('email-templates')
  , nodemailer     = require('nodemailer');
 
console.log(templatesDir);

emailTemplates(templatesDir, function(err, template) {

  if (err) {
    console.log(err);
  } else {
 
    // ## Send a batch of emails and only load the template once 
 
    // Prepare nodemailer transport object 
    var transportBatch = nodemailer.createTransport("SMTP", {
      service: "Gmail",
      auth: {
        user: "reviewfetch@gmail.com",
        pass: "ReviewFetch2018"
      }
    });
 
    // An example users object 
    var users = [
      {
        email: 'kist221@gmail.com',
        name: {
          first: 'Pappa',
          last: 'Google'
        }
      },
      {
        email: 'kist221@ymail.com',
        name: {
          first: 'Mister',
          last: 'Yahoo'
        }
      }
    ];
 
    // Custom function for sending emails outside the loop 
    var Render = function(locals) {
      this.locals = locals;
      this.send = function(err, html) {
        if (err) {
          console.log(err);
        } else {
          transportBatch.sendMail({
            from: 'Spicy Meatball <spicy.meatball@spaghetti.com>',
            to: locals.email,
            subject: 'Hello There ' + locals.name.first,
            html: html,
            // generateTextFromHTML: true, 
            // text: text
          }, function(err, responseStatus) {
            if (err) {
              console.log(err);
            } else {
              console.log(responseStatus.message);
            }
          });
        }
      };
      this.batch = function(batch) {
        batch(this.locals, templatesDir, this.send);
      };
    };
 
    // Load the template and send the emails 
    template('newsletter', true, function(err, batch) {
      for(var user in users) {
        var render = new Render(users[user]);
        render.batch(batch);
      }
    });
 
  }
});