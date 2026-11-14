// These IDs connect this JavaScript to the input and preview paragraph in index.html.
const nameInput = document.querySelector('#guestName');
const greeting = document.querySelector('#greeting');

// Check the field whenever its text changes; CSS uses the class to change the paragraph's look.
nameInput.addEventListener('input', function () {
  const hasText = nameInput.value !== '';
  // Add the CSS class when there are characters; remove it when the field is empty.
  greeting.classList.toggle('has-name', hasText);
});
