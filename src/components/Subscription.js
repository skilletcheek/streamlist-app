import React from 'react';
import list from '../data';

export default function Subscription({ addToCart, warning }) {
  return (
    <div style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h2>EZTechMovie Corporate Marketplace</h2>
      </div>
      <p style={{ color: '#aaa', marginBottom: '20px' }}>Select from our premium cloud subscriptions or official enterprise gear.</p>

      {/* Dynamic Conditional Warning Banner */}
      {warning && (
        <div style={{ backgroundColor: '#ffe3e3', color: '#e50914', borderLeft: '5px solid #e50914', padding: '15px', borderRadius: '4px', marginBottom: '25px', fontWeight: 'bold', animation: 'pulse 1.5s infinite' }}>
          ⚠️ {warning}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '25px' }}>
        {list.map(product => {
          const isSub = product.service.toLowerCase().includes('subscription');
          return (
            <div key={product.id} style={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '15px' }}>
              <div style={{ textAlign: 'center', backgroundColor: '#1f2833', padding: '15px', borderRadius: '6px', marginBottom: '15px' }}>
                <img 
  src={product.img} 
  alt={product.service} 
  onError={(e) => {
    e.target.onerror = null; // Prevents infinite execution loops if the fallback fails
    e.target.src = isSub 
      ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80" // Sleek abstract digital asset for subs
      : "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=150&q=80"; // Clean apparel silhouette for gear
  }}
  style={{ height: '100px', objectFit: 'contain', maxWidth: '100%', borderRadius: '4px' }} 
/>
              </div>
              <div>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', tracking: '1px', color: isSub ? '#00ffcc' : '#ffb606', fontWeight: 'bold' }}>
                  {isSub ? 'Subscription Node' : 'Accessory Gear'}
                </span>
                <h4 style={{ margin: '5px 0', fontSize: '18px' }}>{product.service}</h4>
                <p style={{ color: '#aaa', fontSize: '13px', margin: '0 0 15px 0' }}>{product.serviceInfo}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>${product.price.toFixed(2)}</span>
                <button 
                  onClick={() => addToCart(product)}
                  style={{ padding: '8px 16px', backgroundColor: '#e50914', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}