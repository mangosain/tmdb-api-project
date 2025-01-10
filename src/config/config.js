// config.js
const config = {
  apiKey: "0814d5fcf7b65260d622d8d0c5db1cb4",
  baseURL: "https://api.themoviedb.org/3",
};

export default config;

//   Modifying the endpoint ${config.baseURL}/movie/now_playing?api_key=${config.apiKey} with different parameters or endpoints can return various data related to currently playing movies. Here's a breakdown of possible variations:

// /movie/now_playing: Returns a list of movies currently playing in theaters.

// /movie/popular: Returns a list of popular movies.

// /movie/top_rated: Returns a list of top-rated movies.

// /movie/upcoming: Returns a list of upcoming movies.

// /movie/{movie_id}: Returns details about a specific movie, where {movie_id} is the ID of the movie.

// /movie/{movie_id}/credits: Returns credits information for a specific movie, including cast and crew.

// /movie/{movie_id}/similar: Returns a list of similar movies for a specific movie.

// /movie/{movie_id}/videos: Returns a list of videos associated with a specific movie, such as trailers.

// /movie/{movie_id}/reviews: Returns a list of reviews for a specific movie.

// /movie/{movie_id}/recommendations: Returns a list of recommended movies based on a specific movie.

// /search/movie: Returns a list of movies matching a search query.
