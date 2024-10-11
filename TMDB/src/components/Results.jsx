import React from "react";
import Grid from "@mui/material/Grid";
import MovieCard from "./Card"; // Adjust the import path as necessary

export default function Results({ movies }) {
  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} key={movie.id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}
