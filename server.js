// requirements
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var routes = require("./controllers/app_controllers.js");
// server PORT
var PORT = process.env.PORT || 3000;
// start express
var app = express();
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
// start server (listening)
app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
