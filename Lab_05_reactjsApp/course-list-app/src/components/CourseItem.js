// CourseItem Component
// This component receives course information as props and displays it as a styled card.
// The 'courseType' prop is a Bonus feature — it shows a badge (Online/Offline).

import React from 'react';

// Functional component: receives course details via props
function CourseItem({ courseName, instructor, duration, courseType }) {
    // Bonus: Determine badge color based on Online or Offline
    const badgeClass = courseType === 'Online' ? 'badge-online' : 'badge-offline';

    return (
        <div className="course-card">
            {/* Course name as the card header */}
            <div className="course-header">
                <h3 className="course-name">{courseName}</h3>
                {/* Bonus: courseType badge (Online = green, Offline = orange) */}
                <span className={`badge ${badgeClass}`}>{courseType}</span>
            </div>

            {/* Course detail rows */}
            <div className="course-details">
                <p className="course-detail">
                    <span className="course-icon">👨‍🏫</span>
                    <strong>Instructor:</strong> {instructor}
                </p>
                <p className="course-detail">
                    <span className="course-icon">⏱️</span>
                    <strong>Duration:</strong> {duration}
                </p>
            </div>
        </div>
    );
}

// Export the component so App.js can use it
export default CourseItem;
