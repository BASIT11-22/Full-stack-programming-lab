// ContactUs.js - Contact Us Page
// Contains a form with Name, Email, Message fields using useState
import React, { useState } from 'react';
import './Pages.css';

function ContactUs() {
    // State for each form field
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    // State for success message after submission
    const [submitted, setSubmitted] = useState(false);

    // State for validation errors
    const [errors, setErrors] = useState({});

    // Generic onChange handler — updates the matching field in state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Validate all fields before submission
    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Enter a valid email.';
        }
        if (!formData.message.trim()) newErrors.message = 'Message cannot be empty.';
        return newErrors;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Simulate successful form submission
            setSubmitted(true);
            setErrors({});
            setFormData({ name: '', email: '', message: '' });
        }
    };

    return (
        <div className="page contact-page">
            <h1>📬 Contact Us</h1>
            <p className="page-subtitle">Have a question? We'd love to hear from you!</p>

            {/* Show success message after submission */}
            {submitted && (
                <div className="success-banner">
                    ✅ Thank you! Your message has been sent. We'll get back to you soon.
                </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
                {/* Name Field */}
                <div className="form-group">
                    <label htmlFor="contact-name">Full Name</label>
                    <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Your full name"
                        onChange={handleChange}
                        className={errors.name ? 'input-error' : ''}
                    />
                    {errors.name && <span className="error-msg">{errors.name}</span>}
                </div>

                {/* Email Field */}
                <div className="form-group">
                    <label htmlFor="contact-email">Email Address</label>
                    <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="your@email.com"
                        onChange={handleChange}
                        className={errors.email ? 'input-error' : ''}
                    />
                    {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>

                {/* Message Field */}
                <div className="form-group">
                    <label htmlFor="contact-message">Message</label>
                    <textarea
                        id="contact-message"
                        name="message"
                        value={formData.message}
                        placeholder="Write your message here..."
                        onChange={handleChange}
                        rows={5}
                        className={errors.message ? 'input-error' : ''}
                    />
                    {errors.message && <span className="error-msg">{errors.message}</span>}
                </div>

                <button type="submit" className="submit-btn">
                    Send Message ✉️
                </button>
            </form>
        </div>
    );
}

export default ContactUs;
