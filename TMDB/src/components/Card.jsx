import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

export default function MovieCard({ movie }) {
  const title = movie?.title || "Unknown Title";
  const overview = movie?.overview || "No overview available.";
  const rating = movie?.vote_average || "N/A";
  const posterImage = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : "../src/assets/MightyMouse.jpg";

  return (
    <Card sx={{ maxWidth: 380 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="500"
          image={posterImage}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {overview.length > 400
              ? `${overview.substring(0, 100)}...`
              : overview}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontWeight: "bold" }}
          >
            Rating: {rating}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
