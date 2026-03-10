// Greeting Component
// This component shows a personalized greeting based on the 'timeOfDay' prop.
// The 'bgColor' prop is a Bonus feature to change the card's background color.

import React from 'react';

// Functional component: receives name, timeOfDay, and bgColor via props
function Greeting({ name, timeOfDay, bgColor }) {

    // ----- CONDITIONAL RENDERING -----
    // Determine the greeting message based on the 'timeOfDay' prop.
    let greetingMessage = '';
    let greetingIcon = '';

    if (timeOfDay === 'Morning') {
        greetingMessage = 'Good Morning';
        greetingIcon = '🌅'; // sunrise icon for morning
    } else if (timeOfDay === 'Afternoon') {
        greetingMessage = 'Good Afternoon';
        greetingIcon = '☀️'; // sun icon for afternoon
    } else if (timeOfDay === 'Evening') {
        greetingMessage = 'Good Evening';
        greetingIcon = '🌙'; // moon icon for evening
    } else {
        // Fallback for any other value
        greetingMessage = 'Hello';
        greetingIcon = '👋';
    }

    // Bonus: Inline style to apply dynamic background color from 'bgColor' prop
    const cardStyle = {
        backgroundColor: bgColor || '#667eea',
    };

    return (
        <div className="greeting-card" style={cardStyle}>
            {/* Big icon representing the time of day */}
            <div className="greeting-icon">{greetingIcon}</div>

            {/* The greeting message with the student's name */}
            <h2 className="greeting-message">
                {greetingMessage}, <span className="greeting-name">{name}!</span>
            </h2>

            {/* Show the time of day as a subtitle */}
            <p className="greeting-time">It's {timeOfDay} 🕐</p>
        </div>
    );
}

// Export the component so App.js can use it
export default Greeting;
