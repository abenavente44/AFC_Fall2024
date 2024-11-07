import React from 'react';
import {Playground} from "../../types.ts";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

type PlaygroundDetailProps = {
    item: Playground | null; // The searched item
    onClose: () => void; // Function to close the detail view
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

//playground detail holds func component with props item and onClose
const PlaygroundDetail: React.FC<PlaygroundDetailProps> = ({item, onClose}) => {
    if (!item) return null;
    console.log(item.city);
    return (
        <Box sx={{padding: 2, backgroundColor: '#f5f5f5', borderRadius: 1}}>
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="playground table">
            <TableBody>
                {/*<TableCell> <strong>ID:</strong> {item.id}</TableCell>*/}
                <TableCell><strong>Location:</strong> {item.location}</TableCell>
                <TableCell><strong>City:</strong> {item.city}</TableCell>
                <TableCell><strong>Description:</strong> {item.description}</TableCell>
                <TableCell><strong>Rating:</strong> {renderRatingStars(item.rating)}</TableCell>
                <TableCell><strong>Feedback:</strong> {item.feedback}</TableCell>
                <TableCell><strong>Date:</strong> {item.date}</TableCell>
                <TableCell>
                    <Button variant="outlined" onClick={onClose} sx={{mt: 2}}>
                                Close
                    </Button>
                </TableCell>
            </TableBody>
        </Table>
    </TableContainer>
        </Box>
    );
};

export default PlaygroundDetail;
