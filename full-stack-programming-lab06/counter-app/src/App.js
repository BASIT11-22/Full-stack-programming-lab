// App.js - Counter App Root Component
import React from 'react';
import Counter from './components/Counter';
import './App.css';

function App() {
    return (
        <div className="App">
            <h1 className="app-title">⚡ Counter Application</h1>
            <Counter />
        </div>
    );
}

export default App;
