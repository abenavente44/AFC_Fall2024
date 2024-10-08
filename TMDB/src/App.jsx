import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar"; // Import your NavBar
import Results from "./components/Results"; // Component for displaying movie results
import Error from "./components/Error"; // Component for handling error display
import axios from "axios";
import Button from '@mui/material/Button';
import Card from "./components/Card"
import "./index.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const fetchMovies = (query) => {
    const options = {
      method: 'GET',
      url: query ? `https://api.themoviedb.org/3/search/movie` : `https://api.themoviedb.org/3/movie/now_playing`,
      params: { 
        language: 'en-US',
        query,
        page: '1'
      },
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTRkMDM2YjNjNGQ4Mjc0YzU3NzUyMDQzZDAzY2NhNCIsIm5iZiI6MTcyNzg4MzIxNC40MTI1MjEsInN1YiI6IjY2ZmQ1N2Y5MzQ4ZGUxZmFiZmYyNGM5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l1OA4pfEOifNrKrKbfeCEkUew8I6dwba81SLH0ddajw'
      }
    };
    axios(options)
      .then(response => {
        if (response.data.results.length === 0) {
          setError("No movies found.");
          setShowResults(false);
        } else {
          setMovies(response.data.results);
          setError(null);
          setShowResults(true);
        }
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load movies. Please try again.");
        setShowResults(false);
      });
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      fetchMovies(searchTerm);
      console.log("I am in the landing page")
    } else {
      setError("Please enter a search term.");
      setShowResults(false);
    }
  };

  return (
    <Router>
      <NavBar onSearch={handleSearch} /> Pass the search function to NavBar
       <Card onSearch ={handleSearch}/> 
      <div className="App">
        <div className="container">
          {error && <Error message={error} />}
          {showResults ? (
            <Results movies={movies} />
          ) : (
            <Button onClick={() => fetchMovies()} variant="contained" color="success">
              Now Playing
            </Button>
          )}
        </div>
        <Routes>
          <Route path="/" element={<div>Welcome to the Movie App</div>} />
          <Route path="/error" element={<Error message={error} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
