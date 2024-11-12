import { useEffect, useState } from "react";
import { fetchPlayground } from "./PlaygroundService";
import { Playground } from "../../types.ts";
import PlaygroundCard from "./PlaygroundCard";
import MapComponent from "./PlaygroundMap.tsx";
import Button from "@mui/material/Button";

const PlaygroundPage = () => {
    const [playground, setPlayground] = useState<Playground[]>([]);
    const [showPlaygroundCard, setShowPlaygroundCard] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [isTableShown, setIsTableShown] = useState(false); // Track if table is shown

    // Fetch playground data initially
    useEffect(() => {
        fetchPlayground().then(data => setPlayground(data));
    }, []);

    // Function to show table and map
    const showTable = () => {
        setShowPlaygroundCard(true);
        setShowMap(true);
        setIsTableShown(true); // Set the table as shown
    };

    // Function to refresh playground list
    const refreshPlaygrounds = () => {
        fetchPlayground().then(data => setPlayground(data)); // Fetch new playground data
    };

    console.log("here is your playground:", playground);

    return (
        <div style={{
            backgroundImage: `url('../src/assets/Cavazos.jpg')`, // Replace with your image URL
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            padding: '50px',
            color: 'white'
        }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {/* Button text changes based on isTableShown state */}
                <Button
                    type="button"
                    variant="outlined"
                    onClick={isTableShown ? refreshPlaygrounds : showTable} // Call refresh if table is shown, else show table
                    sx={{ m: 1 }}
                >
                    {isTableShown ? "Refresh Playgrounds" : "Display Playgrounds"} {/* Conditional text */}
                </Button>
            </div>

            {/* Render PlaygroundCard and MapComponent when showPlaygroundCard and showMap are true */}
            {showPlaygroundCard && (
                <PlaygroundCard playgroundList={playground} setPlaygroundList={setPlayground} />
            )}
            {showMap && <MapComponent />} {/* Render the MapComponent */}
        </div>
    );
};

export default PlaygroundPage;
