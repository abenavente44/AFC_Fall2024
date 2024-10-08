import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function MovieCard({ movie }) {
  
  const [searchData, setSearchData] = useState('')
  const posterImage = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
  const handleChange = (event) => {
    //update searchData everytime there is a user input/change
    setSearchData(event.target.value)
    console.log(searchData)
 }
 //if the user presses "Enter" run a search
 const handleKeyDown = (event) =>{
    if(event.key ==="Enter"){ 
    console.log("running search for:", searchData);
    setSearchData('');
   
 
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/movie',
      params: {query: searchData, include_adult: 'false', language: 'en-US', page: '1'},
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTRkMDM2YjNjNGQ4Mjc0YzU3NzUyMDQzZDAzY2NhNCIsIm5iZiI6MTcyODMxNDE2NS44NjEyMzUsInN1YiI6IjY2ZmQ1N2Y5MzQ4ZGUxZmFiZmYyNGM5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y6pr7OFkOGZkzB8Oy4xVRRWvziK8o8U4XVqxv9mSlXc'
      }
    };
    
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
 
 
    }
 
 }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={posterImage}
          alt={movie.title} // Improved accessibility
          value= {searchData}
              onChange ={handleChange}
              onKeyDown={handleKeyDown}
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
