import React, { useState, useEffect, useCallback } from "react";
import { Playground } from "../../types.ts";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

type PlaygroundFormProps = {
    onAdd: (newItem: Playground) => void;
    onUpdate: (updatedItem: Partial<Playground>) => void;
    itemToEdit: Playground | null;
    onSearch: (id: number) => void;
}

const PlaygroundForm = ({ onAdd, onUpdate, itemToEdit, onSearch }: PlaygroundFormProps) => {
    const [id, setId] = useState(0);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState('');

    useEffect(() => {
        if (itemToEdit) {
            setId(itemToEdit.id);
            setDescription(itemToEdit.description);
            setLocation(itemToEdit.location);
            setRating(itemToEdit.rating);
            setFeedback(itemToEdit.feedback);
            setDate(new Date(itemToEdit.date));
        } else {
            resetForm();
        }
    }, [itemToEdit]);

    const resetForm = useCallback(() => {
        setId(0);
        setLocation('');
        setDescription('');
        setRating(0);
        setFeedback('');
        setDate(new Date());
        setError('');
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!location) {
            setError('Location is required.');
            return;
        }

        const newPlayground: Partial<Playground> = {
            id,
            location,
            description,
            rating,
            feedback,
            date,
        };

        if (itemToEdit) {
            onUpdate({ ...newPlayground, id: itemToEdit.id });
        } else {
            onAdd(newPlayground as Playground);
        }

        resetForm();
    };

    const handleSearch = () => {
        if (id <= 0) {
            setError('Please enter a valid ID to search.');
            return;
        }
        onSearch(id);
    };

    // Handle star rating selection
    const handleStarClick = (value: number) => {
        setRating(value);
    };

    return (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', mb: 2 }}>
                {/*<TextField*/}
                {/*    label="Id"*/}
                {/*    value={id}*/}
                {/*    onChange={(e) => setId(Number(e.target.value))}*/}
                {/*    required*/}
                {/*    sx={{ m: 1, flex: 1, minWidth: '150px', backgroundColor: 'white' }}*/}
                {/*/>*/}
                <TextField
                    label="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    sx={{ m: 1, flex: 1, minWidth: '150px', backgroundColor: 'white' }}
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{ m: 1, flex: 1, minWidth: '150px', backgroundColor: 'white' }}
                />
                <TextField
                    label="Feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    sx={{ m: 1, flex: 1, minWidth: '150px', backgroundColor: 'white' }}
                />
                <TextField
                    label="Date"
                    type="date"
                    value={date.toISOString().slice(0, 10)}
                    onChange={(e) => setDate(new Date(e.target.value))}
                    sx={{ m: 1, flex: 1, minWidth: '150px', backgroundColor: 'white' }}
                />
                {/* Star rating display */}
                <Box sx={{ m: 1, display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '8px' }}>Rating:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} onClick={() => handleStarClick(star)} style={{ cursor: 'pointer' }}>
                            {star <= rating ? (
                                <StarIcon sx={{ color: 'gold' }} />
                            ) : (
                                <StarBorderIcon sx={{ color: 'gold' }} />
                            )}
                        </span>
                    ))}
                </Box>

            </Box>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button type="submit" variant="contained" sx={{ m: 1 }}>
                    {itemToEdit ? 'Update Playground' : 'Add Playground'}
                </Button>
                <Button type="button" variant="contained" onClick={handleSearch} sx={{ m: 1 }}>
                    Search Playground
                </Button>
                <Button type="button" variant="outlined" onClick={resetForm} sx={{ m: 1 }}>
                    Reset
                </Button>
            </Box>
        </Box>
    );
};

export default PlaygroundForm;
