// 1. Create Student class
class Student {
    constructor(id, name, major) {
        this.id = id;
        this.name = name;
        this.major = major;
    }
}

// 2. Store students inside a Map
const studentsMap = new Map();
studentsMap.set("S01", new Student("S01", "Emma Watson", "Computer Science"));
studentsMap.set("S02", new Student("S02", "John Doe", "Engineering"));
studentsMap.set("S03", new Student("S03", "Jane Smith", "Business"));

// 3. Register courses using Set
const coursesSet = new Set(["Data Structures", "Web Development", "Calculus", "Data Structures"]); // Duplicate will be ignored

// UI Elements
const studentsContainer = document.getElementById("students-container");
const coursesContainer = document.getElementById("courses-container");
const saveDataBtn = document.getElementById("save-data-btn");
const serverMsg = document.getElementById("server-msg");

// Function to display data
function displayData() {
    // Display all students
    let studentsHtml = "";
    studentsMap.forEach((student, key) => {
        studentsHtml += `
            <div class="student-card">
                <p><strong>Student ID:</strong> ${key}</p>
                <p><strong>Name:</strong> ${student.name}</p>
                <p><strong>Major:</strong> ${student.major}</p>
            </div>
        `;
    });
    studentsContainer.innerHTML = studentsHtml;

    // Display all courses
    let coursesHtml = "";
    for (const course of coursesSet) {
        coursesHtml += `<span class="course-tag">${course}</span>`;
    }
    coursesContainer.innerHTML = coursesHtml;
}

// 4. Simulate saving data using Promise
function saveToServer() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data successfully saved to the university server!");
        }, 2000);
    });
}

// Event listener for button
saveDataBtn.addEventListener("click", () => {
    saveDataBtn.disabled = true;
    serverMsg.className = "loading";
    serverMsg.textContent = "Saving data... Please wait.";

    saveToServer().then((message) => {
        // Show success message when Promise resolves
        serverMsg.className = "success";
        serverMsg.textContent = message;
        saveDataBtn.disabled = false;
    });
});

// Initial Render
displayData();
