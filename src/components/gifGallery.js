import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const GifGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalGifs, setTotalGifs] = useState(0);
  const GIFS_PER_PAGE = 20;

  const API_KEY = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65';

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favoriteId) => favoriteId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const searchGifs = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${API_KEY}&limit=${GIFS_PER_PAGE}&offset=${currentPage * GIFS_PER_PAGE}`
      );

      setGifs(response.data.data);
      setTotalGifs(response.data.pagination.total_count);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm !== '') {
      searchGifs();
    }
  }, [currentPage]);

  const handlePageClick = (data) => {
    let selected = data.selected;
    setCurrentPage(selected);
  };

  const totalPages = Math.min(5, Math.ceil(totalGifs / GIFS_PER_PAGE));

  return (
    <div className="gif-page">
      <div className='gifGalleryContainer'>
        <div className='searchContainer'>
          <input
            type="text"
            className='search-box'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder=' 🔍 Search any kind of gifs here...'
          />
          <button onClick={searchGifs} disabled={loading} className='search-btn'>
            Search
          </button>
        </div>

        {loading && <p>Loading...</p>}
        <div className='gifContainer'>
  {gifs.map((gif) => (
    <div key={gif.id} className='gifItem'>
  <img
    src={gif.images.fixed_height.url}
    alt={gif.title}
    className='gifImage'
  />
  <div className='gifDetails'>
    <p className='gifTitle'>{gif.title}</p>
    <button onClick={() => toggleFavorite(gif.id)} className='favoriteButton'>
  <FontAwesomeIcon color='red' fontSize={24} icon={favorites.includes(gif.id) ? solidHeart : regularHeart} />
</button>
  </div>
  <p className='gifAuthor'>@{gif.username}</p>
</div>

  ))}
</div>


        {gifs.length > 0 && (
          <div className='paginationContainer'>
<Paginate
  previousLabel={'Previous'}
  nextLabel={'Next'}
  breakLabel={'...'}
  breakClassName={'break-me'}
  pageCount={totalPages}
  marginPagesDisplayed={2}
  onPageChange={handlePageClick}
  containerClassName={'pagination'}
  subContainerClassName={'pages pagination'}
  activeClassName={'active'}
/>

          </div>
        )}
      </div>
    </div>
  );
};

export default GifGallery;
