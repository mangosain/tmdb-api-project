import React, { useState, useEffect } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import config from '../../.env.local/config';

import './home.styles.css';

const Home = () => {
    const [newMovies, setNewMovies] = useState([]);

    useEffect(() => {
        const fetchNewMovies = async () => {
            try {
                const response = await fetch(`${config.baseURL}/movie/now_playing?api_key=${config.apiKey}`);
                const data = await response.json();
                setNewMovies(data.results);
            } catch (error) {
                console.error('Error fetching new movies:', error);
            }
        };
    
        fetchNewMovies();
    }, []);

    const viewMoviePage = (movieId) => {
        console.log(`Viewing movie page for movie ID: ${movieId}`);
        // Implement logic to navigate to the movie page using React Router, for example:
        // history.push(`/movies/${movieId}`);
      };
    
      const watchTrailer = (movieId) => {
        console.log(`Watching trailer for movie ID: ${movieId}`);
        // Implement logic to open a modal with the trailer, for example:
        // setOpenModal(true);
        // setTrailerUrl(`https://www.youtube.com/watch?v=${trailerId}`);
      };
  
    return (
        <Container fluid>
            <Carousel> {/* Set the height of the carousel container */}
                {newMovies.map(movie => (
                    <Carousel.Item key={movie.id}>
                        <img
                            className="d-block w-100 carousel-image"
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            alt={movie.title}
                        />
                        <Carousel.Caption className='carousel-caption-container invert'>
                            <h1 className='carousel-caption-title'>{movie.title}</h1>
                            <div className="my-2">
                                <button className="mx-2 view-more" onClick={() => viewMoviePage(movie.id)}>View Movie</button>
                                <button className="mx-2 watch-trailer" onClick={() => watchTrailer(movie.id)}>Watch Trailer</button>
                            </div>
                            <p className='carousel-caption-overview'>{movie.overview}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>

    );
}

export default Home;