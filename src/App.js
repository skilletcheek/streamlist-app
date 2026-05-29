import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Persistent Global Header and Navigation Menu */}
        <Navigation />
        
        {/* Declarative Viewport Switching Interface */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<StreamList />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        
        {/* Persistent Global Corporate Footer */}
        <footer className="global-footer">
          <p>&copy; 2026 EZTechMovie. All Rights Reserved. HQ & Data Center: San Diego, CA.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;