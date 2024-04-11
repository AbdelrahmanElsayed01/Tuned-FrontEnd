import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import axios from 'axios';
import SearchTextBox from "../Components/SearchTextBox"
import Navbar from '../Components/NavBar';
import SearchResult from '../Components/SearchResult';
import  AccessToken  from '../APIs/AccessToken';
import SongPlayerApi from '../APIs/SongPlayerApi';
import { useNavigate } from 'react-router-dom';
import PlaylistManagement from '../APIs/PlaylistManagement'
import playlistManagement from '../APIs/PlaylistManagement';
const spotifyApi = new SpotifyWebApi();

function Search({sendMessage}) {
    const [token, setToken] = useState('');
    const [trackUri, setTrackUri] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('track');
    const navigate=useNavigate()
    console.log(trackUri)
    const fetchAccessToken = () => {
        try {
            const accessToken =  AccessToken.getSpotifyAccessToken();
            setToken(accessToken);
            console.log("token",accessToken)
            spotifyApi.setAccessToken(accessToken);
        } catch (error) {
            console.error('Error fetching access token:', error);

        }
    };

    const handleSearch = () => {
        fetchAccessToken();
        axios.get(`https://api.spotify.com/v1/search?q=${searchQuery}&type=${searchType}&limit=15`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            const data = response.data;
            setTrackUri(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        // const response=await playlistManagement.getAllSongsInPlaylistPathVariable(AccessToken.getClaims().userId)
        // console.log("respponse",response)
    };

    const handleAddSongToPlaylist=async(request)=>{
        const response = await PlaylistManagement.addSongToPlaylist(request)
        if(response){
            navigate("/playlist")
        }
        else{
            console.error(response)
        }
    }

    const handleAddSong=async(song)=>{
        const minutes = Math.floor(song.duration_ms / 60000);
        const seconds = ((song.duration_ms % 60000) / 1000).toFixed(0);
        const artistname = song.artists.map((artist) => artist.name).join(', ');
        const newSong={
            title:song.name,
            artist:artistname,
            uri: song.uri,
            image:song.album.images[0].url,
            duration: `${minutes} min ${seconds} sec`
        }
        const response=await SongPlayerApi.addSong(newSong)
        console.log("adding song successfully")

        if(response){
            const userId= AccessToken.getClaims().userId
            const playlistId= await PlaylistManagement.getPlaylistIdByUserId()
            console.log("getting playlistId successfully")
            const request = {
                playlistId:playlistId,
                songId: response,
            }
            console.log(request);
            handleAddSongToPlaylist(request)
        }
        else{
            console.error("error adding song to db",response)
        }
    } 

    return (
        <div>
            <Navbar />
            <h1>Search</h1>
            <SearchTextBox 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchType={searchType}
                setSearchType={setSearchType}
            />
            <button onClick={handleSearch}>Search</button>
            {/* <button onClick={playSong}>Play</button> */}
            <h3>Results found: {trackUri?.tracks?.limit}</h3>
            {trackUri.tracks?.items?.map((item,indx)=>(
                <SearchResult key={indx} songData={item} handleAddSong={handleAddSong} sendMessage={sendMessage}/>
            ))}
            
        </div>
    );
}

export default Search;
