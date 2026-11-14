(function () {
  // These selectors connect the page controls and demo sections in index.html.
  const demos = document.querySelectorAll('.demo');
  const links = document.querySelectorAll('.demo-nav a');
  const copyStatus = document.querySelector('#copyStatus');
  const guestName = document.querySelector('#guestName');
  const classStatus = document.querySelector('#classStatus');

  function showDemo() {
    // The URL hash chooses a demo, such as #click; unknown hashes show the first demo.
    const requested = window.location.hash.slice(1);
    const active = ['click', 'styling', 'validation'].includes(requested) ? requested : 'click';

    demos.forEach(function (demo) {
      // The hidden HTML attribute hides inactive sections; styles.css keeps them hidden.
      demo.hidden = demo.id !== active;
    });
    links.forEach(function (link) {
      // Mark the matching navigation link so styles.css can highlight it.
      if (link.getAttribute('href') === '#' + active) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
    // Clear old copy feedback; CSS hides this status paragraph while it is empty.
    copyStatus.textContent = '';
  }

  function describeClass() {
    // Explain the class that demo-styling.js and styles.css use on the greeting.
    classStatus.textContent = guestName.value !== ''
      ? 'Class present: has-name. The field contains characters.'
      : 'Class absent: the field is empty.';
  }

  // Each reset button's data-reset value selects which HTML demo to restore.
  const resets = {
    click: function () {
      document.querySelector('#specialMessage').textContent = 'Choose a special.';
    },
    styling: function () {
      guestName.value = '';
      // JavaScript-cleared fields do not fire input, so remove the CSS class directly.
      document.querySelector('#greeting').classList.remove('has-name');
      describeClass();
    },
    validation: function () {
      document.querySelector('#name').value = '';
      document.querySelector('#nameError').textContent = '';
      document.querySelector('#formStatus').textContent = '';
      // Remove the invalid marker so the CSS error style is cleared until typing begins.
      document.querySelector('#name').removeAttribute('aria-invalid');
    }
  };

  // Connect each reset button in the HTML to its matching reset above.
  document.querySelectorAll('[data-reset]').forEach(function (resetButton) {
    resetButton.addEventListener('click', function () {
      resets[resetButton.dataset.reset]();
    });
  });

  function copyFallback(code, copyButton) {
    // Older browsers can copy by selecting the code snippet shown in the HTML.
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

    // Return keyboard focus to the button and put the result in the HTML status paragraph.
    copyButton.focus();
    if (copied) {
      selection.removeAllRanges();
      copyStatus.textContent = 'Code copied.';
    } else {
      copyStatus.textContent = 'Automatic copying is unavailable. Code selected: press Ctrl+C (Windows/Linux) or Command+C (Mac), or select and copy the code manually.';
    }
  }

  // Each data-copy value points to the ID of a code snippet in index.html.
  document.querySelectorAll('[data-copy]').forEach(function (copyButton) {
    copyButton.addEventListener('click', async function () {
      const code = document.getElementById(copyButton.dataset.copy);
      // Remove any previous result from the status paragraph before trying to copy.
      copyStatus.textContent = '';
      // Prefer the modern clipboard feature, then try the selection-based fallback.
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

  // Keep the on-page class explanation in sync with typing, navigation, and the URL.
  guestName.addEventListener('input', describeClass);
  window.addEventListener('hashchange', showDemo);
  showDemo();
})();
