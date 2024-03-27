import React from "react";
import { BrowserRouter, Routes,  Route } from "react-router-dom";
import Navigation from "./components/navigation/navigation.component";

import Home from "./components/home/home.component";
import Movies from "./components/movies/movies.component";
import SearchResults from "./components/search-results/search-results.component";
import MovieDetails from "./components/movie-details/movie-details.component";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/movies' element={<Movies />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/movie-details/" element={<MovieDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
