// 1. Create 3 student objects
const students = [
    {
        name: "David Miller",
        age: 21,
        semester: 5,
        courses: ["Database Systems", "Operating Systems", "Networking"]
    },
    {
        name: "Sarah Lee",
        age: 20,
        semester: 3,
        courses: ["Programming I", "Discrete Math", "Web Design"]
    },
    {
        name: "Michael Chen",
        age: 22,
        semester: 7,
        courses: ["Artificial Intelligence", "Machine Learning", "Cloud Computing"]
    }
];

// 2. Convert objects to JSON using JSON.stringify()
const studentsJSON = JSON.stringify(students);

// Console log to show the stringified version
console.log("JSON String:", studentsJSON);

// 3. Convert JSON back using JSON.parse()
const parsedStudents = JSON.parse(studentsJSON);

const resultsContainer = document.getElementById("json-results");
let htmlContent = "";

// 6. Loop using forEach()
parsedStudents.forEach(student => {
    // 4. Use destructuring to extract properties
    const { name, age, semester, courses } = student;

    // 5. Display all students using innerHTML
    htmlContent += `
        <div class="student-card">
            <h3>${name}</h3>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Semester:</strong> ${semester}</p>
            <p class="courses"><strong>Courses:</strong> ${courses.join(", ")}</p>
        </div>
    `;
});

resultsContainer.innerHTML = htmlContent;
