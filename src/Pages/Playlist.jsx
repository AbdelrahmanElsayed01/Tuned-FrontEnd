import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from "../Components/NavBar"
import SearchResult from "../Components/SearchResult";
import playlistManagement from "../APIs/PlaylistManagement";
import AccessToken from "../APIs/AccessToken";



function Playlist() {

    const [allsongs, setAllSongs] = useState([])
    const [claims, setClaims] = useState(
        () => { return AccessToken.getClaims() }
    )

    const fetchSongs = async () => {
        try {
            const songs = await playlistManagement.getAllSongsInUserPlaylist();
            setAllSongs(songs);
        } catch (error) {
            console.error("Error fetching songs:", error);
        }
    };

    useEffect(() => {
        fetchSongs();
    }, [claims.userId]);



    const handleDeleteSongFromPlaylist = async () => {
        const playlistId= await playlistManagement.getPlaylistIdByUserId()
        const request = {
            playlistId: playlistId,
            songId: songId
        }
        const response = await playlistManagement.deleteSongFromPlaylist(request)
        if(response){
            fetchSongs()
        }

    }
    return (
        <div>
            <Navbar />
            <Link to="/search">
                <button>Add Songs</button>
            </Link>
            {/* <playlistSong /> */}
            {allsongs?.map((item, indx) => (
                <SearchResult key={indx} songData={item} handleDeleteSongFromPlaylist={handleDeleteSongFromPlaylist} />
            ))}

        </div>
    );
}
export default Playlist;