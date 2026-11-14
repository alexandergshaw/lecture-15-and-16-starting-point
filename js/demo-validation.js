const field = document.querySelector('#name');
const error = document.querySelector('#nameError');
const form = document.querySelector('#nameForm');
const formStatus = document.querySelector('#formStatus');

field.addEventListener('input', function () {
  formStatus.textContent = '';

  if (field.value.trim() === '') {
    error.textContent = 'Enter your name.';
    field.setAttribute('aria-invalid', 'true');
  } else {
    error.textContent = '';
    field.setAttribute('aria-invalid', 'false');
  }
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  formStatus.textContent = '';

  if (field.value.trim() === '') {
    error.textContent = 'Enter your name.';
    field.setAttribute('aria-invalid', 'true');
    field.focus();
  } else {
    error.textContent = '';
    field.setAttribute('aria-invalid', 'false');
    formStatus.textContent = 'Name checked. Demo only: nothing sent.';
  }
});
