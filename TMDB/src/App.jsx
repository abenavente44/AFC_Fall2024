import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar"; // Import your NavBar
import Results from "./components/Results"; // Component for displaying movie results
import Error from "./components/Error"; // Component for handling error display
import axios from "axios";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/UI/Theme"; // Adjust the import path as necessary

//landing page component needed to be outside the function
const LandingPage = () => {
  return <h1>Welcome to the Movie Room!</h1>;
};
function App() {
  
  const {VITE_TMDB_API_TOKEN} = process.env;
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const fetchMovies = (query) => {
    const options = {
      method: "GET",
      url: query
        ? `https://api.themoviedb.org/3/search/movie`
        : `https://api.themoviedb.org/3/movie/now_playing`,
      params: {
        language: "en-US",
        query,
        page: "1",
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${VITE_TMDB_API_TOKEN}`
      },
    };

    axios(options)
      .then((response) => {
        if (response.data.results.length === 0) {
          setError("No movies found.");
          setShowResults(false);
        } else {
          setMovies(response.data.results);
          setError(null);
          setShowResults(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load movies. Please try again.");
        setShowResults(false);
      });
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      fetchMovies(searchTerm);
    } else {
      setError("Please enter a search term.");
      setShowResults(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar onSearch={handleSearch} />
        <div className="App">
          <div className="container">
            {error && <Error message={error} />}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/Error" element={<Error message={error} />} />
            </Routes>
            {showResults ? (
              <Results movies={movies} />
            ) : (
              <Button
                onClick={() => fetchMovies()}
                variant="contained"
                color="salmon"
              >
                Now Playing
              </Button>
            )}
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
