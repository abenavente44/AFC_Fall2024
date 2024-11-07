import { useState } from "react";
import { Playground } from "../../types.ts";
import {
    addPlayground,
    deletePlayground,
    fetchByIdPlayground, fetchByLocation,
    updatePlayground
} from "./PlaygroundService.ts";
import PlaygroundForm from "./PlaygroundForm";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import PlaygroundDetail from "./PlaygroundDetail.tsx";
import { Box } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MapComponent from "./PlaygroundMap.tsx";

type PlaygroundCardProps = {
    playgroundList: Playground[],
    setPlaygroundList: React.Dispatch<React.SetStateAction<Playground[]>>
};

const PlaygroundCard = ({ playgroundList, setPlaygroundList }: PlaygroundCardProps) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [editingItem, setEditingItem] = useState<Playground | null>(null);
    const [searchedItem, setSearchedItem] = useState<Playground | null>(null);

    const addRow = async (newPlayground: Playground) => {
        setLoading(true);
        try {
            const addedItem = await addPlayground(newPlayground);
            setPlaygroundList(prev => [...prev, addedItem]);
        } catch (error) {
            console.error('Failed to add item:');
            setError('Failed to add item.');
        } finally {
            setLoading(false);
        }
    };

    const removeRow = async (id: number) => {
        setLoading(true);
        try {
            await deletePlayground(id);
            setPlaygroundList(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error('Failed to remove item:', error);
            setError('Failed to remove item.');
        } finally {
            setLoading(false);
        }
    };

    const searchId = async (location: string) => {
        setLoading(true);
        setError('');
        try {
            const item = await fetchByLocation(location);
            setSearchedItem(item);
        } catch (error) {
            console.error('Failed to fetch item:', error);
            setError('Failed to fetch item.');
        } finally {
            setLoading(false);
        }
    };

    const handleCloseDetail = () => {
        setSearchedItem(null);
    };

    const updateRow = async (updatedItem: Partial<Playground>) => {
        if (editingItem) {
            setLoading(true);
            try {
                const updatedData = await updatePlayground(editingItem.id, updatedItem);
                setPlaygroundList(prev =>
                    prev.map(item => (item.id === updatedData.id ? updatedData : item))
                );
                setEditingItem(null);
            } catch (error) {
                console.error('Failed to update item:', error);
                setError('Failed to update item.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleEdit = (item: Playground) => {
        setEditingItem(item);
    };

    // Function to display stars based on rating
    const renderRatingStars = (rating: number) => {
        return (
            <>
                {[1, 2, 3, 4, 5].map((star) => (
                    star <= rating ? (
                        <StarIcon key={star} sx={{ color: 'gold' }} />
                    ) : (
                        <StarBorderIcon key={star} sx={{ color: 'gold' }} />
                    )
                ))}
            </>
        );
    };
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Box sx={{ flex: 1, padding: 2 }}>
                <MapComponent />
            </Box>

            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 2,  color: "blue" }}>

                <Box sx={{ flex: '0 0 auto' }}>
                    <h3>Playground Management</h3>
                    <PlaygroundForm
                        onAdd={addRow}
                        onUpdate={updateRow}
                        onSearch={searchId}
                        itemToEdit={editingItem}
                    />
                    {loading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <CircularProgress />
                        </Box>
                    )}
                    {error && <p className="error">{error}</p>}
                </Box>

                <Box sx={{ flex: 1, overflowY: 'auto', marginTop: 2 }}>
                    {searchedItem ? (
                        <PlaygroundDetail item={searchedItem} onClose={handleCloseDetail} />
                    ) : (
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="playground table">
                                <TableHead>
                                    <TableRow>

                                        <TableCell>Location</TableCell>
                                        <TableCell>City</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Rating</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {playgroundList.map((item) => (

                                        <TableRow key={item.id}>
                                            <TableCell>{item.location}</TableCell>
                                            <TableCell>{item.city}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell>{renderRatingStars(item.rating)}</TableCell>
                                            <TableCell>{item.date}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => handleEdit(item)}
                                                    aria-label={`Edit ${item.location}`}>
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => removeRow(item.id)}
                                                    aria-label={`Remove ${item.location}`}>
                                                    Remove
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default PlaygroundCard;
