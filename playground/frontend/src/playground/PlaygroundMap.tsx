import {useEffect, useRef} from 'react';
import tt from "@tomtom-international/web-sdk-maps";
import '@tomtom-international/web-sdk-maps/dist/maps.css';



const MapComponent = () => {
    const mapContainerRef = useRef(null); // Reference for the map container

    useEffect(() => {
        // Initialize the map only once when the component mounts
        const map = tt.map({
            key: 'kLgdHUHHCstzGyFbhJhZMMw16lKc1GxW', // Replace with your actual API key
            container: mapContainerRef.current,
            center: [-97.4637, 31.0566], // Set initial center of the map [longitude, latitude]
            zoom: 8, // Set initial zoom level
        });

        // Create a rating function to display stars based on the rating score
        const renderRating = (rating: number) => {
            let stars = '';
            for (let i = 0; i < 5; i++) {
                if (i < rating) {
                    stars += '★'; // Full star
                } else {
                    stars += '☆'; // Empty star
                }
            }
            return stars;
        };

        // Create popup content for each marker
        const popupContent1 = `
            <h3 style="color: black">Fort Cavazos Bronco Youth Center</h3>
            <p style="color: black"><strong>Large Track</strong></p>
            <p style="color: black" ><strong>Rating:</strong> ${renderRating(4)}</p> 
            <img src="../src/assets/Cavazos.jpg" alt="Cavazos" style="width: 100%; height: 100%;"/>
        `;
        const popupContent2 = `
            <h3 style="color: black">Jaycee Park</h3>
            <p style="color: black"><strong>Rocket Ship</strong></p>
            <p style="color: black" ><strong>Rating:</strong> ${renderRating(5)}</p>
            <img src="../src/assets/Jaycee.jpg" alt="Jaycee" style="width: 100%; height: 100%;"/>
        `;
        const popupContent3 = `
            <h3 style="color: black">Carl Levin Park</h3>
            <p style="color: black"><strong>Slides Galore</strong></p>
            <p style="color: black" ><strong>Rating:</strong> ${renderRating(3)}</p>
            <img src="../src/assets/Levin.jpg" alt="Levin Park" style="width: 100%; height: 100%;"/>
        `;
        const popupContent4 = `
            <h3 style="color: black">Whistle Stop Park</h3>
            <p style="color: black"><strong>Tree houses</strong></p>
            <p style="color: black" ><strong>Rating:</strong> ${renderRating(4)}</p>
            <img src="../src/assets/Whistle.jpg" alt="Whistle Stop Park" style="width: 100%; height:100%;"/>
        `;

        // Create the markers and their popups
        const marker1 = new tt.Marker()
            .setLngLat([-97.6642, 31.0704]) // Set coordinates for marker 1
            .addTo(map);

        const popup1 = new tt.Popup({offset: 25}).setHTML(popupContent1);
        marker1.setPopup(popup1);

        const marker2 = new tt.Marker()
            .setLngLat([-97.4592, 31.0629])
            .addTo(map);

        const popup2 = new tt.Popup({offset: 25}).setHTML(popupContent2);
        marker2.setPopup(popup2);

        const marker3 = new tt.Marker()
            .setLngLat([-97.7380, 31.0954])
            .addTo(map);

        const popup3 = new tt.Popup({offset: 25}).setHTML(popupContent3);
        marker3.setPopup(popup3);

        const marker4 = new tt.Marker()
            .setLngLat([-97.3481, 31.0978])
            .addTo(map);

        const popup4 = new tt.Popup({offset: 25}).setHTML(popupContent4);
        marker4.setPopup(popup4);

        // Cleanup function to remove the map when the component unmounts
        return () => {
            map.remove();
        };
    }, []); // Empty dependency array ensures this effect runs only once

    return (
        <div ref={mapContainerRef} style={{height: '100%', width: '100%'}}></div>
    );
};

export default MapComponent;
