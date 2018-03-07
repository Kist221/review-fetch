$(document).ready(function() {
type = ['','info','success','warning','danger'];

contactFunctions = {
    showNotification: function(from, align, msg){
    var color = 2;

    	$.notify({
        	icon: "ti-check",
        	message: "<b>" + msg + "</b>"

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

$(".edit-contact").on("click", editContact)
$("#new-contact-addbtn").on("click", handleFormSubmit);
$("#edit-contact-btn").on("click", updateContact);

// A function for handling what happens when the form to create a new contact is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("Submit!");

    var email = $("#new-contact-email");
    var firstname = $("#new-contact-firstname");
    var lastname = $("#new-contact-lastname");
    var gender = $("#new-contact-gender");
    var phone = $("#new-contact-phone");

    var newContact = constructContactObject(firstname, lastname, gender, email, phone);

    submitPost(newContact);
  }

  // This populates the edit modal with the selected contact's details
  function editContact(event) {
    var id = (event.target.id).replace('editContact', '');
    $.get("/api/fetch_contact_data/" + id, function() {
        console.log("Getting contact with id: " + id);
    }).done(function(obj) {
        var name = obj.name.split(' ');
        $("#edit-contact-email").val(obj.email);
        $("#edit-contact-firstname").val(name[0]);
        $("#edit-contact-lastname").val(name[1]);
        $("#edit-contact-phone").val(obj.phone);

        if(obj.gender == 1) {
            $("#edit-contact-gender select").val("male");
        } else {
            $("#edit-contact-gender select").val("female");
        }

        if(obj.active == true) {
            $("#activeCheckbox").checkbox("check");
        } else {
            $("#activeCheckbox").checkbox("uncheck");
        }

        if(obj.status == 0) {
            $('#edit-contact-status option[value=0]').prop('selected',true);
        } else if(obj.status == 1) {
             $('#edit-contact-status option[value=1]').prop('selected',true);
        } else {
            $('#edit-contact-status option[value=2]').prop('selected',true);
        }

        // Give the edit modal the id of the contact through data-id
        $("#editContactModal").attr("data-id", id);
    });
  }

  // A function for handling what happens when the form to save changes on a contact is submitted
  function updateContact(event) {
    var editEmail = $("#edit-contact-email");
    var editFirstname = $("#edit-contact-firstname");
    var editLastname = $("#edit-contact-lastname");
    var editGender = $("#edit-contact-gender");
    var editPhone = $("#edit-contact-phone");

    var contact = constructContactObject(editFirstname, editLastname, editGender, editEmail, editPhone);

    var activeCheckbox = $("#activeCheckbox").prop("checked");
    contact.active = activeCheckbox;
    contact.status = $("#edit-contact-status").val();
    contact.id = $("#editContactModal").attr("data-id");

    $.post("/api/fetch_contact_data/update" + contact.id, contact, function() {
        var editSuccessMsg = "Changes to Contact Saved!";
        contactFunctions.showNotification('top','center', editSuccessMsg);
        setTimeout(function(){ window.location.href='/contacts'; }, 2000);
    });
  }

  /* This will make an object from the arguments passed in
   * @return {
   *             name: firstname + ' ' + lastname,
   *             gender: gender,
   *             email: email,
   *             phone: phone,
   *             companyId: 1
   *         } 
  */
  function constructContactObject(firstname, lastname, gender, email, phone) {
    // Combine the firstname and lastname
    var fullName = firstname.val().trim() + " " + lastname.val().trim();
    // Assigns 1 for male and 0 for female (stored as boolean)
    if(gender.val() === "male") {
        gender = 1;
    } else if(gender.val() === "female") {
        gender = 0;
    } else {
        gender = 1;
    }

    // Make the object
    var contact = {
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

    // Return the object
    return contact;
  }

  // Submits a new contact and shows a notification upon completion
  function submitPost(contact) {
    console.log("Posting");
    $.post("/api/fetch_contact_data/new", contact, function() {
        var successAddMsg = "Contact Added Successfully!";
        contactFunctions.showNotification('top','center', successAddMsg);
        setTimeout(function(){ window.location.href='/contacts'; }, 2000);
    });
  }
  });
