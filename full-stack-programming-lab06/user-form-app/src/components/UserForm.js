// UserForm.js - User Form Component (Task 2)
// Uses useState to manage form inputs, validation, and submitted data display
import React, { useState } from 'react';
import './UserForm.css';

function UserForm() {
    // State for form input fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // State to hold the last submitted user data
    const [submittedData, setSubmittedData] = useState(null);

    // State to hold validation error messages
    const [errors, setErrors] = useState({});

    // Validate inputs before submission
    const validate = () => {
        const newErrors = {};
        if (!name.trim()) {
            newErrors.name = 'Name is required.';
        }
        if (!email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            // Basic email format check
            newErrors.email = 'Please enter a valid email address.';
        }
        return newErrors;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default browser form submission

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            // Show errors if validation fails
            setErrors(validationErrors);
        } else {
            // Save submitted data and clear the form
            setSubmittedData({ name, email });
            setName('');
            setEmail('');
            setErrors({});
        }
    };

    return (
        <div className="form-container">
            <form className="user-form" onSubmit={handleSubmit} noValidate>
                {/* Name Field */}
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        placeholder="Enter your full name"
                        onChange={(e) => setName(e.target.value)}
                        className={errors.name ? 'input-error' : ''}
                    />
                    {/* Show error message if name is invalid */}
                    {errors.name && <span className="error-msg">{errors.name}</span>}
                </div>

                {/* Email Field */}
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        className={errors.email ? 'input-error' : ''}
                    />
                    {/* Show error message if email is invalid */}
                    {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="submit-btn">
                    Submit ➜
                </button>
            </form>

            {/* Display submitted data below the form only after a successful submit */}
            {submittedData && (
                <div className="submitted-data">
                    <h3>✅ Submitted Information</h3>
                    <p><strong>Name:</strong> {submittedData.name}</p>
                    <p><strong>Email:</strong> {submittedData.email}</p>
                </div>
            )}
        </div>
    );
}

export default UserForm;
