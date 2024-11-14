import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import {Playground} from '../../types.ts';

type PlaygroundDetailProps = {
    item: Playground;
    onClose: () => void;
};

const PlaygroundDetail: React.FC<PlaygroundDetailProps> = ({item, onClose}) => {
    // Function to display stars based on rating
    const renderRatingStars = (rating: number) => {
        return (
            <>
                {[1, 2, 3, 4, 5].map((star) => (
                    star <= rating ? (
                        <span key={star} style={{color: 'gold'}}>★</span>
                    ) : (
                        <span key={star} style={{color: 'gold'}}>☆</span>
                    )
                ))}
            </>
        );
    };

    return (
        <Card sx={{
            maxWidth: 300,
            marginBottom: 2,
            bgcolor: '#424242', // Dark grey background for the card
            color: 'white',
            borderRadius: 2,
            boxShadow: 3, // Optional: slight shadow for card depth
        }}>
            <CardActionArea>
                {/* Reduced height of the image */}
                <CardMedia
                    component="img"
                    height="300" // Reduced image height
                    image={item.image || "../src/assets/playground.png"} // Default image if no image provided
                    alt={item.location}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {item.location}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'white', fontSize: '0.875rem'}}>
                        <strong>City:</strong> {item.address.city}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'white', fontSize: '0.875rem'}}>
                        <strong>State:</strong> {item.address.state}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'white', fontSize: '0.875rem'}}>
                        <strong>Zip:</strong> {item.address.zip}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'white', fontSize: '0.875rem'}}>
                        <strong>Description:</strong> {item.description}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'white', fontSize: '0.875rem'}}>
                        <strong>Rating:</strong> {renderRatingStars(item.rating)}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'white', fontSize: '0.875rem'}}>
                        <strong>Feedback:</strong> {item.feedback}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'white', fontSize: '0.875rem'}}>
                        <strong>Date:</strong> {item.date}
                    </Typography>
                    {/* Close Button to reset form */}
                    <Button variant="outlined" onClick={onClose} sx={{marginTop: 2}}>
                        Close
                    </Button>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default PlaygroundDetail;
