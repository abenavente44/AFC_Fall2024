import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid'; // For layout

export default function Results({ movies }) {
  return (
    <Grid container spacing={2}>
      {movies.map((movie) => {
        const posterImage = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
        
        return (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300" // Increased height for better visibility
                  image={posterImage}
                  alt={movie.title} // Improved accessibility
                  sx={{ objectFit: 'contain' }} // Use cover to fit the image properly
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {movie.overview.length > 100 
                      ? `${movie.overview.substring(0, 100)}...` 
                      : movie.overview}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                    Rating: {movie.vote_average} {/* Assuming vote_average is the rating */}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
