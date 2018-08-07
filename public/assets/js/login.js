$(document).ready(() => {
  type = ['', 'info', 'success', 'warning', 'danger']

  loginFunctions = {
    showNotification: function(from, align) {
      let color = 4

        $.notify({
        {
          icon: 'ti-close',
          message: '<b>Unable to login.</b>',
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
  // Getting references to our form and inputs
  let loginForm = $('form.login-form')
  var emailInput = $('#email-input')
  var passwordInput = $('#password-input')

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on('submit', (event) => {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  })

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post('/api/login', {
      email,
      password,
    })
      .then((data) => {
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(() => {
      loginFunctions.showNotification('top','center');
    })
  }
})
