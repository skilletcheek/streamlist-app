import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Subscription from './components/Subscription';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

export default function App() {
  // Authentication Guard State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('EZTechMovie_Auth') === 'true';
  });

  // Persistent shopping cart state
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('EZTechMovie_Cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [warning, setWarning] = useState('');

  useEffect(() => {
    localStorage.setItem('EZTechMovie_Cart', JSON.stringify(cart));
  }, [cart]);

  const handleLogin = () => {
    localStorage.setItem('EZTechMovie_Auth', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('EZTechMovie_Auth');
    setIsLoggedIn(false);
  };

  const addToCart = (product) => {
    const isSubscription = product.service.toLowerCase().includes('subscription');
    const existingItem = cart.find(item => item.id === product.id);

    if (isSubscription && existingItem) {
      setWarning(`System Constrained Policy Error: You are restricted from adding multiple quantities of the "${product.service}" simultaneously.`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setWarning('');
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const targetItem = cart.find(item => item.id === id);
    if (targetItem && targetItem.service.toLowerCase().includes('subscription') && newQuantity > 1) {
      return;
    }
    setCart(cart.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Authentication Redirect Shield Component
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#0b0c10', fontFamily: 'Arial, sans-serif', paddingBottom: '40px', color: '#fff' }}>
        
        {isLoggedIn && (
          <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '25px 40px', backgroundColor: '#1f2833', borderBottom: '3px solid #e50914', sticky: 'top', zIndex: 1000 }}>
            <div style={{ color: '#e50914', fontSize: '24px', fontWeight: 'bold' }}>🎬 EZTechMovie</div>
            <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
              <NavLink to="/" style={({ isActive }) => ({ color: isActive ? '#e50914' : '#fff', textDecoration: 'none', fontWeight: 'bold' })}>Watch Tracker</NavLink>
              <NavLink to="/movies" style={({ isActive }) => ({ color: isActive ? '#e50914' : '#fff', textDecoration: 'none', fontWeight: 'bold' })}>TMDB Search</NavLink>
              <NavLink to="/marketplace" style={({ isActive }) => ({ color: isActive ? '#e50914' : '#fff', textDecoration: 'none', fontWeight: 'bold' })}>Marketplace</NavLink>
              <NavLink to="/cart" style={({ isActive }) => ({ color: isActive ? '#e50914' : '#fff', textDecoration: 'none', fontWeight: 'bold', position: 'relative', display: 'flex', alignItems: 'center', gap: '6px' })}>
                <span>🛒 Cart</span>
                <span style={{ backgroundColor: '#e50914', color: '#fff', fontSize: '11px', padding: '2px 7px', borderRadius: '10px' }}>{totalCartCount}</span>
              </NavLink>
              <button onClick={handleLogout} style={{ backgroundColor: 'transparent', border: '1px solid #e50914', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
            </div>
          </nav>
        )}

        <div style={{ padding: '30px 20px' }}>
          <Routes>
            {/* Login Route */}
            <Route path="/login" element={
              isLoggedIn ? <Navigate to="/" replace /> : (
                <div style={{ maxWidth: '400px', margin: '100px auto', padding: '40px', backgroundColor: '#1f2833', borderRadius: '8px', textAlign: 'center', border: '1px solid #333' }}>
                  <h2 style={{ color: '#e50914', marginBottom: '20px' }}>🎬 EZTechMovie Portals</h2>
                  <p style={{ color: '#c5a059', fontSize: '14px', marginBottom: '30px' }}>Enterprise Identity Single Sign-On Mandate</p>
                  <button onClick={handleLogin} style={{ width: '100%', padding: '12px', backgroundColor: '#e50914', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>
                    Sign In with Google OAuth
                  </button>
                </div>
              )
            } />

            {/* Protected Application Nodes */}
            <Route path="/" element={<ProtectedRoute><StreamList /></ProtectedRoute>} />
            <Route path="/movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
            <Route path="/marketplace" element={<ProtectedRoute><Subscription addToCart={addToCart} warning={warning} /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}