import React, { useState, useEffect } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import config from '../../.env.local/config';
import { useNavigate } from 'react-router-dom';

import './home.styles.css';
import MovieCard from '../card/card.component';
import Footer from '../footer/footer.component';

const initialState = {
    trendingItems: [],
    popularMovies: [],
    nowPlayingMovies: [],
};

const Home = () => {
    const [movieState, setMovieState] = useState(initialState);
    useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch trending movies and TV shows
            const trendingResponse = await fetch(`${config.baseURL}/trending/all/week?api_key=${config.apiKey}`);
            const trendingData = await trendingResponse.json();
    
            // Fetch popular movies
            const popularMoviesResponse = await fetch(`${config.baseURL}/movie/popular?api_key=${config.apiKey}`);
            const popularMoviesData = await popularMoviesResponse.json();

            //Fetch Now Playing movies
            const nowPlayingResponse = await fetch(`${config.baseURL}/movie/now_playing?api_key=${config.apiKey}`);
            const nowPLayingData = await nowPlayingResponse.json();

            // Set state with fetched data
            setMovieState({
              trendingItems: trendingData.results,
              popularMovies: popularMoviesData.results.slice(10, 14),
              nowPlayingMovies: nowPLayingData.results.slice(0,4),
            });
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    const navigate = useNavigate();
    const viewMore = (mediaId, mediaType) => {
        navigate(`/movie-details?id=${encodeURIComponent(mediaId)}&type=${encodeURIComponent(mediaType)}`);
    };
    
    const watchTrailer = (movieId) => {
    console.log(`Watching trailer for movie ID: ${movieId}`);
        //Modal for trailer here. Will do later
    };
  
    return (
        <div>
            <Container fluid>
                <Carousel className='carousel-container'>
                    {movieState.trendingItems.map(item => (
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
                        <p className='carousel-caption-overview d-none d-md-inline'>{item.overview}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    ))}
                </Carousel>
            </Container>

            <Container fuild className='d-flex flex-wrap justify-content-center mt-5'>
                <div className='d-flex justify-content-between align-items-baseline w-100 border-bottom mb-5'>
                    <h3 className='heading'>Popular</h3>
                    <span onClick={() => {}}>See all</span>
                </div>
                <div className='d-flex flex-wrap justify-content-center gap-5'>
                    {movieState.popularMovies.map(item => (
                    <MovieCard
                        key={item.id}
                        id={item.id}
                        imageUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        title={item.title || item.name}
                        imdb={item.vote_average}
                        buttonText='View More'
                        type='movie'
                    />
                    ))}
                </div>
            </Container>

            <Container fuild className='d-flex flex-wrap justify-content-center mt-5'>
                <div className='d-flex justify-content-between align-items-baseline w-100 border-bottom mb-5'>
                    <h3 className='heading'>In Theatres</h3>
                    <span onClick={() => {}}>See all</span>
                </div>
                <div className='d-flex flex-wrap justify-content-center gap-4 gap-lg-5'>
                    {movieState.nowPlayingMovies.map(item => (
                    <MovieCard
                        key={item.id}
                        id={item.id}
                        imageUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        title={item.title || item.name}
                        imdb={item.vote_average}
                        buttonText='View More'
                        onViewMore={viewMore}
                        type='movie'
                    />
                    ))}
                </div>
            </Container>

            <Footer />
        </div>
    );
}

export default Home;