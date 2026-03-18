// Counter.js - Counter Component (Task 1)
// Uses useState hook to manage the counter value
import React, { useState } from 'react';
import './Counter.css';

function Counter() {
    // State: count starts at 0
    const [count, setCount] = useState(0);

    // Increment handler: adds 1 to current count
    const handleIncrement = () => {
        setCount(count + 1);
    };

    // Decrement handler: subtracts 1 but prevents going below 0
    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    // Reset handler: sets count back to 0
    const handleReset = () => {
        setCount(0);
    };

    return (
        <div className="counter-container">
            {/* Display current count value */}
            <div className="count-display">
                <span className={`count-value ${count === 0 ? 'zero' : 'positive'}`}>
                    {count}
                </span>
                <p className="count-label">Current Count</p>
            </div>

            {/* Control buttons */}
            <div className="button-group">
                <button
                    className="btn btn-increment"
                    onClick={handleIncrement}
                    title="Increment count"
                >
                    ＋ Increment
                </button>

                <button
                    className="btn btn-decrement"
                    onClick={handleDecrement}
                    disabled={count === 0}
                    title={count === 0 ? 'Cannot go below 0' : 'Decrement count'}
                >
                    － Decrement
                </button>

                <button
                    className="btn btn-reset"
                    onClick={handleReset}
                    title="Reset count to 0"
                >
                    ↺ Reset
                </button>
            </div>

            {/* Show a note when count is at minimum */}
            {count === 0 && (
                <p className="min-note">Count cannot go below 0.</p>
            )}
        </div>
    );
}

export default Counter;
