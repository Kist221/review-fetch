$(document).ready(function() {
type = ['','info','success','warning','danger'];

clientFunctions = {
    showNotification: function(from, align){
    var color = 2;

    	$.notify({
        	icon: "ti-check",
        	message: "<b>Client successfully added!</b>"

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

var company = $("#new-client-company");
var contactlist = $("#new-client-contactlist");
var email = $("#new-client-email");
var firstname = $("#new-client-firstname");
var lastname = $("#new-client-lastname");
var gender = $("#new-client-gender");
var phone = $("#new-client-phone");

$("#new-client-addbtn").on("click", handleFormSubmit);

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

    // Constructing a newClient object to hand to the database
    var newClient = {
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

    submitPost(newClient);
  }

  // Submits a new client and shows a notification upon completion
  function submitPost(client) {
    console.log("Posting");
    $.post("/api/fetch_client_data/new", client, function() {
        clientFunctions.showNotification('top','center');
        setTimeout(function(){ window.location.href='/clients'; }, 5000);
    });
  }
  });
