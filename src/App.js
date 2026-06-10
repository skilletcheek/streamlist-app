import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import StreamList from './components/StreamList';
import Movies from './components/Movies';

export default function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#0b0c10', fontFamily: 'Arial, sans-serif' }}>
        {/* Navigation Shell */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', backgroundColor: '#1f2833' }}>
          <div style={{ color: '#e50914', fontSize: '24px', fontWeight: 'bold' }}>🎬 EZTechMovie</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <NavLink to="/" style={({ isActive }) => ({ color: isActive ? '#e50914' : '#fff', textDecoration: 'none', fontWeight: 'bold' })}>StreamList</NavLink>
            <NavLink to="/movies" style={({ isActive }) => ({ color: isActive ? '#e50914' : '#fff', textDecoration: 'none', fontWeight: 'bold' })}>Movies</NavLink>
          </div>
        </nav>

        {/* View Layout Payload Area */}
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<StreamList />} />
            <Route path="/movies" element={<Movies />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}