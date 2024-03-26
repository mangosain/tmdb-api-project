import React from 'react';

import './movie-details.styles.css';

const MovieDetails = ({ movie }) => {
    const {movieId} = movie;
    return (
        <div>
            <h1>Movie Details</h1>
            <p>Movie ID: {movieId}</p>
        </div>
    );
}

export default MovieDetails;