// StudentCard Component
// This component receives student information as props and displays it in a styled card.
// The 'color' prop is used as the card's background color (Bonus feature).

import React from 'react';

// Functional component: receives props as a parameter
function StudentCard({ name, rollNo, department, university, color }) {
    // Inline style to apply the dynamic background color from the 'color' prop
    const cardStyle = {
        backgroundColor: color || '#4a90e2', // defaults to blue if no color is given
    };

    return (
        // The card container with dynamic background color
        <div className="student-card" style={cardStyle}>
            {/* Student icon/avatar area */}
            <div className="card-avatar">
                <span className="avatar-initials">{name.charAt(0)}</span>
            </div>

            {/* Student name as the card title */}
            <h2 className="card-name">{name}</h2>

            {/* Divider line */}
            <div className="card-divider"></div>

            {/* Student details section */}
            <div className="card-details">
                <div className="card-detail-row">
                    <span className="detail-label">🎓 Roll No:</span>
                    <span className="detail-value">{rollNo}</span>
                </div>
                <div className="card-detail-row">
                    <span className="detail-label">📚 Department:</span>
                    <span className="detail-value">{department}</span>
                </div>
                <div className="card-detail-row">
                    <span className="detail-label">🏛️ University:</span>
                    <span className="detail-value">{university}</span>
                </div>
            </div>
        </div>
    );
}

// Export the component so App.js can use it
export default StudentCard;
