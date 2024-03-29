import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import config from '../../.env.local/config';
import { useLocation } from 'react-router-dom';
import MovieCard from '../card/card.component';


const SearchResults = () => {
    const searchQuery = new URLSearchParams(window.location.search).get('q');

    const location = useLocation();

    if(location.pathname === '/search-results') {
        location.pathname = `/search-results?q=${searchQuery}`;
    }

    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
        try {
            const response = await fetch(`${config.baseURL}/search/multi?api_key=${config.apiKey}&query=${searchQuery}`);
            const data = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
        };

        if (searchQuery) {
            fetchSearchResults();
        }

        
    }, [searchQuery]);

    return (
        <Container>
            <h2 className="mt-3 mb-4 border-bottom pb-2">Search Results for "{searchQuery}"</h2>
            <Row xs={1} sm={2} md={3} lg={4} className="gap-5 mx-auto">
                {
                    searchResults.length === 0 ? 'No results found' : 
                    searchResults.map(item => (
                        <MovieCard
                            key={item.id}
                            imageUrl={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/500x750?text=Image+Not+Found'}
                            title={item.title || item.name}
                            buttonText="View Details"
                            imdb={item.vote_average}
                            type={item.media_type}
                            id={item.id}
                        />
                    ))
                }
            </Row>
        </Container>
      );
};

export default SearchResults;
