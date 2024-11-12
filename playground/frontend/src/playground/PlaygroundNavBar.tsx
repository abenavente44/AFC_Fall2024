// PlaygroundNavBar.tsx or SearchAppBar.tsx
import {useState} from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {Link, useNavigate} from 'react-router-dom';
import {Typography} from '@mui/material';

const Search = styled('div')(({theme}) => ({
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

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
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

type SearchAppBarProps = {
    onSearch: (query: string) => void; // Make sure onSearch is a required prop
};

const SearchAppBar = ({onSearch}: SearchAppBarProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    const goToHome = () => {
        useNavigate('/');
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        // Ensure onSearch is defined and is a function
        if (typeof onSearch === 'function') {
            onSearch(searchQuery);
        } else {
            console.error('onSearch is not a function');
        }
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar sx={{backgroundColor: 'salmon.main'}}>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Link
                        component="button"
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={goToHome}
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </Link>
                    <Typography variant="h6" noWrap component="div"
                                sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}>
                        Home
                    </Typography>
                    <Typography variant="h4" component="div" sx={{color: 'inherit', flexGrow: 1, textAlign: 'center'}}>
                        Playgrounds
                    </Typography>
                    <Box sx={{flexGrow: 1}}/> {/* Spacer to push search to the right */}

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search by city…"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch(); // Trigger the search when Enter is pressed
                                }
                            }}
                            inputProps={{'aria-label': 'search'}}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default SearchAppBar;
