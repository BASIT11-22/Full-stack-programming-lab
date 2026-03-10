# 📁 Lab 05 – React.js Applications

**Course:** Full Stack Programming  
**Lab:** 05 | **Student:** Abdul Basit | **Roll No:** 232001

This folder contains **three beginner-friendly React applications** that demonstrate the fundamentals of React components and props.

---

## 📂 Folder Structure

```
Lab_05_reactjsApp/
├── student-card-app/      → Task 1: Reusable Components & Props
├── course-list-app/       → Task 2: Rendering Lists with map()
└── greeting-app/          → Task 3: Conditional Rendering with Props
```

---

## 🚀 How to Run Each Project

> Make sure Node.js and npm are installed. You can download them from [nodejs.org](https://nodejs.org).

### 🟣 Task 1 – Student Card App

```bash
cd student-card-app
npm install
npm start
```
Opens at: `http://localhost:3000`

---

### 🔵 Task 2 – Course List App

```bash
cd course-list-app
npm install
npm start
```
Opens at: `http://localhost:3000`

---

### 🟢 Task 3 – Greeting App

```bash
cd greeting-app
npm install
npm start
```
Opens at: `http://localhost:3000`

---

## 📋 Task Explanations

### ✅ Task 1 – Student Information Card App

**Concept:** Reusable components and props.

The `StudentCard` component acts like a template with "slots" (called **props**). You fill in the slots when you use it in `App.js`. Three cards are rendered with different student data.

- **Props used:** `name`, `rollNo`, `department`, `university`, `color`
- **Bonus:** The `color` prop changes the card's background color dynamically using inline styles.

---

### ✅ Task 2 – Course List App

**Concept:** Rendering lists using the `.map()` function.

An array of 5 course objects is defined in `App.js`. The `.map()` function loops through the array and renders a `CourseItem` component for each course — a core React pattern.

- **Props used:** `courseName`, `instructor`, `duration`, `courseType`
- **Bonus:** The `courseType` prop renders a colored badge — green for **Online**, orange for **Offline**.

---

### ✅ Task 3 – Dynamic Greeting App

**Concept:** Conditional rendering with props.

The `Greeting` component checks the value of the `timeOfDay` prop using `if/else` statements and shows a different message accordingly.

| `timeOfDay` | Greeting Message |
|------------|-----------------|
| Morning    | Good Morning 🌅 |
| Afternoon  | Good Afternoon ☀️ |
| Evening    | Good Evening 🌙 |

- **Props used:** `name`, `timeOfDay`, `bgColor`
- **Bonus:** The `bgColor` prop changes the background color of each greeting card.

---

## 🌐 Pushing to GitHub

### Step 1: Initialize Git (in the Lab_05_reactjsApp folder)
```bash
cd Lab_05_reactjsApp
git init
git add .
git commit -m "Add Lab 05 React.js Applications"
```

### Step 2: Create GitHub Repository
1. Go to [github.com](https://github.com) and sign in.
2. Click **"New"** to create a new repository.
3. Name it: `Full-stack-programming-lab`
4. Leave it **Public** and click **"Create repository"**.

### Step 3: Push Your Code
```bash
git remote add origin https://github.com/YOUR_USERNAME/Full-stack-programming-lab.git
git branch -M main
git push -u origin main
```
> ⚠️ Replace `YOUR_USERNAME` with your actual GitHub username.

---

## 🧩 Key React Concepts Covered

| Concept | Where Used |
|---|---|
| Functional Components | All three apps |
| Props | All three apps |
| Inline Styles (dynamic) | Task 1 & 3 (`color`, `bgColor`) |
| Array `.map()` | Task 2: Course List |
| Conditional Rendering | Task 3: Greeting App |
| Component Reusability | All three apps |
