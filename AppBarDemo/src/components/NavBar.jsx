import {useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function NavBar() {
//What the user is typing in the input(base)
const [searchData, setSearchData] = useState('')

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              //verytime user types something, we want to handle change
              value= {searchData}
              onChange ={handleChange}
              onKeyDown={handleKeyDown}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}