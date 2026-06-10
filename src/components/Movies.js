import React, { useState, useEffect } from 'react';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Replace this with your actual TMDB v3 API Key string
  const TMDB_API_KEY = '493439dbe2b3e5dd7205b81c534c8b2e'; 

  // Fetch trending movies on component mount for an immediate presentation showcase
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("API Error: ", err);
        setLoading(false);
      });
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchQuery)}`)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Search Error: ", err);
        setLoading(false);
      });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
      <h2>Explore Real-Time Media Catalog</h2>
      <p style={{ color: '#aaa' }}>Cross-platform global availability indexes queried directly via TMDB Engine integrations.</p>

      <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for movies across multiple providers..."
          style={{ flexGrow: 1, padding: '12px', borderRadius: '4px', border: '1px solid #333', backgroundColor: '#1a1a1a', color: '#fff' }}
        />
        <button type="submit" style={{ padding: '12px 24px', backgroundColor: '#e50914', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Search API
        </button>
      </form>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#e50914' }}>Querying TMDB Data Matrix...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {movies.map(movie => (
            <div key={movie.id} style={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <img 
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster+Available'} 
                alt={movie.title}
                style={{ width: '100%', height: '280px', objectFit: 'cover' }}
              />
              <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>{movie.title}</h4>
                <div>
                  <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '5px' }}>Released: {movie.release_date || 'N/A'}</div>
                  <div style={{ fontSize: '13px', color: '#ffb606', fontWeight: 'bold' }}>⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : '0.0'}/10</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}