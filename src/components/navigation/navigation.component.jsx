import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Form, } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import './navigation.styles.css';

const Navigation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    // Navigate to search results page with the search query as a URL parameter
    navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery('');
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const [active, setActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  return (
    <Navbar expand="lg" className="nav-bar-container sticky-top py-3">
      <Container fluid className='px-lg-3'>
        <Navbar.Brand href="/"><span className='nav-logo'>Ciné</span>pix</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" style={{ color: 'white' }} />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 mx-auto">
            <Link to={'/'} className={`mx-2 mx-lg-4 ${active === '/' ? 'active' : ''}`}>
              Home
            </Link>
            <Link to={'/movies'} className={`mx-2 mx-lg-4 ${active === '/movies' ? 'active' : ''}`}>
              Movies
            </Link>
            <Link to={'/television'} className={`mx-2 mx-lg-4 ${active === '/television' ? 'active' : ''}`}>
              Television
            </Link>
          </Nav>
          <Form onSubmit={handleSearch} className="d-flex">
            <input
              type="search"
              placeholder="Search..."
              className="search-bar me-2 w-100"
              aria-label="Search"
              value={searchQuery}
              onChange={handleChange}
              required
            />
            <button type="submit" className='search-button'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;