// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var fetchUser = {
  selectAll: function(cb) {
    orm.selectAll("fetch_users", function(res) {
      cb(res);
    });
  },
  selectOne: function(col, value, cb) {
    console.log(col, value);
    orm.selectOne("fetch_users", col, value, function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: function(cols, vals, cb) {
    orm.insertOne("fetch_users", cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("fetch_users", objColVals, condition, function(res) {
      cb(res);
    });
  }
};

var fetchClientData = {
  selectAll: function(cb) {
    orm.selectAll("fetch_client_data", function(res) {
      cb(res);
    });
  },
  selectOne: function(col, value, cb) {
    console.log(col, value);
    orm.selectOne("fetch_client_data", col, value, function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: function(cols, vals, cb) {
    orm.insertOne("fetch_client_data", cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("fetch_client_data", objColVals, condition, function(res) {
      cb(res);
    });
  }
};

var fetchCompany = {
  selectAll: function(cb) {
    orm.selectAll("fetch_company", function(res) {
      cb(res);
    });
  },
   selectOne: function(col, value, cb) {
    console.log(col, value);
    orm.selectOne("fetch_company", col, value, function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: function(cols, vals, cb) {
    orm.insertOne("fetch_company", cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("fetch_company", objColVals, condition, function(res) {
      cb(res);
    });
  }
};


// Export the database functions for the controller (burgersController.js).
module.exports = {
  fetchUser: fetchUser,
  fetchClientData: fetchClientData, 
  fetchCompany: fetchCompany} ;