(function () {
  const demos = document.querySelectorAll('.demo');
  const links = document.querySelectorAll('.demo-nav a');
  const copyStatus = document.querySelector('#copyStatus');
  const guestName = document.querySelector('#guestName');
  const classStatus = document.querySelector('#classStatus');

  function showDemo() {
    const requested = window.location.hash.slice(1);
    const active = ['click', 'styling', 'validation'].includes(requested) ? requested : 'click';

    demos.forEach(function (demo) {
      demo.hidden = demo.id !== active;
    });
    links.forEach(function (link) {
      if (link.getAttribute('href') === '#' + active) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
    copyStatus.textContent = '';
  }

  function describeClass() {
    classStatus.textContent = guestName.value !== ''
      ? 'Class present: has-name. The field contains characters.'
      : 'Class absent: the field is empty.';
  }

  const resets = {
    click: function () {
      document.querySelector('#specialMessage').textContent = 'Choose a special.';
    },
    styling: function () {
      guestName.value = '';
      document.querySelector('#greeting').classList.remove('has-name');
      describeClass();
    },
    validation: function () {
      document.querySelector('#name').value = '';
      document.querySelector('#nameError').textContent = '';
      document.querySelector('#formStatus').textContent = '';
      document.querySelector('#name').removeAttribute('aria-invalid');
    }
  };

  document.querySelectorAll('[data-reset]').forEach(function (resetButton) {
    resetButton.addEventListener('click', function () {
      resets[resetButton.dataset.reset]();
    });
  });

  function copyFallback(code, copyButton) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(code);
    selection.removeAllRanges();
    selection.addRange(range);

    let copied = false;
    try {
      copied = document.execCommand('copy');
    } catch {
      copied = false;
    }

    copyButton.focus();
    if (copied) {
      selection.removeAllRanges();
      copyStatus.textContent = 'Code copied.';
    } else {
      copyStatus.textContent = 'Automatic copying is unavailable. Code selected: press Ctrl+C (Windows/Linux) or Command+C (Mac), or select and copy the code manually.';
    }
  }

  document.querySelectorAll('[data-copy]').forEach(function (copyButton) {
    copyButton.addEventListener('click', async function () {
      const code = document.getElementById(copyButton.dataset.copy);
      copyStatus.textContent = '';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(code.textContent);
          copyStatus.textContent = 'Code copied.';
          return;
        } catch {
          copyFallback(code, copyButton);
        }
      } else {
        copyFallback(code, copyButton);
      }
    });
  });

  guestName.addEventListener('input', describeClass);
  window.addEventListener('hashchange', showDemo);
  showDemo();
})();
