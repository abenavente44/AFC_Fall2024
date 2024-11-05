import { useEffect, useRef } from 'react';
import tt from "@tomtom-international/web-sdk-maps";
import '@tomtom-international/web-sdk-maps/dist/maps.css';

const MapComponent = () => {
    const mapContainerRef = useRef(null); // Reference for the map container

    useEffect(() => {
        // Initialize the map
        const map = tt.map({
            key: 'kLgdHUHHCstzGyFbhJhZMMw16lKc1GxW',
            container: mapContainerRef.current,
            center: [-97.4637, 31.0566], // Set initial center of the map [longitude, latitude]
            zoom:8, // Set initial zoom level
        });

        // Cleanup function to remove the map when component unmounts
        return () => {
            map.remove();
        };
    }, []);

    return (
        <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }}></div>
    );
};

export default MapComponent;
