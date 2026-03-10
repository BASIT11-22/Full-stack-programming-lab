# jQuery Labs — Abdul Basit (232001)

A complete collection of **8 interactive jQuery lab exercises** covering DOM manipulation,
event handling, animations, AJAX, form validation, drag-and-drop, and more.

---

## 🚀 How to Run

No build step required — this project is pure HTML/CSS/JS.

1. **Download / clone** this folder to your machine.
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge).
3. Click on any lab card to open that exercise.

> All jQuery/jQuery-UI dependencies are loaded from CDN — an internet connection is needed the first time.

---

## 📁 Project Structure

```
jquery-labs/
├── index.html                  ← Navigation homepage
├── css/
│   └── style.css               ← Shared design system
├── js/
│   └── common.js               ← Shared utilities (toast, active link)
├── labs/
│   ├── lab1-dynamic-list.html
│   ├── lab2-image-gallery.html
│   ├── lab3-form-validation.html
│   ├── lab4-tabs-scroll.html
│   ├── lab5-style-editor.html
│   ├── lab6-api-fetcher.html
│   ├── lab7-drag-drop.html
│   └── lab8-quiz-game.html
└── README.md
```

---

## 🛠 Technologies Used

| Technology   | Version | Purpose                      |
|--------------|---------|------------------------------|
| HTML5        | —       | Page structure               |
| CSS3         | —       | Styling, animations, layout  |
| JavaScript   | ES6+    | Business logic               |
| jQuery       | 3.7.1   | DOM, events, AJAX, effects   |
| jQuery UI    | 1.13.2  | Drag-and-drop sortable (Lab 7) |
| Google Fonts | —       | Inter + Fira Code typography |

---

## 🔹 Lab Descriptions

### Lab 1 · Dynamic List Manager
**Concepts:** DOM Manipulation, Event Handling, CSS Manipulation

Add items to a list using an input field. Items animate in with `slideDown` and out with `slideUp`. Hovering highlights an item with colour. Empty submission is prevented and an error state is shown.

---

### Lab 2 · Animated Image Gallery
**Concepts:** Effects & Animations, DOM Manipulation, Chaining

Four landscape images are displayed in a gallery viewer. Prev/Next buttons navigate between slides using jQuery `fadeOut` → callback → `fadeIn` chaining. Dot indicators and a thumbnail strip provide additional navigation. Buttons are disabled at the first/last slide.

---

### Lab 3 · Interactive Form Validation
**Concepts:** Event Handling, DOM Manipulation, CSS Manipulation

A registration form validates **Name**, **Email**, and **Password** fields. Validation fires on `blur` (leaving a field). Invalid fields receive a red border (`is-invalid` class); valid fields get a green border (`is-valid`). A success banner slides in without page reload. Includes a live password-strength bar.

---

### Lab 4 · Tabbed Content with Smooth Scroll
**Concepts:** DOM Manipulation, Effects & Animations, Event Handling

Five content tabs: Overview, Curriculum, Tools, Labs, Resources. Clicking a tab hides all other panels and `fadeIn`s the selected one. The page then smooth-scrolls to the content area. Arrow-key navigation is also supported for accessibility.

---

### Lab 5 · Chained Style Editor *(Home Task)*
**Concepts:** jQuery Chaining, CSS Manipulation, Toggle

A live text preview block with controls for font size, text colour, background colour, bold, italic, underline, and strikethrough. **Every style mutation uses jQuery method chaining** (`.css().css().toggleClass()…`). A style readout displays the current applied styles.

---

### Lab 6 · API Data Fetcher *(Home Task)*
**Concepts:** AJAX, DOM Manipulation, Event Handling

Fetches posts from `https://jsonplaceholder.typicode.com/posts` using `$.ajax()`. Displays 5 posts at a time with a loading spinner. A **Load More** button appends the next 5. **Error handling** shows a styled error message if the request fails.

---

### Lab 7 · Drag-and-Drop Sortable List *(Home Task)*
**Concepts:** jQuery UI Sortable, DOM Manipulation, Events

Six task items can be reordered by dragging via **jQuery UI Sortable**. The dragged item is visually highlighted (rotated, glowing). Position badges update after each drop. A live **Current Order** panel reflects the new sequence. Shuffle and Reset buttons are included.

---

### Lab 8 · Quiz Game *(Home Task)*
**Concepts:** DOM Manipulation, Event Handling, Effects & Animations

A 7-question multiple-choice quiz on web technologies. Questions appear one at a time with a `fadeIn` transition. Selecting an option locks the question, highlights correct/wrong answers, and shows a feedback message. Score is tracked live. The final result screen features an **animated conic-gradient donut ring** that fills to the user's score percentage.

---

## 📸 Screenshots

> Open each lab in your browser to see it in action.

| Lab | File |
|-----|------|
| Index | `index.html` |
| Lab 1 | `labs/lab1-dynamic-list.html` |
| Lab 2 | `labs/lab2-image-gallery.html` |
| Lab 3 | `labs/lab3-form-validation.html` |
| Lab 4 | `labs/lab4-tabs-scroll.html` |
| Lab 5 | `labs/lab5-style-editor.html` |
| Lab 6 | `labs/lab6-api-fetcher.html` |
| Lab 7 | `labs/lab7-drag-drop.html` |
| Lab 8 | `labs/lab8-quiz-game.html` |

---

## 👤 Author

**Abdul Basit** · Student ID: **232001** · Lab 04  
Web Technologies — jQuery Interactive Labs
