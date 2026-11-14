# DOM Manipulation & Events

**Lectures 15 & 16 · Classroom Demonstrations**

Three small, working examples for a beginner web-development class:

| Slide | Demonstration | Learner JavaScript |
| --- | --- | --- |
| 8 | Change One Paragraph: select elements, listen for a click, update `textContent`. | `js/demo-click.js` |
| 13 | Change a Style While Typing: read `value` on `input` and toggle a CSS class. Spaces count as characters. | `js/demo-styling.js` |
| 19 | One Error Appears and Clears: use a condition, `trim()`, inline error text, and `aria-invalid`. | `js/demo-validation.js` |

The name form is a local demonstration. It never sends data anywhere.

## Open locally

Download or check out the repository and open `index.html` in a browser. No installation, build command, backend, framework, or external assets are needed.

Optionally, if Python is available, run `python -m http.server 8000` from the repository root and open `http://localhost:8000/`. Stop the server with Ctrl+C.

Use the three navigation links, or open `index.html#click`, `index.html#styling`, or `index.html#validation` directly. One demo is visible at a time. Switching demos preserves their state. Each **Reset this demo** button resets only that example and leaves focus on the reset button.

## Files and teaching controls

- `index.html`: live examples and escaped, read-only code references.
- `styles.css`: page layout, focus and error styles, and the greeting’s two CSS states.
- `favicon.svg`: a small local browser-tab icon.
- `js/demo-click.js`, `js/demo-styling.js`, `js/demo-validation.js`: the instructional code, loaded as classic scripts with `defer`.
- `js/site.js`: hash navigation, copying, class-state explanation, and reset controls. These presentation controls are separate from the learner examples.
- `.nojekyll`: tells GitHub Pages to serve the static files without Jekyll processing.

**Show code** starts collapsed. Each snippet has a **Copy code** button and success feedback. If the Clipboard API is unavailable, the site attempts ordinary browser copying. If that is also blocked, it selects the snippet and explains how to copy manually. Validation shows the short seven-line decision first; the complete listeners and submit handling are in a separate **Full setup** disclosure.

## Prepared student starters

For an independent student exercise, put the relevant HTML in the body of a small HTML page. Load just that activity’s JavaScript with a deferred classic script, for example:

```html
<script src="./js/demo-click.js" defer></script>
```

Start with an empty activity file, then add the JavaScript from the demo’s code disclosure. Use the matching file name from the table above. The following elements must exist before the instructional code runs. Copy these starters into a separate exercise page, not alongside the existing examples: live IDs must be unique.

### Slide 8 · prepared HTML

```html
<button id="specialButton" type="button">
  Show today’s special
</button>

<p id="specialMessage" role="status">
  Choose a special.
</p>
```

Select the button and paragraph once. Add the click listener and change only the paragraph’s `textContent`.

### Slide 13 · prepared HTML and CSS

```html
<label for="guestName">Your name</label>
<input id="guestName" type="text">

<p id="greeting">Your greeting preview</p>
```

Put these two states in the exercise’s stylesheet and link it from the HTML:

```css
#greeting {
  padding: 1rem;
  border: 2px solid #526c7b;
}

#greeting.has-name {
  background: #d9f4e8;
  border-color: #006e60;
}
```

Listen for `input`, check `nameInput.value !== ''`, and toggle `has-name`. Do not trim the value or change the paragraph’s words. Clearing an input through JavaScript does not fire an input event, so the site’s reset explicitly removes the class.

### Slide 19 · prepared HTML and element selection

```html
<p>This demo checks a name. It does not send a message.</p>

<form id="nameForm" novalidate>
  <label for="name">Name (required)</label>
  <input
    id="name"
    name="name"
    required
    autocomplete="name"
    aria-describedby="nameError"
  >

  <p id="nameError"></p>

  <button type="submit">Check name</button>

  <p id="formStatus" role="status"></p>
</form>
```

```javascript
const field = document.querySelector('#name');
const error = document.querySelector('#nameError');
const form = document.querySelector('#nameForm');
const formStatus = document.querySelector('#formStatus');
```

The central decision:

```javascript
if (field.value.trim() === '') {
  error.textContent = 'Enter your name.';
  field.setAttribute('aria-invalid', 'true');
} else {
  error.textContent = '';
  field.setAttribute('aria-invalid', 'false');
}
```

Place the decision inside an `input` listener and clear the old form status whenever the field changes. Do not move focus while typing. The full setup also handles the form’s `submit` event with `event.preventDefault()`: invalid submission focuses the field; valid submission says exactly “Name checked. Demo only: nothing sent.” Use the **Full setup** disclosure as the reference.

## Instructor sequence

For each activity:

1. Explain the concept and point out the page’s starting state.
2. Demonstrate one action and compare before and after.
3. Reveal the short code and identify the selected element, event, and change.
4. Let students try one change in their own exercise file (for example, different special text or a different class background).
5. Reset the demo before demonstrating again.

For styling, try `Alex`, spaces, and an empty field. For validation, contrast spaces-only input with a useful name, and demonstrate both typing and submitting with Enter.

## Deploy with GitHub Pages

1. Commit and push these files to this repository’s default branch, **`main`**. If working in a pull request, merge it into `main` first. Keep `index.html` and `.nojekyll` in the root.
2. Open the repository on GitHub, then **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose **`main`** (or the repository’s default branch if renamed) and **`/(root)`**, then **Save**.
5. Wait for GitHub’s Pages deployment to finish and follow the site link shown in Settings.

Expected project-site URL:

```text
https://USERNAME.github.io/REPOSITORY/
```

For this repository:

```text
https://alexandergshaw.github.io/lecture-15-and-16-starting-point/
```

All asset paths are relative (`./styles.css`, `./js/demo-click.js`, etc.), so deployment under a repository subpath works. Hash navigation does not require server-side routes. No custom build workflow is necessary.

## Browser verification checklist

There is no package-based test infrastructure. Check these behaviors directly in a browser:

- Fresh load: “Choose a special.”, unchanged greeting with no class, empty validation field/error/status, collapsed code panels, and no console errors.
- Click changes the paragraph to “Tomato soup”; repeated clicks remain predictable.
- Typing or pasting `Alex` or spaces adds `has-name`; clearing removes it without changing the preview’s words.
- Validation rejects empty and spaces-only values. Correcting a name clears the error immediately without moving focus.
- Invalid submission focuses the field. Valid submission shows “Name checked. Demo only: nothing sent.” Editing clears that status.
- Reset restores only its own example. Repeat interactions and resets; switching sections must preserve other demo states.
- Use Tab, Shift+Tab, Enter, and Space for navigation, disclosures, inputs, and native buttons. Check visible focus, narrow screens, and browser zoom.
- Copy each snippet; test the manual-copy fallback if clipboard access is blocked.
- Load the site beneath a repository subpath and check that all scripts and CSS load.