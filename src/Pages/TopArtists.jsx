import React, { useEffect, useState } from 'react';
import Navbar from "../Components/NavBar";
import topArtistsAPI from "../APIs/TopArtists";
import ArtistCard from "../Components/ArtistCard"; // Import the newly created ArtistCard component

function TopArtists() {
    const [topArtists, setTopArtists] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopArtists = async () => {
            try {
                const data = await topArtistsAPI.getTopArtists();
                setTopArtists(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchTopArtists();
    }, []);

    return (
        <div>
            <Navbar />
            {error ? (
                <p>Error fetching top artists: {error}</p>
            ) : (
                <div>
                    <h1>Top Artists</h1>
                    <div>
                        {topArtists.map((artist, index) => (
                            // Render the ArtistCard component for each artist in topArtists
                            <ArtistCard key={index} artistData={artist} index={index} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TopArtists;

