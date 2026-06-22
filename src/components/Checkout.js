import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const navigate = useNavigate();
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Auto-formats input values into explicit "1234 5678 9012 3456" spacing patterns
  const handleCardChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, ''); // Clear all non-numeric chars
    const trimmedValue = rawValue.substring(0, 16); // Set strict maximum ceiling boundary
    
    // Group digits into sets of four chunks separated by strings
    const formatedChunks = trimmedValue.match(/.{1,4}/g);
    setCardNumber(formatedChunks ? formatedChunks.join(' ') : '');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const rawDigits = cardNumber.replace(/\s/g, '');
    if (rawDigits.length !== 16) {
      alert("Invalid Entry: Credit card entries must exactly match the 16-digit spacing structure.");
      return;
    }

    const paymentPayload = {
      cardName,
      encryptedLastFour: rawDigits.substring(12),
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('EZTechMovie_PaymentConfig', JSON.stringify(paymentPayload));
    setSuccessMsg('Payment Configuration Captured Securely! Data synced to localStorage.');
    
    setTimeout(() => {
      setSuccessMsg('');
      navigate('/');
    }, 3000);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '35px', backgroundColor: '#1f2833', borderRadius: '8px', border: '1px solid #333' }}>
      <h2 style={{ color: '#e50914', marginBottom: '5px' }}>💳 Secure Billing Manager</h2>
      <p style={{ color: '#999', fontSize: '13px', marginBottom: '25px' }}>PCI DSS Compliant Interface Simulation</p>

      {successMsg && (
        <div style={{ backgroundColor: '#0f5132', color: '#badbcc', padding: '12px', borderRadius: '4px', marginBottom: '20px', fontSize: '14px', fontWeight: 'bold' }}>
          {successMsg}
        </div>
      )}

      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', color: '#999', fontWeight: 'bold' }}>CARDHOLDER NAME</label>
          <input type="text" required value={cardName} onChange={(e) => setCardName(e.target.value)} style={{ padding: '12px', backgroundColor: '#0b0c10', border: '1px solid #444', borderRadius: '4px', color: '#fff', fontSize: '15px' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', color: '#999', fontWeight: 'bold' }}>CREDIT CARD NUMBER</label>
          <input type="text" required placeholder="1234 5678 9012 3456" value={cardNumber} onChange={handleCardChange} style={{ padding: '12px', backgroundColor: '#0b0c10', border: '1px solid #444', borderRadius: '4px', color: '#fff', fontSize: '15px', letterSpacing: '1px' }} />
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
            <label style={{ fontSize: '13px', color: '#999', fontWeight: 'bold' }}>EXPIRY DATE</label>
            <input type="text" required placeholder="MM/YY" maxLength="5" value={expiry} onChange={(e) => setExpiry(e.target.value)} style={{ padding: '12px', backgroundColor: '#0b0c10', border: '1px solid #444', borderRadius: '4px', color: '#fff', fontSize: '15px', textAlign: 'center' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
            <label style={{ fontSize: '13px', color: '#999', fontWeight: 'bold' }}>CVV SECURITY CODE</label>
            <input type="password" required placeholder="***" maxLength="3" value={cvv} onChange={(e) => setCvv(e.target.value)} style={{ padding: '12px', backgroundColor: '#0b0c10', border: '1px solid #444', borderRadius: '4px', color: '#fff', fontSize: '15px', textAlign: 'center' }} />
          </div>
        </div>

        <button type="submit" style={{ marginTop: '15px', padding: '14px', backgroundColor: '#e50914', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
          Save Financial Profile
        </button>
      </form>
    </div>
  );
}