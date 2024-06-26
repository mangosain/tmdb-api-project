import React from "react";
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

import './card.styles.css';

const MovieCard = ({ id, imageUrl, title, imdb, buttonText, type }) => {
  const navigate = useNavigate();


  const viewMore = (mediaId, mediaType) => {
    navigate(`/movie-details?id=${encodeURIComponent(mediaId)}&type=${encodeURIComponent(mediaType)}`);
    window.location.reload();
  };

  return (
      <Card className="p-1 card-container">
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>IMDB: {imdb}</Card.Text>∂
          <Button className="mt-2 w-100 btn btn-secondary" onClick={() => {viewMore(id, type)}}>{buttonText}</Button>
        </Card.Body>
      </Card>
  );
}

export default MovieCard;