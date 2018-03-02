$(document).ready(function() {
type = ['','info','success','warning','danger'];

contactFunctions = {
    showNotification: function(from, align){
    var color = 2;

    	$.notify({
        	icon: "ti-check",
        	message: "<b>Contact successfully added!</b>"

        },{
            type: type[color],
            timer: 1000,
            placement: {
                from: from,
                align: align
            }
        });
	}
}

var company = $("#new-contact-company");
var contactlist = $("#new-contact-contactlist");
var email = $("#new-contact-email");
var firstname = $("#new-contact-firstname");
var lastname = $("#new-contact-lastname");
var gender = $("#new-contact-gender");
var phone = $("#new-contact-phone");

$("#new-contact-addbtn").on("click", handleFormSubmit);

// A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("Submit!");
    var fullName = firstname.val().trim() + " " + lastname.val().trim();
    if(gender.val() === "male") {
        gender = 1;
    } else if(gender.val() === "female") {
        gender = 0;
    } else {
        gender = 1;
    }

    // Constructing a newContact object to hand to the database
    var newContact = {
        name: fullName
            .trim(),
        gender: gender,
        email: email
            .val()
            .trim(),
        phone: phone
            .val()
            .trim(),
        CompanyId: 1
    };

    submitPost(newContact);
  }

  // Submits a new contact and shows a notification upon completion
  function submitPost(contact) {
    console.log("Posting");
    $.post("/api/fetch_contact_data/new", contact, function() {
        contactFunctions.showNotification('top','center');
        setTimeout(function(){ window.location.href='/contacts'; }, 5000);
    });
  }
  });
