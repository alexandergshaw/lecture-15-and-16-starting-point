const nameInput = document.querySelector('#guestName');
const greeting = document.querySelector('#greeting');

nameInput.addEventListener('input', function () {
  const hasText = nameInput.value !== '';
  greeting.classList.toggle('has-name', hasText);
});
