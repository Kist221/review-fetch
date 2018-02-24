// requirement
var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var model = require("../models/model.js");

// returns a list of contacts
router.get("/api/contacts", function(req, res) {
	
});

// add new user
router.put("/api/new_contact", function(req, res) {
	
});

/*
router.get("/api/setup", function(req, res) {
	
});

router.get("/api/fetch", function(req, res) {
	
});

router.get("/api/analytics", function(req, res) {
	
});
*/

// Export routes for server.js to use.
module.exports = router;