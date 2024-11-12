import {useState, useEffect} from "react";
import {Playground} from "../../types.ts";
import {
    addPlayground,
    deletePlayground,
    fetchPlayground,
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
import {Box} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MapComponent from "./PlaygroundMap.tsx";
import SearchAppBar from "./PlaygroundNavBar.tsx";

type PlaygroundCardProps = {
    playgroundList: Playground[],
    setPlaygroundList: React.Dispatch<React.SetStateAction<Playground[]>>
};

const PlaygroundCard = ({playgroundList, setPlaygroundList}: PlaygroundCardProps) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [editingItem, setEditingItem] = useState<Playground | null>(null);
    const [searchedItems, setSearchedItems] = useState<Playground[]>([]);

    // State for form fields
    const [formData, setFormData] = useState({
        location: '',
        city: '',
        state: '',
        zipcode: '',
        description: '',
        feedback: '',
        rating: 0,
        date: new Date(),
    });

    // Add a new playground
    const addRow = async () => {
        setLoading(true);

        // Validate input fields
        if (!formData.location || !formData.city || !formData.state || !formData.zipcode || !formData.description || formData.rating === 0) {
            setError('All fields are required. Please complete the form.');
            setLoading(false);
            return;
        }

        const newPlayground: Playground = {
            location: formData.location,
            address: {city: formData.city, state: formData.state, zip: formData.zipcode},
            description: formData.description,
            feedback: formData.feedback,
            rating: formData.rating,
            date: new Date().toISOString(),
        };

        try {
            // Call backend to add playground
            const addedItem = await addPlayground(newPlayground);

            // Re-fetch playground list after adding the new item
            fetchPlaygroundList();

            // Clear form fields
            resetForm();
        } catch (error) {
            console.error('Failed to add playground:', error);
            setError('Failed to add playground. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch playground list from the backend
    const fetchPlaygroundList = async () => {
        setLoading(true);
        setError('');
        try {
            const playgrounds = await fetchPlayground();//fetchPlayground gets all playgrounds
            setPlaygroundList(playgrounds); // Update the state with the latest playgrounds
        } catch (error) {
            console.error('Failed to fetch playgrounds:', error);
            setError('Failed to fetch playgrounds.');
        } finally {
            setLoading(false);
        }
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

    // Reset form fields
    const resetForm = () => {
        setFormData({
            location: '',
            city: '',
            state: '',
            zipcode: '',
            description: '',
            feedback: '',
            rating: 0,
            date: new Date(),
        });
    };

    // Handle editing a playground item
    const handleEdit = (item: Playground) => {
        setEditingItem(item);
        setFormData({
            location: item.location,
            city: item.address.city,
            state: item.address.state,
            zipcode: item.address.zip,
            description: item.description,
            feedback: item.feedback || '',
            rating: item.rating,
            date: new Date(item.date),
        });
    };

    // Remove a playground
    const removeRow = async (id: number) => {
        setLoading(true);
        try {
            await deletePlayground(id); // Call backend service to delete playground
            setPlaygroundList(prev => prev.filter(item => item.id !== id)); // Remove from local state
        } catch (error) {
            console.error('Failed to remove playground:', error);
            setError('Failed to remove playground.');
        } finally {
            setLoading(false);
        }
    };

    // Render rating stars
    const renderRatingStars = (rating: number) => (
        <>
            {[1, 2, 3, 4, 5].map((star) => (
                star <= rating ? (
                    <StarIcon key={star} sx={{color: 'gold'}}/>
                ) : (
                    <StarBorderIcon key={star} sx={{color: 'gold'}}/>
                )
            ))}
        </>
    );

    // Search by city
    const searchCity = async (searchQuery: string) => {
        setLoading(true);
        setError('');
        try {
            const items = await fetchPlayground(); // Get all playgrounds
            const filteredItems = items.filter(item =>
                item.address.city.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchedItems(filteredItems);
        } catch (error) {
            console.error('Failed to search playgrounds:', error);
            setError('Failed to search playgrounds.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{display: 'flex', height: '100vh', bgcolor: '#303030', color: 'white'}}>
            <Box sx={{flex: 1, padding: 2}}>
                <MapComponent/>
                <SearchAppBar onSearch={searchCity}/>
            </Box>

            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: 2,
                color: "white",
                bgcolor: '#424242',
                borderRadius: 2
            }}>
                <Box sx={{flex: '0 0 auto'}}>
                    <h3>Playground Management</h3>
                    <PlaygroundForm
                        formData={formData} // Pass all form data as a single object
                        setFormData={setFormData}
                        onAdd={addRow}
                        onUpdate={updateRow}
                        itemToEdit={editingItem}
                        onSearch={searchCity}
                    />
                    {loading && <CircularProgress sx={{display: 'block', margin: 'auto', marginTop: 2}}/>}
                    {error && <p className="error">{error}</p>}
                </Box>

                <Box sx={{flex: 1, overflowY: 'auto', marginTop: 2}}>
                    {searchedItems.length > 0 ? (
                        searchedItems.map(item => (
                            <PlaygroundDetail key={item.id} item={item} onClose={() => setSearchedItems([])}/>
                        ))
                    ) : (
                        <TableContainer component={Paper} sx={{bgcolor: '#424242', color: 'white'}}>
                            <Table sx={{minWidth: 650}} aria-label="playground table">
                                <TableHead>
                                    <TableRow>
                                        {/*<TableCell sx={{color: 'white'}}>Street</TableCell>*/}
                                        <TableCell sx={{color: 'white'}}>City</TableCell>
                                        <TableCell sx={{color: 'white'}}>State</TableCell>
                                        {/*<TableCell sx={{color: 'white'}}>Zipcode</TableCell>*/}
                                        <TableCell sx={{color: 'white'}}>Description</TableCell>
                                        <TableCell sx={{color: 'white'}}>Rating</TableCell>
                                        {/*<TableCell sx={{color: 'white'}}>Date</TableCell>*/}
                                        <TableCell sx={{color: 'white'}}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {playgroundList.map(item => (
                                        <TableRow key={item.id}>
                                            {/*<TableCell sx={{color: 'white'}}>{item.location}</TableCell>*/}
                                            <TableCell sx={{color: 'white'}}>{item.address.city}</TableCell>
                                            <TableCell sx={{color: 'white'}}>{item.address.state}</TableCell>
                                            {/*<TableCell sx={{color: 'white'}}>{item.address.zip}</TableCell>*/}
                                            <TableCell sx={{color: 'white'}}>{item.description}</TableCell>
                                            <TableCell
                                                sx={{color: 'white'}}>{renderRatingStars(item.rating)}</TableCell>
                                            {/*<TableCell sx={{color: 'white'}}>{item.date}</TableCell>*/}
                                            <TableCell>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => handleEdit(item)}
                                                    sx={{
                                                        bgcolor: '#1976d2',
                                                        color: '#fff',
                                                        '&:hover': {bgcolor: '#1565c0'},
                                                    }}>
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => removeRow(item.id)}
                                                    sx={{
                                                        bgcolor: '#d32f2f',
                                                        color: '#fff',
                                                        '&:hover': {bgcolor: '#c62828'},
                                                    }}>
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
