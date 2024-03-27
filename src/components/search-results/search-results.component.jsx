import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import config from '../../.env.local/config';
import { useLocation } from 'react-router-dom';


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
            <button onClick={() => {alert(searchQuery)}}>check</button>
            <h2 className="mt-3 mb-4">Search Results for "{searchQuery}"</h2>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {
                    searchResults.map(item => (
                    <Col key={item.id}>
                        <Card className="h-100">
                        <Card.Img
                            variant="top"
                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                            style={{ height: '350px', objectFit: 'cover' }}
                        />
                        <Card.Body className="d-flex align-items-center justify-content-center">
                            <Card.Text className="text-center opacity-0 position-absolute w-100 h-100 bg-dark text-light p-3">
                            <strong>{item.title || item.name}</strong>
                            <br />
                            {item.overview}
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </Col>
                    ))
                }
            </Row>
        </Container>
      );
};

export default SearchResults;
