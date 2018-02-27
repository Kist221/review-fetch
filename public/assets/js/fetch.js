$(document).ready(function(){
	// Populate the Contact List dropdown
	var contactListSelect = $("#select-contact-list");
	// GET the contacts (clients for now)
	$.get("/api/fetch_client_data", function() {
		console.log("getting clients...");
	}).done(function(res){
		var selectOptions = "";
		// Dynamically add each options for the Contact List dropdown
		for(var i = 0; i < res.length; i++) {
			selectOptions += "<option value='" + res[i].name + "'>" + res[i].name + "</option>";
		}
		// Append the options to the contact list
		contactListSelect.html(selectOptions);
	});
});