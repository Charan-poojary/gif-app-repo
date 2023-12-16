import React, { useState } from 'react';
import axios from 'axios';

const GifGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65';

  const searchGifs = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${API_KEY}&limit=10`
      );

      setGifs(response.data.data);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>GIF Gallery</h2>

      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={searchGifs} disabled={loading}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {gifs.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.fixed_height.url}
            alt={gif.title}
            style={{ margin: '5px', maxWidth: '200px', maxHeight: '200px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default GifGallery;
