// App.js - User Form App Root Component
import React from 'react';
import UserForm from './components/UserForm';
import './App.css';

function App() {
    return (
        <div className="App">
            <h1 className="app-title">📋 User Form Application</h1>
            <UserForm />
        </div>
    );
}

export default App;
