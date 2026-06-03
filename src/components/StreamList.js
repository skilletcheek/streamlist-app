import React, { useState } from 'react';
import '../styles/StreamList.css';

function StreamList() {
  // --- STATE VARIABLES ---
  const [userInput, setUserInput] = useState('');
  const [streamList, setStreamList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // --- COMPONENT HANDLERS ---
  
  // Appends input text string to the primary array list
  const handleAddItem = (e) => {
    e.preventDefault();
    if (userInput.trim() === '') return;

    const newItem = {
      id: Date.now(), // Unique identifier hook for DOM list rendering
      title: userInput.trim(),
      isCompleted: false,
    };

    setStreamList([...streamList, newItem]);
    setUserInput(''); // CRITERIA MET: Auto-clears the text input box immediately upon submit
  };

  // Filters out specific items by checking their ID signatures
  const handleDeleteItem = (id) => {
    setStreamList(streamList.filter((item) => item.id !== id));
  };

  // Modifies specific item properties to switch completion styling rules
  const handleToggleComplete = (id) => {
    setStreamList(
      streamList.map((item) => 
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  // Switches item row view state into an editable input configuration
  const handleStartEdit = (id, currentTitle) => {
    setEditingId(id);
    setEditingText(currentTitle);
  };

  // Saves modified text inputs back into the tracking state variable array
  const handleSaveEdit = (id) => {
    if (editingText.trim() === '') return;
    setStreamList(
      streamList.map((item) => 
        item.id === id ? { ...item, title: editingText.trim() } : item
      )
    );
    setEditingId(null);
    setEditingText('');
  };

  return (
    <div className="streamlist-viewport">
      <header className="viewport-header">
        <h1>Your Cloud StreamList</h1>
        <p>Dynamically manage, modify, and track your streaming watchlists in real-time.</p>
      </header>
      
      {/* Input Form Section */}
      <div className="form-card">
        <form onSubmit={handleAddItem} className="input-aggregation-form">
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Enter movie, series, or program title..." 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="text-input-field"
            />
            <button type="submit" className="submit-action-button">
              <span className="material-icons">add</span> Add Title
            </button>
          </div>
        </form>
      </div>

      {/* Dynamic List Rendering Area */}
      <div className="list-container">
        {streamList.length === 0 ? (
          <p className="empty-notice">No entries added to your tracking matrix yet. Add titles above.</p>
        ) : (
          <ul className="interactive-list">
            {streamList.map((item) => (
              <li key={item.id} className={`list-item-card ${item.isCompleted ? 'completed-state' : ''}`}>
                
                {editingId === item.id ? (
                  /* INLINE EDIT MODE RENDER VIEW */
                  <div className="edit-mode-container">
                    <input 
                      type="text" 
                      value={editingText} 
                      onChange={(e) => setEditingText(e.target.value)}
                      className="edit-input-field"
                    />
                    <button onClick={() => handleSaveEdit(item.id)} className="icon-btn save-btn" title="Save Changes">
                      <span className="material-icons">save</span>
                    </button>
                    <button onClick={() => setEditingId(null)} className="icon-btn cancel-btn" title="Cancel Edit">
                      <span className="material-icons">close</span>
                    </button>
                  </div>
                ) : (
                  /* STANDARD ACTIVE DATA RENDER VIEW */
                  <>
                    <span className="item-title-text">
                      {item.title}
                    </span>
                    
                    <div className="item-actions-cluster">
                      <button 
                        onClick={() => handleToggleComplete(item.id)} 
                        className={`icon-btn complete-btn ${item.isCompleted ? 'active' : ''}`}
                        title={item.isCompleted ? "Mark Incomplete" : "Mark Complete"}
                      >
                        <span className="material-icons">
                          {item.isCompleted ? "check_circle" : "radio_button_unchecked"}
                        </span>
                      </button>
                      
                      <button 
                        onClick={() => handleStartEdit(item.id, item.title)} 
                        className="icon-btn edit-btn"
                        title="Edit Title"
                        disabled={item.isCompleted}
                      >
                        <span className="material-icons">edit</span>
                      </button>
                      
                      <button 
                        onClick={() => handleDeleteItem(item.id)} 
                        className="icon-btn delete-btn"
                        title="Delete Entry"
                      >
                        <span className="material-icons">delete_forever</span>
                      </button>
                    </div>
                  </>
                )}
                
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default StreamList;