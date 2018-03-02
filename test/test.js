var Nightmare = require("nightmare");
var chai = require("chai");
var expect = chai.expect;
var should = chai.should();


describe("review-fetch", function() {
  // The default tests in mocha is 2 seconds.
  // Extending it to 30 seconds to have time to load the pages

  this.timeout(30000);
  it("should send user to the dashboard page", function(done) {
    // ID for the login button.
    Nightmare({ show: true })
      .goto("https://damp-fjord-98999.herokuapp.com/")
      // Evaluate the navbar-brand name
      .evaluate(function() {
        var name = document.getElementsByClassName("navbar-brand")[0].innerText;
        return name;
      })
      // compare the name returned to the expected
      .then(function(name) {
        expect(name).to.equal("Dashboard");
        done();
      });
  });

  it("should send user to the fetch review page", function(done) {
    // ID for the login button.
    Nightmare({ show: true })
      .goto("https://damp-fjord-98999.herokuapp.com/")
      // Click the fetch reviews link
      .click("a[href='/fetch']")
      // Evaluate the navbar-brand name
      .evaluate(function() {
        var name = document.getElementsByClassName("navbar-brand")[0].innerText;
        return name;
      })
      // compare the name returned to the expected
      .then(function(name) {
        expect(name).to.equal("Fetch Reviews");
        done();
      });
    });

  it("should send user to the templates page", function(done) {
    // ID for the login button.
    Nightmare({ show: true })
      .goto("https://damp-fjord-98999.herokuapp.com/")
      // Click the fetch reviews link
      .click("a[href='/templates']")
      // Evaluate the navbar-brand name
      .evaluate(function() {
        var name = document.getElementsByClassName("navbar-brand")[0].innerText;
        return name;
      })
      // compare the name returned to the expected
      .then(function(name) {
        expect(name).to.equal("Manage Templates");
        done();
      });
  });

  it("should send user to the contacts page", function(done) {
    // ID for the login button.
    Nightmare({ show: true })
      .goto("https://damp-fjord-98999.herokuapp.com/")
      // Click the fetch reviews link
      .click("a[href='/contacts']")
      // Evaluate the navbar-brand name
      .evaluate(function() {
        var name = document.getElementsByClassName("navbar-brand")[0].innerText;
        return name;
      })
      // compare the name returned to the expected
      .then(function(name) {
        expect(name).to.equal("Contact List");
        done();
      });
  });
});
