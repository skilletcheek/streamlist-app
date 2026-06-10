import React, { useState, useEffect } from 'react';

export default function StreamList() {
  // Initialize state by checking localStorage first; fallback to empty array if empty
  const [inputVal, setInputVal] = useState('');
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('EZTechMovie_StreamList');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [editingId, setEditingId] = useState(null);
  const [editVal, setEditVal] = useState('');

  // Automatically write to localStorage whenever the items state array changes
  useEffect(() => {
    localStorage.setItem('EZTechMovie_StreamList', JSON.stringify(items));
  }, [items]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newItem = {
      id: Date.now(),
      title: inputVal,
      completed: false
    };

    setItems([...items, newItem]);
    setInputVal('');
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleToggleComplete = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const startEdit = (id, currentTitle) => {
    setEditingId(id);
    setEditVal(currentTitle);
  };

  const handleSaveEdit = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, title: editVal } : item
    ));
    setEditingId(null);
    setEditVal('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', color: '#fff' }}>
      <h2>Create Your Cloud StreamList</h2>
      
      <form onSubmit={handleAddItem} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Enter movie, series, or program title..."
          style={{ flexGrow: 1, padding: '10px', borderRadius: '4px', border: '1px solid #333', backgroundColor: '#1a1a1a', color: '#fff' }}
        />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#e50914', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add To Console
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'between', backgroundColor: '#111', padding: '15px', borderRadius: '6px', border: '1px solid #222', opacity: item.completed ? 0.5 : 1 }}>
            
            {editingId === item.id ? (
              <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                <input 
                  type="text" 
                  value={editVal} 
                  onChange={(e) => setEditVal(e.target.value)}
                  style={{ flexGrow: 1, padding: '5px', backgroundColor: '#222', color: '#fff', border: '1px solid #444' }}
                />
                <button onClick={() => handleSaveEdit(item.id)} style={{ color: '#00ff00', background: 'none', border: 'none', cursor: 'pointer' }}>Save</button>
                <button onClick={() => setEditingId(null)} style={{ color: '#ff0000', background: 'none', border: 'none', cursor: 'pointer' }}>Cancel</button>
              </div>
            ) : (
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <span 
                  onClick={() => handleToggleComplete(item.id)} 
                  style={{ textDecoration: item.completed ? 'line-through' : 'none', cursor: 'pointer', flexGrow: 1 }}
                >
                  {item.title}
                </span>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button onClick={() => startEdit(item.id, item.title)} style={{ color: '#aaa', background: 'none', border: 'none', cursor: 'pointer' }}>✏️ Edit</button>
                  <button onClick={() => handleDeleteItem(item.id)} style={{ color: '#e50914', background: 'none', border: 'none', cursor: 'pointer' }}>🗑️ Delete</button>
                </div>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}