import React, { useState, useEffect } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import config from '../../.env.local/config';
import { useNavigate } from 'react-router-dom';

import './home.styles.css';

const Home = () => {
    const [trendingItems, setTrendingItems] = useState([]);

    useEffect(() => {
        const fetchTrendingItems = async () => {
        try {
            const response = await fetch(`${config.baseURL}/trending/all/week?api_key=${config.apiKey}`);
            const data = await response.json();
            setTrendingItems(data.results);
        } catch (error) {
            console.error('Error fetching trending items:', error);
        }
        };

        fetchTrendingItems();
    }, []);

    const navigate = useNavigate();

    const viewMore = (mediaId, mediaType) => {
        // Route to the movie or TV show details page
        navigate(`/movie-details?id=${encodeURIComponent(mediaId)}&type=${encodeURIComponent(mediaType)}`);
    };
    
    const watchTrailer = (movieId) => {
    console.log(`Watching trailer for movie ID: ${movieId}`);
    // Implement logic to open a modal with the trailer, for example:
    // setOpenModal(true);
    // setTrailerUrl(`https://www.youtube.com/watch?v=${trailerId}`);
    };
  
    return (
        <Container fluid>
            <Carousel className='carousel-container'>
                {trendingItems.map(item => (
                <Carousel.Item key={item.id}>
                    <img
                    className="d-block w-100 carousel-image"
                    src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                    alt={item.title || item.name} // Use title for movies and name for TV shows
                    />
                    <Carousel.Caption className='carousel-caption-container invert'>
                    <h1 className='carousel-caption-title'>{item.title || item.name}</h1>
                    <div className="my-2">
                        <button className="mx-2 view-more" onClick={() => viewMore(item.id, item.media_type)}>View More</button>
                        <button className="mx-2 watch-trailer" onClick={() => watchTrailer(item)}>Watch Trailer</button>
                    </div>
                    <p className='carousel-caption-overview'>{item.overview}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
}

export default Home;