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

    useEffect(() => {
        fetchPlayground().then(data => setPlayground(data));
    }, []);

    const showTable = () => {
        setShowPlaygroundCard(true);
        setShowMap(true);
    };

    return (
        <div style={{
            backgroundImage: `url('../src/assets/Cavazos.jpg')`, // Replace with your image URL
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh', // Ensure it covers the full viewport height
            padding: '50px',
            color: 'white' // Optional: change text color for visibility
        }}>

            {/*<h1 style={{textAlign: 'center', color: "blue"}}>Playground Tracker</h1>*/}
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                <Button type="button" variant="outlined" onClick={showTable} sx={{m: 1}}>
                    Display Playgrounds
                </Button>
            </div>
                {showPlaygroundCard && (
                    <PlaygroundCard playgroundList={playground} setPlaygroundList={setPlayground}/>
                )}
                {showMap && <MapComponent/>} {/* Render the MapComponent */}
            </div>
            );
            };

            export default PlaygroundPage;
