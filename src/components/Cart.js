import React, { useMemo } from 'react';

export default function Cart({ cart, updateQuantity, removeFromCart }) {
  // AI Refactor: Memoizing the subtotal computation to optimize CPU processing cycles
  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
      <h2>Your Consolidated Statement Cart</h2>
      <p style={{ color: '#aaa', marginBottom: '30px' }}>Review, adjust, or finalize your pending operational allocation access queues.</p>

      {cart.length === 0 ? (
        <div style={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '8px', padding: '40px', textAlign: 'center', color: '#666' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🛒</div>
          <h3>Your cart buffer space is currently empty.</h3>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
            {cart.map(item => {
              const isSub = item.service.toLowerCase().includes('subscription');
              return (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#111', border: '1px solid #222', borderRadius: '8px', padding: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
                    <img src={item.img} alt={item.service} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{item.service}</h4>
                      <span style={{ color: '#aaa', fontSize: '14px' }}>${item.price.toFixed(2)} each</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginRight: '30px' }}>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{ width: '28px', height: '28px', backgroundColor: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={isSub}
                      style={{ width: '28px', height: '28px', backgroundColor: isSub ? '#333' : '#222', color: isSub ? '#666' : '#fff', border: '1px solid #444', borderRadius: '4px', cursor: isSub ? 'not-allowed' : 'pointer' }}
                    >
                      +
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', minWidth: '80px', textAlign: 'right' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#e50914', cursor: 'pointer', fontWeight: 'bold' }}>
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ backgroundColor: '#1f2833', border: '1px solid #45f3ff', borderRadius: '8px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#aaa', textTransform: 'uppercase', fontSize: '12px' }}>Total Statement Price</span>
              <h3 style={{ margin: '5px 0 0 0', fontSize: '28px', color: '#45f3ff' }}>${totalPrice.toFixed(2)}</h3>
            </div>
            <button style={{ padding: '12px 28px', backgroundColor: '#e50914', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
              Finalize Allocation Purchase
            </button>
          </div>
        </div>
      )}
    </div>
  );
}