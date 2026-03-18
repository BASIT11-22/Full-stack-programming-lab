// Actions.js - Event Handling Component (Task 3)
// Demonstrates onClick and onMouseOver event handling with useState
import React, { useState } from 'react';
import './Actions.css';

function Actions() {
    // State: controls the visibility of the message
    const [message, setMessage] = useState('');

    // State: controls background color toggle
    const [bgColor, setBgColor] = useState('#ffffff');

    // State: controls text color on individual buttons (via hover)
    const [hoveredBtn, setHoveredBtn] = useState(null);

    // Handler 1: Show a message on screen
    const handleShowMessage = () => {
        setMessage('🎉 Hello! This message was triggered by a button click!');
    };

    // Handler 2: Toggle background color between white and a light blue
    const handleChangeBackground = () => {
        setBgColor((prev) =>
            prev === '#ffffff' ? '#cce5ff' : '#ffffff'
        );
    };

    // Handler 3: Show a browser alert popup
    const handleShowAlert = () => {
        alert('⚠️ This is a browser alert triggered by onClick!');
    };

    return (
        <div className="actions-wrapper" style={{ backgroundColor: bgColor }}>
            <div className="actions-container">
                <p className="actions-description">
                    Click the buttons below to trigger different events.
                </p>

                <div className="actions-buttons">
                    {/* Button 1: Show Message — onClick shows message */}
                    <button
                        className="action-btn btn-message"
                        onClick={handleShowMessage}
                        // onMouseOver changes text color on hover
                        onMouseOver={() => setHoveredBtn('message')}
                        onMouseOut={() => setHoveredBtn(null)}
                        style={{ color: hoveredBtn === 'message' ? '#0056b3' : '' }}
                    >
                        💬 Show Message
                    </button>

                    {/* Button 2: Change Background Color */}
                    <button
                        className="action-btn btn-background"
                        onClick={handleChangeBackground}
                        onMouseOver={() => setHoveredBtn('bg')}
                        onMouseOut={() => setHoveredBtn(null)}
                        style={{ color: hoveredBtn === 'bg' ? '#1a7a1a' : '' }}
                    >
                        🎨 Change Background
                    </button>

                    {/* Button 3: Show Alert */}
                    <button
                        className="action-btn btn-alert"
                        onClick={handleShowAlert}
                        onMouseOver={() => setHoveredBtn('alert')}
                        onMouseOut={() => setHoveredBtn(null)}
                        style={{ color: hoveredBtn === 'alert' ? '#c0392b' : '' }}
                    >
                        🔔 Show Alert
                    </button>
                </div>

                {/* Display the message if it exists */}
                {message && (
                    <div className="message-box">
                        <p>{message}</p>
                        {/* Allow dismissing the message */}
                        <button className="dismiss-btn" onClick={() => setMessage('')}>
                            ✕ Dismiss
                        </button>
                    </div>
                )}

                {/* Show current background status */}
                <p className="status-text">
                    Background: <strong>{bgColor === '#ffffff' ? 'White (default)' : 'Light Blue'}</strong>
                </p>
            </div>
        </div>
    );
}

export default Actions;
