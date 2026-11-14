const button = document.querySelector('#specialButton');
const message = document.querySelector('#specialMessage');

button.addEventListener('click', function () {
  message.textContent = 'Tomato soup';
});
