import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import config from '../../.env.local/config';

import './movie-details.styles.css';

const MovieDetails = () => {
    const id = new URLSearchParams(window.location.search).get('id');
    const type = new URLSearchParams(window.location.search).get('type');

    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
      const fetchMovieDetails = async () => {
        try {
            let response;
          if (type === 'movie') {
            response = await fetch(`${config.baseURL}/movie/${id}?api_key=${config.apiKey}`);
          } else {
            response = await fetch(`${config.baseURL}/tv/${id}?api_key=${config.apiKey}`);
          }
          const data = await response.json();
          setMovieDetails(data);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      };
  
      fetchMovieDetails();
    }, [id, type]);
  
    if (!movieDetails) {
      return <div>Loading...</div>;
    }
    
    return (
        <div className="movie-details">
          <div className="backdrop p-2" style={{ backgroundImage: `linear-gradient(to bottom, rgba(51, 51, 51, 0.4), rgba(51, 51, 51, 1)), url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})` }}>
            <Container className='main-info p-2 rounded-5'>
              <Row>
                <Col xs={12} md={6}>
                  <Image src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} fluid className='rounded-5' />
                </Col>
                <Col xs={12} md={6} className='d-flex flex-column align-items-start justify-content-center mt-3 px-3 m-md-0'>
                  <h1 className='display-2'>
                    {
                        type === 'movie' ? movieDetails.title : movieDetails.name
                    }
                  </h1>
                   <p className='lead'>{
                    type === 'movie' ? movieDetails.tagline + ' | ' + movieDetails.runtime + ' minutes' : ''
                   }</p>
                  <p className='lead'><span className='heading'>Genres:</span> {movieDetails.genres.map(genre => genre.name).join(' | ')}</p>
                  <p className='lead'><span className='heading'>Synopsis:</span> {movieDetails.overview}</p>
                  <p className='lead'><span className='heading'>Popularity: </span>{movieDetails.popularity} &nbsp; | &nbsp; <span className='heading'>Release Date:</span> {
                    type === 'movie' ? movieDetails.release_date : movieDetails.first_air_date
                  }</p>
                  <p className='display-6'><span className='heading'>IMDB</span>: {movieDetails.vote_average} / 10</p>
                </Col>
              </Row>
            </Container>
          </div>
          <Container>
            <Row>
              <Col>
                <h2>Cast</h2>
                <h2>{type}</h2>
                {/* Render actors here */}
              </Col>
            </Row>
          </Container>
        </div>
      );
}

export default MovieDetails;