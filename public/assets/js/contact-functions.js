$(document).ready(() => {
  type = ['', 'info', 'success', 'warning', 'danger'];

  contactFunctions = {
    showNotification(from, align, msg) {
      const color = 2;

      $.notify(
        {
          icon: 'ti-check',
          message: `<b>${msg}</b>`,
        },
        {
          type: type[color],
          timer: 1000,
          placement: {
            from,
            align,
          },
        }
      );
    },
  };

  $('.edit-contact').on('click', editContact);
  $('#new-contact-addbtn').on('click', handleFormSubmit);
  $('#edit-contact-btn').on('click', updateContact);

  // A function for handling what happens when the form to create a new contact is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log('Submit!');

    const email = $('#new-contact-email');
    const firstname = $('#new-contact-firstname');
    const lastname = $('#new-contact-lastname');
    const gender = $('#new-contact-gender');
    const phone = $('#new-contact-phone');

    const newContact = constructContactObject(
      firstname,
      lastname,
      gender,
      email,
      phone
    );

    submitPost(newContact);
  }

  // This populates the edit modal with the selected contact's details
  function editContact(event) {
    const id = event.target.id.replace('editContact', '');
    $.get(`/api/fetch_contact_data/${id}`, () => {
      console.log(`Getting contact with id: ${id}`);
    }).done(obj => {
      const name = obj.name.split(' ');
      $('#edit-contact-email').val(obj.email);
      $('#edit-contact-firstname').val(name[0]);
      $('#edit-contact-lastname').val(name[1]);
      $('#edit-contact-phone').val(obj.phone);

      if (obj.gender == 1) {
        $('#edit-contact-gender select').val('male');
      } else {
        $('#edit-contact-gender select').val('female');
      }

      if (obj.active == true) {
        $('#activeCheckbox').checkbox('check');
      } else {
        $('#activeCheckbox').checkbox('uncheck');
      }

      if (obj.status == 0) {
        $('#edit-contact-status option[value=0]').prop('selected', true);
      } else if (obj.status == 1) {
        $('#edit-contact-status option[value=1]').prop('selected', true);
      } else {
        $('#edit-contact-status option[value=2]').prop('selected', true);
      }

      // Give the edit modal the id of the contact through data-id
      $('#editContactModal').attr('data-id', id);
    });
  }

  // A function for handling what happens when the form to save changes on a contact is submitted
  function updateContact(event) {
    const editEmail = $('#edit-contact-email');
    const editFirstname = $('#edit-contact-firstname');
    const editLastname = $('#edit-contact-lastname');
    const editGender = $('#edit-contact-gender');
    const editPhone = $('#edit-contact-phone');

    const contact = constructContactObject(
      editFirstname,
      editLastname,
      editGender,
      editEmail,
      editPhone
    );

    const activeCheckbox = $('#activeCheckbox').prop('checked');
    contact.active = activeCheckbox;
    contact.status = $('#edit-contact-status').val();
    contact.id = $('#editContactModal').attr('data-id');

    $.post(`/api/fetch_contact_data/update${contact.id}`, contact, () => {
      const editSuccessMsg = 'Changes to Contact Saved!';
      contactFunctions.showNotification('top', 'center', editSuccessMsg);
      setTimeout(() => {
        window.location.href = '/contacts';
      }, 2000);
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
    const fullName = `${firstname.val().trim()} ${lastname.val().trim()}`;
    // Assigns 1 for male and 0 for female (stored as boolean)
    if (gender.val() === 'male') {
      gender = 1;
    } else if (gender.val() === 'female') {
      gender = 0;
    } else {
      gender = 1;
    }

    // Make the object
    const contact = {
      name: fullName.trim(),
      gender,
      email: email.val().trim(),
      phone: phone.val().trim(),
      CompanyId: 1,
    };

    // Return the object
    return contact;
  }

  // Submits a new contact and shows a notification upon completion
  function submitPost(contact) {
    console.log('Posting');
    $.post('/api/fetch_contact_data/new', contact, () => {
      const successAddMsg = 'Contact Added Successfully!';
      contactFunctions.showNotification('top', 'center', successAddMsg);
      setTimeout(() => {
        window.location.href = '/contacts';
      }, 2000);
    });
  }
});
