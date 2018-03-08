// Require dependencies
var express = require("express");
var passport = require("../config/passport");
var router = express.Router();
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
// Requiring our models
var db = require("../models");
// Require our emailer function
const NewEmail = require("../email");

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
  email: "reviewfetch@gmail.com",
  fullname: "John Doe"
 })
 .then(function(dbUsers) {
      res.json(dbUsers);
    });
});
router.get("/seedCompany", function(req, res) {
  // Create a company for the User
 db.Company.create({
  name: "My Company",
  about: "Customizable app for improving companies reputations.",
  twitter: "reviewfetch2018",
  instagram: "reviewfetch2018",
  facebook: "reviewfetch2018",
  yelp: "https://www.yelp.com",
  google: "https://www.google.com",
  bbb: "https://www.bbb.org",
  UserId: 1
 })
 .then(function(dbCompany) {
      res.json(dbCompany);
    });
});
/*************************
 *                       *
 *   END SEEDS for DB    *
 *                       *
 *************************/

 // Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), function(req, res) {
  // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
  // So we're sending the user back the route to the members page because the redirect will happen on the front end
  // They won't get this or even be able to access this page if they aren't authed
  res.json("/dashboard");
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/signup", function(req, res) {
  console.log(req.body);
  db.Users.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }).then(function(dbUsers) {
    console.log("Registered new user...");
    db.Company.create({
      UserId: dbUsers.dataValues.id,
      name: req.body.company
    }).then(function() {
      console.log("Registered new company...");
      res.redirect(307, "/api/login");
    });
  }).catch(function(err) {
    console.log("ERROR!");
    //res.json(err);
    res.status(422).json(err.errors[0].message);
  });
});

router.get("/login", function(req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/dashboard");
  }
  res.render("login");
});

// Route for logging user out
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

// Home page / Landing Page
router.get("/", function(req, res) {
  // If the user already has an account send them to the dashboard page
  if (req.user) {
    res.redirect("/dashboard");
  }
  res.render("register");
});

// Dashboard Page
router.get("/dashboard", isAuthenticated, function(req, res) {
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

// Negative review Page
router.get("/nreview:id", function(req, res) {
    db.Contact.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Company]
    }).then(function(dbContact) {
      var negative = {
        review_type: "negative",
        contact_name: dbContact.name,
        contact_email: dbContact.email,
        contact_phone: dbContact.phone
      };
      res.render("negative", negative);
    });
});

// Positive review Page
router.get("/preview:id", function(req, res) {
    db.Contact.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Company]
    }).then(function(dbContact) {
      var positive = {
        review_type: "positive",
        contact_name: dbContact.name,
        contact_email: dbContact.email,
        contact_phone: dbContact.phone
      };
      res.render("positive", positive);
    });
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
  NewEmail.sendEmail(data.subject, data.to ,data.name, data.id, data.message);
  res.json(data);
});

/************** User routes ******************/
// Returns all Users
router.get("/api/fetch_users", function(req, res) {
	db.Users.findAll({
      include: [db.Company]
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
});

// Fetch one User by id
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

// Creates a new User
router.post("/api/fetch_users/new", function(req, res) {
  db.Users.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
});

// Update User
router.post("/api/fetch_users/update", function(req, res) {
  db.Users.update(req.body, {
    where: {
      id: req.body.id
    }
  }).then(function(dbUsers) {
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

// Fetch contacts with negative reviews that replied (i.e., status = 2)
router.get("/api/fetch_contact_data/reviews/nreviews", function(req, res) {
  db.Contact.findAll({
      where: {
        reviewType: false,
        status: 2 // replied
      },
      include: [db.Company]
    }).then(function(dbContact) {
      res.json(dbContact);
    });
});

// Fetch contacts with positive reviews that replied (i.e., status = 2)
router.get("/api/fetch_contact_data/reviews/previews", function(req, res) {
  db.Contact.findAll({
      where: {
        reviewType: true,
        status: 2 // replied
      },
      include: [db.Company]
    }).then(function(dbContact) {
      res.json(dbContact);
    });
});

//Update contact
router.post("/api/fetch_contact_data/update", function(req, res) {
  db.Contact.update(req.body, {
    where: {
      id: req.body.id
    }
  }).then(function(dbContact) {
      res.json(dbContact);
    });
});

//Update contact
router.post("/api/fetch_contact_data/update", function(req, res) {
  db.Contact.update(req.body, {
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

//Update contact
router.post("/api/fetch_company/update", function(req, res) {
  db.Company.update(req.body, {
    where: {
      id: req.body.id
    }
  }).then(function(dbCompany) {
      res.json(dbCompany);
    });
});

// Export routes for server.js to use.
module.exports = router;