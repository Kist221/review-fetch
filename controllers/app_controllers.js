// requirement
var express = require("express");

var router = express.Router();

// Requiring our models
var db = require("../models");

// Create all our routes and set up logic within those routes where required.

/* SEEDS for DB */
router.get("/seedUser", function(req, res) {
  // Create a User
 db.Users.create({
  username: "user",
  password: "pass",
 })
 .then(function(dbCompany) {
      res.json(dbCompany);
    });
});
router.get("/seedCompany", function(req, res) {
  // Create a company for the User
 db.Company.create({
  name: "My Company",
  UserId: 1
 })
 .then(function(dbCompany) {
      res.json(dbCompany);
    });
});

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

// Client List Page
router.get("/clients", function(req, res) {
  db.Client.findAll()
    .then(function(dbClient) {
      res.render("client-list", {clients: dbClient});
    });
});

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

// Returns all data for all clients
// TODO: Should probably filter by company
router.get("/api/fetch_client_data", function(req, res) {
	db.Client.findAll()
	  .then(function(dbClient) {
      res.json(dbClient);
    });
});

// Fetch one client by id
router.get("/api/fetch_client_data/:id", function(req, res) {
	db.Client.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Company]
    }).then(function(dbClient) {
      res.json(dbClient);
    });
});

// Creates a new client
router.post("/api/fetch_client_data/new", function(req, res) {
  console.log(req.body);
  db.Client.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
});

// Returns all company data
router.get("/api/fetch_company", function(req, res) {
	db.Company.findAll({
      include: [db.Client]
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
      include: [db.Client]
    }).then(function(dbCompany) {
      res.json(dbCompany);
    });
});

// Export routes for server.js to use.
module.exports = router;