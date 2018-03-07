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
	var companyName = $(".company-name");
	var userUsername = $("#user-username");
	var userPassword = $("#user-password");
	var numOfTemplates = $("#numOfTemplates");
	var numOfContacts = $("#numOfContacts");
	// These are not stored in the DB but should be so we have to remodel our tables
	var userFullName = $("#user-fullname");
	var userEmail = $("#user-email");
	var companyTwitter = $("#company-twitter");
	var companyInstagram = $("#company-instagram");
	var companyFacebook = $("#company-facebook");
	var companyAbout = $(".company-about")
	var companyYelpLink = $("#company-yelp-link");
	var companyGoogleLink = $("#company-google-link");
	var companyBBBLink = $("#company-bbb-link");


	// GET the User's data
	// (Currently hard-coded the id to 1 which is the only User in the DB)
	// This will put the currents User's info onto the following html elements:
	// userUsername
	// userPassword
	$.get("/api/fetch_users/1", function() {
		console.log("getting User...");
	}).done(function(res){
		userUsername.html(res.username);
		userPassword.html(res.password);
	});

	// GET the Company's data
	// (Currently hard-coded the id to 1 which is the only Company in the DB)
	// This will put the currents Company's info onto the following html elements:
	// companyName
	$.get("/api/fetch_company/1", function() {
		console.log("getting Company...");
	}).done(function(res){
		companyName.html(res.name);
	});

});