$(document).ready(function(){
	type = ['','info','success','warning','danger'];
	
	fetchFunctions = {
	    showNotification: function(from, align){
	    var color = 2;

	    	$.notify({
	        	icon: "ti-check",
	        	message: "<b>Emails successfully sent!</b>"
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

	// This is the object that will be sent to the server through POST request
	var data = {
	    from: 'ReviewFetch@gmail.com'
	};

	// Variable to hold the <select> for the list of templates
	var templateListSelect = $("#select-template");
	// Variable to hold the <select> for the list of contacts
	var contactListSelect = $("#select-contact-list");

	// Populate the Contact List dropdown
	// GET the contacts (contacts for now)
	$.get("/api/fetch_contact_data", function() {
		console.log("getting contacts...");
	}).done(function(res){
		var selectOptions = "";
		// Dynamically add each options for the Contact List dropdown
		for(var i = 0; i < res.length; i++) {
			selectOptions += "<option value='" + JSON.stringify(res[i]) + "'>" + res[i].name + "</option>";
		}
		// Append the options to the contact list
		contactListSelect.html(selectOptions);
	});

	// Populate the Template List dropdown
	// GET the templates from the database
	$.get("/api/fetch_company_templates", function() {
		console.log("getting templates...");
	}).done(function(res){
		var selectOptions = "";
		// Dynamically add each options for the templates list dropdown
		for(var i = 0; i < res.length; i++) {
			selectOptions += "<option value='" + res[i].id + "'>" + res[i].name + "</option>";
		}
		// Append the options to the templates list
		templateListSelect.html(selectOptions);
	});

	// Attach the event listener on form submit
	$("#email-send").on("submit", handleFormSubmit);

	// This handles the submission of the fetch review form
	function handleFormSubmit(event) {
		event.preventDefault();
		// Get the selected contact
		var to = JSON.parse(contactListSelect.val());
		data.to = to.email;
		data.name = to.name;
		data.id = to.id;

		// Get the selected template and decode the URI
		$.get("/api/fetch_templates/" + templateListSelect.val(), function() {
			console.log("Getting template id#" + templateListSelect.val());
		}).done(function(res) {
			data.subject = decodeURI(res.subject);
			data.message = decodeURI(res.message);

			//POST request sending the data which defines the mail content
			$.post("/api/send_email", data, function() {
        		fetchFunctions.showNotification('top','center');
				console.log("Sending email...");
			});
		});
	}

	// Store the preview button in a variable
	var previewBtn = $("#fetch-preview");
	// Attach the on click  listener for previewBtn
	$(previewBtn).on("click", showPreview);

	// This displays the preview of the email template with
	// name and message dynamically applied
	function showPreview(event) {
		console.log("Showing preview...");
		event.preventDefault();
		// Show the preview row by setting its display to block
		$("#preview-row").attr("style", "display: block;");
		// Get the selected contact
		var to = JSON.parse(contactListSelect.val());
		var contactName = to.name;

		// Get the selected template and decode the URI
		$.get("/api/fetch_templates/" + templateListSelect.val(), function() {
			console.log("Getting template id#" + templateListSelect.val());
		}).done(function(res) {
			var templateMessage = decodeURI(res.message);

			// Get a reference to the iframe
			var iframe = document.getElementById("preview-iframe");
			var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

			// Dynamically change the contents of the holders with the appropriate
			// contact name and template message
			innerDoc.getElementById("name-holder").innerHTML = contactName;
			innerDoc.getElementById("message-holder").innerHTML = templateMessage;
		});
	}	

});