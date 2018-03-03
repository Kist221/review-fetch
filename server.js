// requirements
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var routes = require("./controllers/app_controllers.js");
// server PORT
var PORT = process.env.PORT || 3000;
// start express
var app = express();
// Requiring our models for syncing
var db = require("./models");
// configure handlebars template
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// serve static content from the "public" directory
app.use(express.static("public"));
// URL parser
app.use(bodyParser.urlencoded({ extended: false }));
// json parser
app.use(bodyParser.json());
// Give the server access to routes
app.use(routes);

// Syncing our sequelize models and then starting our Express app
// =============================================================
// Add {force: true} inside of sync to resolve DB changes
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

module.exports = app;  // for testing
