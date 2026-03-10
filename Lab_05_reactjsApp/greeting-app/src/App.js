// App.js – Greeting App
// This is the root component.
// It renders 3 Greeting components with different names, times of day, and background colors.

import React from 'react';
import './App.css';
import Greeting from './components/Greeting';

function App() {
    return (
        <div className="app">
            {/* Page Header */}
            <header className="app-header">
                <h1>👋 Dynamic Greeting App</h1>
                <p className="app-subtitle">React Lab – Task 3: Conditional Rendering</p>
            </header>

            {/* Greetings Container */}
            <div className="greetings-container">

                {/*
          Greeting 1 – Ali in the Morning
          timeOfDay="Morning" → component will render "Good Morning"
          bgColor is the Bonus prop for dynamic background color
        */}
                <Greeting
                    name="Ali"
                    timeOfDay="Morning"
                    bgColor="#f39c12"
                />

                {/*
          Greeting 2 – Sara in the Afternoon
          timeOfDay="Afternoon" → component will render "Good Afternoon"
        */}
                <Greeting
                    name="Sara"
                    timeOfDay="Afternoon"
                    bgColor="#27ae60"
                />

                {/*
          Greeting 3 – Basit in the Evening
          timeOfDay="Evening" → component will render "Good Evening"
        */}
                <Greeting
                    name="Basit"
                    timeOfDay="Evening"
                    bgColor="#8e44ad"
                />

            </div>
        </div>
    );
}

export default App;
