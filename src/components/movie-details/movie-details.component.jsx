import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Modal } from 'react-bootstrap';
import config from '../../config/config';

import './movie-details.styles.css';
import MovieCard from '../card/card.component';

const MovieDetails = () => {
    const id = new URLSearchParams(window.location.search).get('id');
    const type = new URLSearchParams(window.location.search).get('type');

    // Fetch movie details
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

    //Fetch Trailer
    const [trailers, setTrailers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTrailer, setSelectedTrailer] = useState(null);

    useEffect(() => {
      const fetchTrailers = async () => {
        try {
          const response = await fetch(`${config.baseURL}/${type}/${id}/videos?api_key=${config.apiKey}`);
          const data = await response.json();
          setTrailers(data.results.filter(video => video.type === 'Trailer'));
        } catch (error) {
          console.error('Error fetching trailers:', error);
        }
      };

      fetchTrailers();
    }, [id, type]);

    const handleModal = (trailerKey) => {
      setSelectedTrailer(trailerKey);
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setSelectedTrailer(null);
      setShowModal(false);
    };

    // Fetch similar movies
    const [similarMovies, setSimilarMovies] = useState([]);
    useEffect(() => {
      const fetchSimilarMovies = async () => {
        try {
          const response = await fetch(`${config.baseURL}/${type}/${id}/similar?api_key=${config.apiKey}`);
          const data = await response.json();
          setSimilarMovies(data.results.slice(0, 4));
        } catch (error) {
          console.error('Error fetching similar movies:', error);
        }
      };

      fetchSimilarMovies();
    }, [id, type]);
  
    if (!movieDetails) {
      return <div className='container'>
        <h1 className=''>Loading...</h1>
      </div>;
    }
    
    return (
        <div className="movie-details">
          <div className="backdrop p-2" style={{ backgroundImage: `linear-gradient(to bottom, rgba(51, 51, 51, 0.4), rgba(51, 51, 51, 1)), url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})` }}>
            <Container className='main-info p-2 rounded-5 mt-3'>
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
                  <div className='d-flex gap-2'>
                    {trailers.map(trailer => (
                      <Button key={trailer.key} onClick={() => handleModal(trailer.key)}>Trailer</Button>
                    ))}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <Container className='mt-4'>
            <h2 className='border-bottom pb-2'>Similar Movies</h2>
            <Row className='gap-5'>
              {similarMovies.map(movie => (
                <MovieCard
                  key={movie.id}
                  imageUrl={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=Image+Not+Found'}
                  title={movie.title || movie.name}
                  buttonText="View Details"
                  imdb={movie.vote_average}
                  id={movie.id}
                  type={type === 'movie' ? 'movie' : 'tv'}
                />
              ))}
            </Row>
          </Container>

          <Modal show={showModal} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Watch Trailer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedTrailer && (
                <iframe
                  title="Trailer"
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${selectedTrailer}`}
                  frameBorder="0"
                  allowFullScreen
                />
              )}
            </Modal.Body>
          </Modal>
        </div>
      );
}

export default MovieDetails;