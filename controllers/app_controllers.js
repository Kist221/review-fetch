// requirement
var express = require("express");

var router = express.Router();

// Create all our routes and set up logic within those routes where required.

/* Home Page - Landing Page*/
// returns all users
router.get("/api/fetch_users", function(req, res) {
	// model.fetchUser.selectAll(function(data) {
	// 	var makeObject = {
	// 		data: data
	// 	};
	// 	console.log(data);
	// 	res.json(makeObject);
	// });
});

// fetch one user by id
router.get("/api/fetch_users/:id", function(req, res) {
	// console.log(req.params.id);

	// model.fetchUser.selectOne("user_id", req.params.id, function(data) {
	// 	console.log(data);
	// 	res.json(data);
	// });
});

router.post("/api/fetch_users/new", function(req, res) {
  // console.log(req.body.username, req.body.password, req.body.bool);
  // model.fetchUser.insertOne(["username", "password", "bool"], [req.body.username, req.body.password, req.body.bool], function(result) {
  //   // Send back the ID of the new burger
  //   res.json({ id: result.insertId });
  // });
});

// returns all data for all clients
router.get("/api/fetch_client_data", function(req, res) {
	// model.fetchClientData.selectAll(function(data) {
	// 	var makeObject = {
	// 		data: data
	// 	};
	// 	console.log(data);
	// 	res.json(makeObject);
	// });
});

// fetch one client by id
router.get("/api/fetch_client_data/:id", function(req, res) {
	// console.log(req.params.id);

	// model.fetchClientData.selectOne("client_id", req.params.id, function(data) {
	// 	console.log(data);
	// 	res.json(data);
	// });
});

// returns all company data
router.get("/api/fetch_company", function(req, res) {
	// model.fetchCompany.selectAll(function(data) {
	// 	var makeObject = {
	// 		data: data
	// 	};
	// 	console.log(data);
	// 	res.json(makeObject);
	// });
});

// fetch one company by id
router.get("/api/fetch_company/:id", function(req, res) {
	// console.log(req.params.id);

	// model.fetchCompany.selectOne("id", req.params.id, function(data) {
	// 	console.log(data);
	// 	res.json(data);
	// });
});

// Export routes for server.js to use.
module.exports = router;