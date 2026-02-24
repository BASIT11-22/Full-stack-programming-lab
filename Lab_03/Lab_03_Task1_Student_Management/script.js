// Define the Student class
class Student {
    constructor(id, name, semester, courses) {
        this.id = id;
        this.name = name;
        this.semester = semester;
        this.courses = courses; // Expecting an array of course names
    }
}

// Create at least 3 student objects
const student1 = new Student(101, "Alice Johnson", 3, ["Math", "Physics", "Computer Science"]);
const student2 = new Student(102, "Bob Smith", 4, ["Chemistry", "Biology", "English"]);
const student3 = new Student(103, "Charlie Davis", 2, ["History", "Art", "Philosophy"]);

// Store students inside an array
const studentsArray = [student1, student2, student3];

// Display all student details dynamically using template literals
const studentListContainer = document.getElementById("student-list");

let htmlContent = "";

for (let i = 0; i < studentsArray.length; i++) {
    const student = studentsArray[i];
    
    // Using template literals to create HTML structure for each student
    htmlContent += `
        <div class="student-card">
            <h2>${student.name}</h2>
            <p><strong>ID:</strong> ${student.id}</p>
            <p><strong>Semester:</strong> ${student.semester}</p>
            <p><strong>Courses:</strong> ${student.courses.join(", ")}</p>
        </div>
    `;
}

// Use innerHTML to show students inside the div
studentListContainer.innerHTML = htmlContent;
