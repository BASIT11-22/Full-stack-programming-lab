// Create a Set to store unique courses
const coursesSet = new Set();

const courseInput = document.getElementById('course-input');
const addBtn = document.getElementById('add-btn');
const totalCoursesEl = document.getElementById('total-courses');
const courseListEl = document.getElementById('course-list');

// Function to update the UI
function updateUI() {
    // Display total unique courses using .size
    totalCoursesEl.textContent = `Total Unique Courses: ${coursesSet.size}`;

    let listHtml = '';

    // Display all unique courses using for...of loop
    for (const course of coursesSet) {
        listHtml += `<li>${course}</li>`;
    }

    courseListEl.innerHTML = listHtml;
}

// Add event listener to the button
addBtn.addEventListener('click', () => {
    const courseName = courseInput.value.trim();

    if (courseName !== '') {
        // Add course to Set (duplicates are automatically ignored)
        coursesSet.add(courseName);

        // Clear input field
        courseInput.value = '';

        // Update the display
        updateUI();
    }
});

// Pre-fill some courses dynamically to demonstrate functionality
coursesSet.add("Mathematics");
coursesSet.add("Physics");
coursesSet.add("Mathematics"); // Trying to add duplicate

// Initial UI update
updateUI();
