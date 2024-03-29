import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import MovieCard from '../card/card.component';
import config from '../../.env.local/config';

const Television = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // React-paginate uses 0-based indexing
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${config.baseURL}/tv/popular?api_key=${config.apiKey}&page=${currentPage + 1}` // Increment page number by 1
        );
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className='container'>
      <h2 className='border-bottom pb-3 mt-4'>All TV Shows</h2>
      <div className="row gap-2 mx-auto mt-4">
        {movies.map((item) => (
          <MovieCard
            key={item.id}
            id={item.id}
            imageUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            title={item.title || item.name}
            imdb={item.vote_average}
            buttonText="View More"
            type="tv"
          />
        ))}
      </div>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName="pagination d-flex justify-content-center mt-4 gap-4"
        activeClassName="active"
        previousLabel="<<"
        nextLabel=">>"
      />

    </div>
  );
};

export default Television;
