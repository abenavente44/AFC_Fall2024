import React, {useState, useEffect, useCallback} from 'react';
import {Playground} from '../../types.ts';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {addPlayground, updatePlayground} from './PlaygroundService.ts';

type PlaygroundFormProps = {
    onAdd: (newItem: Playground) => void;
    onUpdate: (updatedItem: Playground) => void;
    itemToEdit: Playground | null;
    onSearch: (city: string) => void;
};

const PlaygroundForm = ({onAdd, onUpdate, itemToEdit, onSearch}: PlaygroundFormProps) => {
    const [id, setId] = useState(0);
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');

    // Effect to populate form fields when itemToEdit is passed
    useEffect(() => {
        if (itemToEdit) {
            setId(itemToEdit.id);
            setLocation(itemToEdit.location);
            setDescription(itemToEdit.description);
            setRating(itemToEdit.rating);
            setFeedback(itemToEdit.feedback);
            setCity(itemToEdit.address.city);
            setState(itemToEdit.address.state);
            setZipcode(itemToEdit.address.zip);
            setDate(new Date(itemToEdit.date));
        } else {
            resetForm(); // Reset the form when no item is being edited
        }
    }, [itemToEdit]);

    // Function to reset the form to initial state
    const resetForm = useCallback(() => {
        setId(0);
        setLocation('');
        setDescription('');
        setRating(0);
        setFeedback('');
        setCity('');
        setState('');
        setZipcode('');
        setDate(new Date());
        setError('');
    }, []);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!location) {
            setError('Location is required.');
            return;
        }

        const newPlayground: Playground = {
            id,
            location,
            description,
            rating,
            feedback,
            date,
            address: {city, state, zip: zipcode},
        };
        console.log("here is your new playground:",newPlayground);
        if (itemToEdit) {
            onUpdate(newPlayground as Playground);
        } else {
            onAdd(newPlayground as Playground);
        }
        console.log("new playground leaving form", onUpdate(newPlayground as Playground));
        resetForm();
    };
    // Search functionality based on city
    const handleSearch = () => {
        if (!city) {
            setError('Please enter a valid city to search.');
            return;
        }
        onSearch(city); // Pass the search city to parent
    };

    // Handle star rating selection
    const handleStarClick = (value: number) => {
        setRating(value);
    };

    return (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{mb: 2}}>
            <Box sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', mb: 2}}>
                <TextField
                    label="Street"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    sx={{m: 1, flex: 1, minWidth: '150px', backgroundColor: 'white'}}
                />
                <TextField
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    sx={{m: 1, flex: 1, minWidth: '150px', backgroundColor: 'white'}}
                />
                <TextField
                    label="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    sx={{m: 1, flex: 1, minWidth: '150px', backgroundColor: 'white'}}
                />
                <TextField
                    label="Zipcode"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    required
                    sx={{m: 1, flex: 1, minWidth: '150px', backgroundColor: 'white'}}
                />
                <TextField
                    label="Description"
                    value={description}  // Bound to the state `description`
                    onChange={(e) => setDescription(e.target.value)}  // Update state on change
                    sx={{m: 1, flex: 1, minWidth: '150px', backgroundColor: 'white'}}
                />
                <TextField
                    label="Feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    sx={{m: 1, flex: 1, minWidth: '150px', backgroundColor: 'white'}}
                />
                <TextField
                    label="Date"
                    type="date"
                    value={date.toISOString().slice(0, 10)} // Use ISO string for date input
                    onChange={(e) => setDate(new Date(e.target.value))}
                    sx={{m: 1, flex: 1, minWidth: '150px', backgroundColor: 'white'}}
                />
                {/* Star rating display */}
                <Box sx={{m: 1, display: 'flex', alignItems: 'center'}}>
                    <span style={{marginRight: '8px'}}>Rating:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} onClick={() => handleStarClick(star)} style={{cursor: 'pointer'}}>
                            {star <= rating ? (
                                <StarIcon sx={{color: 'gold'}}/>
                            ) : (
                                <StarBorderIcon sx={{color: 'gold'}}/>
                            )}
                        </span>
                    ))}
                </Box>
            </Box>

            {error && <p style={{color: 'red'}}>{error}</p>}

            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2}}>
                <Button type="submit" variant="contained" sx={{m: 1}}>
                    {itemToEdit ? 'Update Playground' : 'Add Playground'}
                </Button>
                <Button type="button" variant="contained" onClick={handleSearch} sx={{m: 1}}>
                    Search Playground
                </Button>
                <Button type="button" variant="outlined" onClick={resetForm} sx={{m: 1}}>
                    Reset
                </Button>
            </Box>
        </Box>
    );
};

export default PlaygroundForm;
