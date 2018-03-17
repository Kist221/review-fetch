$(document).ready(function(){
	type = ['','info','success','warning','danger'];
	
	settingsFunctions = {
	    showNotification: function(from, align){
	    var color = 2;

	    	$.notify({
	        	icon: "ti-check",
	        	message: "<b>Changes saved!</b>"

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

	// Variables to hold the html elements
	// For Company:
	var companyName = $(".company-name");
	var companyTwitter = $("#company-twitter");
	var companyInstagram = $("#company-instagram");
	var companyFacebook = $("#company-facebook");
	var companyAbout = $(".company-about")
	var companyYelpLink = $("#company-yelp-link");
	var companyGoogleLink = $("#company-google-link");
	var companyBBBLink = $("#company-bbb-link");
	// For User:
	var userUsername = $("#user-username");
	var userPassword = $("#user-password");
	var userFullName = $("#user-fullname");
	var userEmail = $("#user-email");
	// Misc.:
	var numOfTemplates = $("#numOf-templates");
	var numOfContacts = $("#numOf-contacts");

	$.post("/api/currentUser", function(res){
	}).then(function(res) {
	

	// GET the User's data
	// (Currently hard-coded the id to 1 which is the only User in the DB)
	// This will put the currents User's info onto the following html elements:
	// userUsername
	// userPassword
	// userFullName
	// userEmail
	$.get("/api/fetch_users/" + res.id, function() {
		console.log("getting User...");
	}).done(function(res){
		userUsername.val(res.username);
		userEmail.val(res.email);
		userFullName.val(res.fullname);
	});

	// GET the Company's data
	// (Currently hard-coded the id to 1 which is the only Company in the DB)
	// This will put the currents Company's info onto the following html elements:
	// companyName
	// companyTwitter
	// companyInstagram
	// companyFacebook
	// companyAbout
	// companyYelpLink
	// companyGoogleLink
	// companyBBBLink
	$.get("/api/fetch_company/" + res.id, function() {
		console.log("getting Company...");
	}).done(function(res){
		companyName.html(res.name);
		companyName.val(res.name);
		companyTwitter.val(res.twitter);
		companyInstagram.val(res.instagram);
		companyFacebook.val(res.facebook);
		companyAbout.val(res.about);
		companyAbout.html(res.about);
		companyYelpLink.val(res.yelp);
		companyGoogleLink.val(res.google);
		companyBBBLink.val(res.bbb);
	});

	// Display the amount of contacts this company has
	$.get("/api/fetch_contact_data", function() {
		console.log("getting Contacts...");
	}).done(function(res){
		console.log(res.length);
		numOfContacts.text(res.length);
	});

	// Display the amount of templates this company has
	$.get("/api/fetch_company_templates", function() {
		console.log("getting Templates...");
	}).done(function(res){
		console.log(res.length);
		numOfTemplates.text(res.length + "");
	});

	// Attach event listener to password reveal button
	// On mouse down handler - reveal password
	$("#password-reveal-btn").on("mousedown", function(event) {
		userPassword.attr("type", "text");
	});
	// On mouse up handler - hide password
	$("#password-reveal-btn").on("mouseup", function(event) {
		userPassword.attr("type", "password");
	});

	// Attach event listener to each edit button
	var yelpEditBtn = $("#yelp-edit-btn");
	var googleEditBtn = $("#google-edit-btn");
	var bbbEditBtn = $("#bbb-edit-btn");

	// Yelp link edit button
	$(yelpEditBtn).on("click", function(event) {
		// If the input field for the yelp link is currently being edited
		if(yelpEditBtn.text().toLowerCase() === "save") {
			// Pass the id of the company
			// and the new value for the link
			data = {
				id: res.id,
				yelp: companyYelpLink.val()
			}
			// POST request to process and save the new value
			$.post("/api/fetch_company/update", data, function() {
				console.log("Updating yelp link...");
			}).done(function() {
				// Once done saving the new value,
				// disable to input field and change button text to 'Edit'
				companyYelpLink.attr("disabled", true);
				yelpEditBtn.text("Edit");
				// Display the notification
				settingsFunctions.showNotification('top','center');
			});
		}
		// Else if it is not being edited, enable the input field for editing
		// and change button text to 'Save'
		else {
			companyYelpLink.attr("disabled", false);
			yelpEditBtn.text("Save")
		}
	});
	// Google link edit button
	$(googleEditBtn).on("click", function(event) {
		// If the input field for the google link is currently being edited
		if(googleEditBtn.text().toLowerCase() === "save") {
			// Pass the id of the company
			// and the new value for the link
			data = {
				id: res.id,
				google: companyGoogleLink.val()
			}
			// POST request to process and save the new value
			$.post("/api/fetch_company/update", data, function() {
				console.log("Updating google link...");
			}).done(function() {
				// Once done saving the new value,
				// disable to input field and change button text to 'Edit'
				companyGoogleLink.attr("disabled", true);
				googleEditBtn.text("Edit");
				// Display the notification
				settingsFunctions.showNotification('top','center');
			});
		}
		// Else if it is not being edited, enable the input field for editing
		// and change button text to 'Save'
		else {
			companyGoogleLink.attr("disabled", false);
			googleEditBtn.text("Save")
		}
	});
	// BBB link edit button
	$(bbbEditBtn).on("click", function(event) {
		// If the input field for the bbb link is currently being edited
		if(bbbEditBtn.text().toLowerCase() === "save") {
			// Pass the id of the company
			// and the new value for the link
			data = {
				id: res.id,
				bbb: companyBBBLink.val()
			}
			// POST request to process and save the new value
			$.post("/api/fetch_company/update", data, function() {
				console.log("Updating bbb link...");
			}).done(function() {
				// Once done saving the new value,
				// disable to input field and change button text to 'Edit'
				companyBBBLink.attr("disabled", true);
				bbbEditBtn.text("Edit");
				// Display the notification
				settingsFunctions.showNotification('top','center');
			});
		}
		// Else if it is not being edited, enable the input field for editing
		// and change button text to 'Save'
		else {
			companyBBBLink.attr("disabled", false);
			bbbEditBtn.text("Save")
		}
	});

	// Updating the profile
	$("#profile-form").on("submit", handleFormSubmit);
	// This will handle the form submission which will save the input fields onto the DB
	function handleFormSubmit(event) {
		event.preventDefault();
		// Build the data for Company
		var companyData = {
			id: res.id,
			name: $(companyName[1]).val(),
			twitter: companyTwitter.val(),
			instagram: companyInstagram.val(),
			facebook: companyFacebook.val(),
			about: $(companyAbout[1]).val()
		};
		// Build the data for User
		var userData = {
			id: res.id,
			username: userUsername.val().trim(),
			email: userEmail.val().trim()
		};

		// If password was changed, update the DB table
		if(userPassword.val().trim()) {
			userData.password = userPassword.val().trim();
		}
		// If fullname was changed, update the DB table
		if(userFullName.val().trim()) {
			userData.fullname = userFullName.val().trim();
		} 

		// POST request to update the Company data
		$.post("/api/fetch_company/update", companyData, function() {
			console.log("Updating Company");
		});
		// POST request to update the User data
		$.post("/api/fetch_users/update", userData, function() {
			console.log("Updating User");
		}).done(function() {
			// Display the notification
			settingsFunctions.showNotification('top','center');
			setTimeout(function(){ window.location.href='/settings'; }, 2000);
		});
	}

	});
});