// App.js – Student Card App
// This is the root component of the application.
// It imports the StudentCard component and renders 3 cards with different student data.

import React from 'react';
import './App.css';
import StudentCard from './components/StudentCard';

function App() {
    return (
        <div className="app">
            {/* Page Header */}
            <header className="app-header">
                <h1>🎓 Student Information Cards</h1>
                <p className="app-subtitle">React Lab – Task 1: Props & Components</p>
            </header>

            {/* Cards Container – holds all StudentCard components */}
            <div className="cards-container">

                {/*
          StudentCard 1 – Ali
          Props: name, rollNo, department, university, color (Bonus)
        */}
                <StudentCard
                    name="Ali"
                    rollNo="2023-SE-01"
                    department="Software Engineering"
                    university="Air University"
                    color="#e74c8b"
                />

                {/*
          StudentCard 2 – Musharaf
          A different color is passed to demonstrate the bonus color prop
        */}
                <StudentCard
                    name="Musharaf"
                    rollNo="2023-AI-15"
                    department="AI & ML"
                    university="Air University"
                    color="#2ecc71"
                />

                {/*
          StudentCard 3 – Basit
          Each card has unique information and a unique background color
        */}
                <StudentCard
                    name="Basit"
                    rollNo="232001"
                    department="Computer Science"
                    university="Air University"
                    color="#9b59b6"
                />

            </div>
        </div>
    );
}

export default App;
