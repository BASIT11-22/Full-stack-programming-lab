// App.js - Event App Root Component
import React from 'react';
import Actions from './components/Actions';
import './App.css';

function App() {
    return (
        <div className="App">
            <h1 className="app-title">🎯 Event Handling Application</h1>
            <Actions />
        </div>
    );
}

export default App;
