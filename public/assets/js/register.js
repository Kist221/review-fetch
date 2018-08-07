$(document).ready(() => {
  type = ['', 'info', 'success', 'warning', 'danger']

  registerFunctions = {
    showNotification: function(from, align) {
      let color = 4

        $.notify({
        {
          icon: 'ti-close',
          message: '<b>Email is already registered.</b>',
        },
        {
          type: type[color],
          timer: 1000,
          placement: {
            from,
            align: align,
          },
        }
      )
    },
  }
  // Getting references to our form and input
  let signUpForm = $('form.register-form')
  var usernameInput = $('#username-input')
  var emailInput = $('#email-input')
  var passwordInput = $('#password-input')
  var companyInput = $('#company-input')

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on('submit', (event) => {
    event.preventDefault();
    var userData = {
    	username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      company: companyInput.val().trim()
    };

    if (!userData.username || !userData.email || !userData.password || !userData.company) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.username, userData.email, userData.password, userData.company);
    emailInput.val("");
    passwordInput.val("");
  })

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(username, email, password, company) {
    $.post('/api/signup', {
      username,
      email,
      password,
      company,
    })
      .then((data) => {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch((err) => {
    	registerFunctions.showNotification('top','center');
    })
  }
})
