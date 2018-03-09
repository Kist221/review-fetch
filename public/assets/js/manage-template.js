$(document).ready(function(){
	type = ['','info','success','warning','danger'];

	templateFunctions = {
	    showNotification: function(from, align){
	    var color = 2;

	    	$.notify({
	        	icon: "ti-check",
	        	message: "<b>Template successfully saved!</b>"

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

	// Store a reference of the input for template name in Manage Templates page
	var templateName = $("#template-name");
	// Store a reference of the input for template subject in Manage Templates page
	var templateSubject = $("#template-subject");
	// Store a reference to the text area in Manage Templates page
	var templateTextArea = $("#template-textarea");

	// Attach the event listener on form submit
	$("#template-form").on("submit", handleFormSubmit);

	// This handles the submission of the fetch review form
	function handleFormSubmit(event) {
		event.preventDefault();
		// Get the contents of the template name input
		var nameOfNewTemplate = templateName.val().trim();
		// Get the contents of the template subject input
		var subjectOfNewTemplate = templateSubject.val().trim();
		// Get the contents of the text area
		var contentOfNewTemplate = templateTextArea.val().trim();

		// Sanitize the subject
		subjectOfNewTemplate = encodeURI(subjectOfNewTemplate);
		// Sanitize the contents
		contentOfNewTemplate = encodeURI(contentOfNewTemplate);

		var newTemplate = {
			name: nameOfNewTemplate,
			subject: subjectOfNewTemplate,
			message: contentOfNewTemplate,
		};

		// POST request to save the content, which is
		// the template that the user created, to the 
		// `template` table in our DB
		$.post("/api/fetch_templates/new", newTemplate, function() {
			console.log("Saving template...");
		}).done(function() {
			templateFunctions.showNotification('top','center');
		});
	}

});