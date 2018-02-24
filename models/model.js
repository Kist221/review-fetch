// import ORM
var orm = require("../config/orm.js");

// CHANGE specifc ORM uses
var CHANGE = {
  // select * CHANGEs
  all: function(cb) {
    orm.selectAll("CHANGEs", function(res) {
      cb(res);
    });
  },
  // insert CHANGE
  insert: function(name, cb) {
    orm.insertOne("CHANGEs", "CHANGE_name", name, function(res) {
      cb(res);
    });
  },
  // set CHANGE change value
  update: function(id, cb) {
    orm.updateOne("CHANGEs", "change", true, "id", id, function(res) {
      cb(res);
    });
  }
};

// CHANGE.all( function(res) {
//   console.log(res);
// });

// Export the database functions for the controller
module.exports = CHANGE;