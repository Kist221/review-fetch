$(document).ready(function(){
	type = ['','info','success','warning','danger'];
	
	settingsFunctions = {
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

	// GET the User's data
	// (Currently hard-coded the id to 1 which is the only User in the DB)
	// This will put the currents User's info onto the following html elements:
	// userUsername
	// userPassword
	// userFullName
	// userEmail
	$.get("/api/fetch_users/1", function() {
		console.log("getting User...");
	}).done(function(res){
		userUsername.val(res.username);
		userPassword.val(res.password);
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
	$.get("/api/fetch_company/1", function() {
		console.log("getting Company...");
	}).done(function(res){
		companyName.html(res.name);
		companyName.val(res.name);
		companyTwitter.val(res.twitter);
		companyInstagram.val(res.instagram);
		companyFacebook.val(res.facebook);
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
	$.get("/api/fetch_templates", function() {
		console.log("getting Templates...");
	}).done(function(res){
		console.log(res.length);
		numOfTemplates.text(res.length + "");
	});

});