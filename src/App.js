import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Subscription from './components/Subscription';
import Cart from './components/Cart';

export default function App() {
  // Pull persistent cart state from cache loop instantly on component mount
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('EZTechMovie_Cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [warning, setWarning] = useState('');

  // Sync state modifications automatically to local cache storage
  useEffect(() => {
    localStorage.setItem('EZTechMovie_Cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const isSubscription = product.service.toLowerCase().includes('subscription');
    const existingItem = cart.find(item => item.id === product.id);

    // Core Requirement Validation: Single Subscription Constraint
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
    setWarning(''); // Clear warnings on clean insertions
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    // Safety verification check: prevent hacking subscription quantities via state manipulation
    const targetItem = cart.find(item => item.id === id);
    if (targetItem && targetItem.service.toLowerCase().includes('subscription') && newQuantity > 1) {
      return;
    }

    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Dynamically calculate cumulative item totals for top nav indicator badge
  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#0b0c10', fontFamily: 'Arial, sans-serif', paddingBottom: '40px' }}>
        
        {/* Navigation Layer Shell */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '25px 40px', backgroundColor: '#1f2833', borderBottom: '3px solid #e50914', sticky: 'top', zIndex: 1000 }}>
          <div style={{ color: '#e50914', fontSize: '24px', fontWeight: 'bold', letterSpacing: '0.5px' }}>🎬 EZTechMovie</div>
          <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
            <NavLink to="/" style={({ isActive }) => ({ color: isActive ? '#e50914' : '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px' })}>Watch Tracker</NavLink>
            <NavLink to="/movies" style={({ isActive }) => ({ color: isActive ? '#e50914' : '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px' })}>TMDB Search</NavLink>
            <NavLink to="/marketplace" style={({ isActive }) => ({ color: isActive ? '#e50914' : '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px' })}>Marketplace</NavLink>
            
            <NavLink to="/cart" style={({ isActive }) => ({ color: isActive ? '#e50914' : '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px', position: 'relative', display: 'flex', alignItems: 'center', gap: '6px' })}>
              <span>🛒 Cart</span>
              <span style={{ backgroundColor: '#e50914', color: '#fff', fontSize: '11px', padding: '2px 7px', borderRadius: '10px', fontWeight: 'heavy', minWidth: '14px', textAlign: 'center' }}>
                {totalCartCount}
              </span>
            </NavLink>
          </div>
        </nav>

        {/* Workspace Component Delivery Shell */}
        <div style={{ padding: '30px 20px' }}>
          <Routes>
            <Route path="/" element={<StreamList />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/marketplace" element={<Subscription addToCart={addToCart} warning={warning} />} />
            <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}