// Require:
var postmark = require("postmark");

// Send an email:
var client = new postmark.Client("181960af-55c6-4c84-857d-79d0dc3c20a1");

client.sendEmail({
  "From": "Dillon@csdesignstudios.com",
  "To": "dillon@csdesignstudios.com",
  "Subject": "Test",
  "TextBody": "Hello from Postmark!"
});