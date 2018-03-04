// requirement
var express = require("express");
// This is the package we're using for sending email (for now)
// var nodeMailer = require("nodemailer");

var router = express.Router();

// Requiring our models
var db = require("../models");

// Require our emailer function
const NewEmail = require("../email");
// test mailer
// NewEmail("kist221@gmail.com", "Dillon", 3);

// Create all our routes and set up logic within those routes where required.

/**********************
 *                    *
 *    SEEDS for DB    *
 *                    *
 **********************/
router.get("/seedUser", function(req, res) {
  // Create a User
 db.Users.create({
  username: "user",
  password: "pass",
 })
 .then(function(dbUsers) {
      res.json(dbUsers);
    });
});
router.get("/seedCompany", function(req, res) {
  // Create a company for the User
 db.Company.create({
  name: "My Company",
  UserId: 1
 })
 .then(function(dbUsers) {
      res.json(dbUsers);
    });
});
/*************************
 *                       *
 *   END SEEDS for DB    *
 *                       *
 *************************/

// Home page/ Dashboard
// This will eventually be a Landing Page
// but for now redirect to dashboard
router.get("/", function(req, res) {
  res.render("dashboard");
});

// Dashboard Page
router.get("/dashboard", function(req, res) {
  res.render("dashboard");
});

// Settings Page
router.get("/settings", function(req, res) {
  res.render("settings");
});

// Fetch Reviews Page
router.get("/fetch", function(req, res) {
  res.render("fetch");
});

// Email Templates Page
router.get("/templates", function(req, res) {
  res.render("templates");
});

// negative review Page
router.get("/nreview", function(req, res) {
  res.render("negative-review");
});

// positive review Page
router.get("/preview", function(req, res) {
  res.render("positive-review");
});

// Contact List Page
router.get("/contacts", function(req, res) {
  db.Contact.findAll()
    .then(function(dbContact) {
      res.render("contact-list", {contacts: dbContact});
    });
});

// Sends an email with options defined in the req.body
router.post("/api/send_email", function(req, res) {

  var data = req.body;

  console.log("API POST DATA: " + JSON.stringify(data));
  
  NewEmail(data.to, data.name, data.id)
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      console.log(err);
    })

  // The email to use in sending the email
  // (@ symbol changed to %40)
  // var sender = 'smtps://ReviewFetch%40gmail.com';
  // Password of the email to use
  // var password = 'ReviewFetch2018';
  // To send emails you need a transporter object
  // var transporter = nodeMailer.createTransport(sender + ':' + password + '@smtp.gmail.com');
  // We now send the message
  // transporter.sendMail(req.body, function(err, response) {
  //   if(err) {
  //     console.log(err);
  //   }
  //   res.json(response);
  // })
});

/************** user routes ******************/
// Returns all users
router.get("/api/fetch_users", function(req, res) {
	db.Users.findAll({
      include: [db.Company]
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
});

// Fetch one user by id
router.get("/api/fetch_users/:id", function(req, res) {
	db.Users.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Company]
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
});

// Creates a new user
router.post("/api/fetch_users/new", function(req, res) {
  db.Users.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
});

/************** template routes ******************/
// Creates a new template
router.post("/api/fetch_templates/new", function(req, res) {
  db.Template.create(req.body).then(function(dbTemplates) {
      res.json(dbTemplates);
    });
});

// Returns all data for all contacts
// TODO: Should probably filter by company
router.get("/api/fetch_templates", function(req, res) {
  db.Template.findAll()
    .then(function(dbTemplates) {
      res.json(dbTemplates);
    });
});

// Fetch one template by id
router.get("/api/fetch_templates/:id", function(req, res) {
  db.Template.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Company]
    }).then(function(dbTemplates) {
      res.json(dbTemplates);
    });
});

/************** contact routes ******************/

// Returns all data for all contacts
router.get("/api/fetch_contact_data", function(req, res) {
	db.Contact.findAll()
	  .then(function(dbContact) {
      res.json(dbContact);
    });
});

// Returns all data for contacts by company id
router.get("/api/fetch_contact_data/company/:id", function(req, res) {
  db.Contact.findAll({
    where: {
      CompanyId: req.params.id
    },
      include: [db.Company]
    }).then(function(dbContact) {
      res.json(dbContact);
    });
});

// Returns all data for contacts where active = 0 or 1
router.get("/api/fetch_contact_data/active/:active", function(req, res) {
  console.log(req.params);
  db.Contact.findAll({
    where: {
      active: req.params.active
    },
    include: [db.Company]
    }).then(function(dbContact) {
      res.json(dbContact);
    });
});

// Returns all data for contacts with status = 0: "not sent", or 1: "sent", or 2: "replied" and active = "true"
router.get("/api/fetch_contact_data/status_and_active/:status", function(req, res) {
  console.log(req.params);
  db.Contact.findAll({
    where: {
      status: req.params.status,
      active: 1
    },
    include: [db.Company]
    }).then(function(dbContact) {
      res.json(dbContact);
    });
});

// Returns all data for contacts with status = 0: "not sent", or 1: "sent", or 2: "replied" and active = "false"
router.get("/api/fetch_contact_data/status_and_not_active/:status", function(req, res) {
  console.log(req.params);
  db.Contact.findAll({
    where: {
      status: req.params.status,
      active: 0
    },
    include: [db.Company]
    }).then(function(dbContact) {
      res.json(dbContact);
    });
});

// Fetch one contact by id
router.get("/api/fetch_contact_data/:id", function(req, res) {
	db.Contact.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Company]
    }).then(function(dbContact) {
      res.json(dbContact);
    });
});

// Fetch one contact by name
router.get("/api/fetch_contact_data/name/:name", function(req, res) {
  db.Contact.findOne({
      where: {
        name: req.params.name
      },
      include: [db.Company]
    }).then(function(dbContact) {
      res.json(dbContact);
    });
});

// Creates a new contact
router.post("/api/fetch_contact_data/new", function(req, res) {
  console.log(req.body);
  db.Contact.create(req.body).then(function(dbContact) {
      res.json(dbContact);
    });
});

//Update contact
router.post("/api/fetch_contact_data/update", function(req, res) {
  db.Contact.update({
    name: req.body.name,
    gender: req.body.gender,
    email: req.body.email,
    phone: req.body.phone,
    status: req.body.status,
    active: req.body.active
  }, {
    where: {
      id: req.body.id
    }
  }).then(function(dbContact) {
      res.json(dbContact);
    });
});

/************** company routes ******************/
// Returns all company data
router.get("/api/fetch_company", function(req, res) {
	db.Company.findAll({
      include: [db.Contact]
    }).then(function(dbCompany) {
      res.json(dbCompany);
    });
});

// Fetch one company by id
router.get("/api/fetch_company/:id", function(req, res) {
	db.Company.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Contact]
    }).then(function(dbCompany) {
      res.json(dbCompany);
    });
});

// Creates a new company
router.post("/api/fetch_company/new", function(req, res) {
  db.Company.create(req.body).then(function(dbCompany) {
      res.json(dbCompany);
    });
});

// Export routes for server.js to use.
module.exports = router;