// ==========================================
// Full Stack Programming - Lab 10
// Node.js and Express.js Fundamentals
// ==========================================

const express = require('express');
const app = express();
const PORT = 3000;

// Data Array for Task 1
const students = ['Ali', 'Ahmed', 'Sara', 'Basit'];

// ==========================================
// TASK 4 — Simple HTML Page Renderer
// ==========================================
// Route: /
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Lab 10 - Node & Express</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f4f7f6;
                    color: #333;
                    margin: 0;
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .container {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    max-width: 600px;
                    width: 100%;
                }
                h1 {
                    color: #2c3e50;
                    border-bottom: 2px solid #3498db;
                    padding-bottom: 10px;
                    margin-top: 0;
                }
                h2 {
                    color: #34495e;
                }
                ul {
                    line-height: 1.6;
                    font-size: 16px;
                }
                li {
                    margin-bottom: 8px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to Lab 10</h1>
                <h2>About this lab</h2>
                <p>This is a beginner-friendly Node.js and Express.js project demonstrating basic routing and HTML rendering.</p>
                <h2>Features list</h2>
                <ul>
                    <li>Express server creation</li>
                    <li>Basic Routes (/home, /about, /contact)</li>
                    <li>Dynamic routes (/user/:name)</li>
                    <li>HTML rendering in browser</li>
                    <li>Data handling with Arrays (/students)</li>
                </ul>
            </div>
        </body>
        </html>
    `);
});

// ==========================================
// TASK 1 — Student List Display (GET Only)
// ==========================================
// Route: /students
app.get('/students', (req, res) => {
    // Convert the array into HTML list items
    let studentListHTML = students.map(student => `<li>${student}</li>`).join('');

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Student List</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    padding: 40px; 
                    background-color: #f9f9f9; 
                    display: flex;
                    justify-content: center;
                }
                .card { 
                    background: white; 
                    padding: 30px 50px; 
                    border-radius: 8px; 
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1); 
                }
                h1 { 
                    color: #2c3e50; 
                    border-bottom: 2px solid #e74c3c;
                    padding-bottom: 10px;
                }
                ul { 
                    list-style-type: disc; 
                    padding-left: 20px; 
                    font-size: 20px; 
                    color: #34495e;
                }
                li {
                    margin-bottom: 10px;
                }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>Student List</h1>
                <ul>
                    ${studentListHTML}
                </ul>
            </div>
        </body>
        </html>
    `);
});

// ==========================================
// TASK 2 — Simple Message Routes System
// ==========================================

// Route: /home
app.get('/home', (req, res) => {
    res.send(`
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f0f8ff; height: 100vh; margin: 0; box-sizing: border-box;">
            <h1 style="color: #27ae60; font-size: 3em;">Welcome Home</h1>
            <p style="font-size: 1.2em; color: #555;">This is the home page of our Express application.</p>
        </div>
    `);
});

// Route: /about
app.get('/about', (req, res) => {
    res.send(`
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #fcf3cf; height: 100vh; margin: 0; box-sizing: border-box;">
            <h1 style="color: #2980b9; font-size: 3em;">About Us</h1>
            <p style="font-size: 1.2em; color: #555;">We are learning Full Stack Node.js and Express.js development.</p>
        </div>
    `);
});

// Route: /contact
app.get('/contact', (req, res) => {
    res.send(`
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #fdedec; height: 100vh; margin: 0; box-sizing: border-box;">
            <h1 style="color: #e67e22; font-size: 3em;">Contact Us</h1>
            <p style="font-size: 1.2em; color: #555;">Email us at: <strong>student@university.edu</strong></p>
        </div>
    `);
});

// ==========================================
// TASK 3 — Dynamic User Page
// ==========================================
// Route: /user/:name
app.get('/user/:name', (req, res) => {
    // Extract the dynamic parameter 'name' from the URL
    const userName = req.params.name;

    res.send(`
        <div style="font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #ecf0f1; margin: 0;">
            <div style="background: white; padding: 40px 60px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center;">
                <h1 style="color: #8e44ad; font-size: 3em; margin: 0;">Hello ${userName}</h1>
                <p style="color: #7f8c8d; margin-top: 15px; font-size: 1.2em;">Welcome to your personalized dynamic page!</p>
            </div>
        </div>
    `);
});

// ==========================================
// Server Initialization
// ==========================================
// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`\n==========================================`);
    console.log(`🚀 Server successfully started!`);
    console.log(`👉 Running on http://localhost:${PORT}`);
    console.log(`==========================================\n`);
});
