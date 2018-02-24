// requirement
var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var model = require("../models/model.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
	model.all(function(data) {
		var allmodels = {
			models: data
		};
		console.log(allmodels);
		res.render("index", allmodels);
	});
});

router.post("/add", function(req, res) {
	var name = req.body.name.toString();
	console.log("POST BODY: " + name);
	model.insert(name, function(data) {
		res.json(data);
	});
});

router.put("/change", function(req, res) {
	var id = req.body.id.toString();
	console.log("PUT BODY: " + id);
	model.update(id, function(data) {
		res.json(data);
	});
});

// Export routes for server.js to use.
module.exports = router;