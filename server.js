// requirements
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const passport = require('./config/passport');
const routes = require('./controllers/app_controllers.js');
// server PORT
const PORT = process.env.PORT || 3000;
// Requiring our models for syncing
const db = require('./models');
// start express
const app = express();

// configure handlebars template
app.engine(
  'handlebars',
  exphbs({
    helpers: require('./views/helpers/handlebars.js'),
    defaultLayout: 'main',
  })
);
app.set('view engine', 'handlebars');
// URL parser
app.use(bodyParser.urlencoded({ extended: false }));
// json parser
app.use(bodyParser.json());
// serve static content from the "public" directory
app.use(express.static('public'));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
// Give the server access to routes
app.use(routes);

// Syncing our sequelize models and then starting our Express app
// =============================================================
// Add {force: true} inside of sync to resolve DB/model changes
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});

module.exports = app; // for testing
