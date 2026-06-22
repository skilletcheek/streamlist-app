import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart({ cart, updateQuantity, removeFromCart }) {
  const navigate = useNavigate();

  // Calculate total price based on cart items
  const totalCartPrice = cart.reduce((total, item) => {
    const price = item.price ? parseFloat(item.price) : 0;
    return total + (price * item.quantity);
  }, 0);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ color: '#e50914', marginBottom: '25px' }}>🛒 Your Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <div style={{ backgroundColor: '#1f2833', padding: '30px', borderRadius: '8px', textAlign: 'center', border: '1px solid #333' }}>
          <p style={{ color: '#999', fontSize: '16px', margin: 0 }}>Your cart is currently empty.</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {cart.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1f2833', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', color: '#fff', fontSize: '18px' }}>{item.service || item.title}</h4>
                  <p style={{ margin: 0, color: '#c5a059', fontWeight: 'bold' }}>${item.price} / mo</p>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#0b0c10', borderRadius: '4px', border: '1px solid #444' }}>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', padding: '8px 12px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      -
                    </button>
                    <span style={{ color: '#fff', padding: '0 10px', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', padding: '8px 12px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{ backgroundColor: 'transparent', border: '1px solid #e50914', color: '#e50914', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#1f2833', borderRadius: '8px', border: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '18px', color: '#999', fontWeight: 'bold' }}>ESTIMATED TOTAL:</span>
            <span style={{ fontSize: '24px', color: '#e50914', fontWeight: 'bold' }}>${totalCartPrice.toFixed(2)} / mo</span>
          </div>
          
          <div style={{ marginTop: '30px', textAlign: 'right' }}>
            <button 
              onClick={() => navigate('/checkout')}
              style={{ padding: '14px 35px', backgroundColor: '#e50914', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}
            >
              Proceed to Checkout ➔
            </button>
          </div>
        </>
      )}
    </div>
  );
}