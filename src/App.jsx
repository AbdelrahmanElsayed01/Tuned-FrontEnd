import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import styled from 'styled-components';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import Plan from './Pages/Plan';
import Search from './Pages/Search';
import Playlist from './Pages/Playlist'
import TopArtists from './Pages/TopArtists';
import AccessToken from './APIs/AccessToken';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import ListenTogetherNotification from './Components/ListenTogetherNotification';
import playlistManagement from './APIs/PlaylistManagement';

const CustomToastContainer = styled(ToastContainer)`
  position: absolute;
  right: 5px;
  top: 50px;
  width: 490px;

  & ._NotRow_1pckw_65 { ._NotRow_9o8du_65
    background-color: white;
    border: none;
    /* Add more styles as needed */
  }
`;


function App() {
  const [stompClient, setStompClient] = useState();
  const [messagesReceived, setMessagesReceived] = useState([]);
  const [songsInPlaylist,setSongsInPlayList] =useState()


  const setupStompClient = () => {

    const stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    stompClient.onConnect = () => {
      stompClient.subscribe('/topic/publicmessages', (data) => {
        onMessageReceived(data);
      });

    };

    stompClient.activate();

    setStompClient(stompClient);

  };

  console.log("messegereceived",messagesReceived)

  const handleGetPlayList = async () => {
    try {
      const playlist = await playlistManagement.getAllSongsInUserPlaylist();
      setSongsInPlayList(playlist); // Set the playlist in state
      return playlist;
    } catch (error) {
      console.error('Error fetching playlist:', error);
      return [];
    }
  };

  const sendMessage = (newMessage) => {
    const payload = { 'id': uuidv4(), 'from': AccessToken?.getClaims()?.sub, 'text': newMessage.text };
      stompClient.publish({ 'destination': '/topic/publicmessages', body: JSON.stringify(payload) });
  };
  
  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);
    setMessagesReceived([...messagesReceived, message]);
  
    handleGetPlayList().then((songsPlaylist) => {
      console.log("songsPlaylist", songsPlaylist);
      if (message.from !== AccessToken?.getClaims()?.sub) {
        const matchingSong = songsPlaylist?.find((song) => song?.title === message.text.name);
        console.log("matchingSong", matchingSong);
        if (matchingSong) {
          toast.success(
            <ListenTogetherNotification
              songData={message.text}
              from={message.from}
            />,
            {
              autoClose: 6000,
            }
          );
        }
      }
    });
  };
  
  
  useEffect(()=>{
    setupStompClient();
  },[])

  


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/plan' element={<Plan />} />
          <Route path='/search' element={<Search sendMessage={sendMessage}/>} />
          <Route path='/playlist' element={<Playlist />} />
          <Route path='/topArtists' element={<TopArtists />} />
        </Routes>
      </Router>
      <CustomToastContainer position="top-right" autoClose={2000} />
    </div>
  
  
  )  
};



export default App
