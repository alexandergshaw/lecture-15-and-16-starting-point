// These IDs connect the form, field, error message, and status message in index.html.
const field = document.querySelector('#name');
const error = document.querySelector('#nameError');
const form = document.querySelector('#nameForm');
const formStatus = document.querySelector('#formStatus');

// Recheck the field as the learner types and clear any old submit message.
field.addEventListener('input', function () {
  formStatus.textContent = '';

  // Ignore spaces at the ends. The error text appears in #nameError; CSS hides
  // it when empty, and styles the input when aria-invalid is true.
  if (field.value.trim() === '') {
    error.textContent = 'Enter your name.';
    field.setAttribute('aria-invalid', 'true');
  } else {
    error.textContent = '';
    field.setAttribute('aria-invalid', 'false');
  }
});

// Handle the HTML form's submit event so this local classroom demo does not navigate away.
form.addEventListener('submit', function (event) {
  event.preventDefault();
  formStatus.textContent = '';

  // A bad submission shows the same error and puts the cursor back in the field.
  if (field.value.trim() === '') {
    error.textContent = 'Enter your name.';
    field.setAttribute('aria-invalid', 'true');
    field.focus();
  } else {
    // A good submission clears the error and reports the result without sending data.
    error.textContent = '';
    field.setAttribute('aria-invalid', 'false');
    formStatus.textContent = 'Name checked. Demo only: nothing sent.';
  }
});
