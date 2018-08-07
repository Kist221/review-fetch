$(document).ready(() => {
  type = ['', 'info', 'success', 'warning', 'danger'];

  templateFunctions = {
    showNotification(from, align) {
      const color = 2;

      $.notify(
        {
          icon: 'ti-check',
          message: '<b>Template successfully saved!</b>',
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

  // Store a reference of the input for template name in Manage Templates page
  const templateName = $('#template-name');
  // Store a reference of the input for template subject in Manage Templates page
  const templateSubject = $('#template-subject');
  // Store a reference to the text area in Manage Templates page
  const templateTextArea = $('#template-textarea');

  // Attach the event listener on form submit
  $('#template-form').on('submit', handleFormSubmit);

  // This handles the submission of the fetch review form
  function handleFormSubmit(event) {
    event.preventDefault();
    // Get the contents of the template name input
    const nameOfNewTemplate = templateName.val().trim();
    // Get the contents of the template subject input
    let subjectOfNewTemplate = templateSubject.val().trim();
    // Get the contents of the text area
    let contentOfNewTemplate = templateTextArea.val().trim();

    // Sanitize the subject
    subjectOfNewTemplate = encodeURI(subjectOfNewTemplate);
    // Sanitize the contents
    contentOfNewTemplate = encodeURI(contentOfNewTemplate);

    const newTemplate = {
      name: nameOfNewTemplate,
      subject: subjectOfNewTemplate,
      message: contentOfNewTemplate,
    };

    // POST request to save the content, which is
    // the template that the user created, to the
    // `template` table in our DB
    $.post('/api/fetch_templates/new', newTemplate, () => {
      console.log('Saving template...');
    }).done(() => {
      templateFunctions.showNotification('top', 'center');
    });
  }
});
