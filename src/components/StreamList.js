import React, { useState } from 'react';
import '../styles/StreamList.css';

function StreamList() {
  const [inputValue, setInputValue] = useState('');

  // Explicitly traps form execution to prevent default DOM browser reloads
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // Fulfills exact baseline requirements: input redirection directly to developer console
    console.log("EZTechMovie User Form Submission Capture:", inputValue);
    
    // Resets localized input state capture cache
    setInputValue('');
  };

  return (
    <div className="streamlist-viewport">
      <header className="viewport-header">
        <h1>Create Your Cloud StreamList</h1>
        <p>Compile and manage your customized operational watchlists below.</p>
      </header>
      
      <div className="form-card">
        <form onSubmit={handleFormSubmit} className="input-aggregation-form">
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Enter movie, series, or program title..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="text-input-field"
            />
            <button type="submit" className="submit-action-button">
              Add To Console
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StreamList;