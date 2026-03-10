// App.js – Course List App
// This is the root component of the application.
// It defines a courses array and uses the .map() function to render CourseItem components.

import React from 'react';
import './App.css';
import CourseItem from './components/CourseItem';

// ---- Course Data Array ----
// Each object represents one course with the required props as keys.
const courses = [
    {
        id: 1,
        courseName: 'Web Development',
        instructor: 'John',
        duration: '8 weeks',
        courseType: 'Online',
    },
    {
        id: 2,
        courseName: 'Machine Learning',
        instructor: 'Sara',
        duration: '10 weeks',
        courseType: 'Offline',
    },
    {
        id: 3,
        courseName: 'Data Structures',
        instructor: 'Ahmed',
        duration: '6 weeks',
        courseType: 'Offline',
    },
    {
        id: 4,
        courseName: 'Cloud Computing',
        instructor: 'Ali',
        duration: '5 weeks',
        courseType: 'Online',
    },
    {
        id: 5,
        courseName: 'Mobile App Development',
        instructor: 'Fatima',
        duration: '7 weeks',
        courseType: 'Online',
    },
];

function App() {
    return (
        <div className="app">
            {/* Page Header */}
            <header className="app-header">
                <h1>📚 Course List</h1>
                <p className="app-subtitle">React Lab – Task 2: Lists & Map Function</p>
            </header>

            {/* Course Grid – renders CourseItem for each course in the array */}
            <div className="courses-container">
                {/*
          .map() iterates over each course object in the 'courses' array.
          For each course, it returns a CourseItem component.
          The 'key' prop is required by React to uniquely identify each list item.
        */}
                {courses.map((course) => (
                    <CourseItem
                        key={course.id}
                        courseName={course.courseName}
                        instructor={course.instructor}
                        duration={course.duration}
                        courseType={course.courseType}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
