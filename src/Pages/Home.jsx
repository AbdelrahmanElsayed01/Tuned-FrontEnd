import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/NavBar';
import WelcomeBox from '../Components/WelcomeBox';


function Home() {
  const location = useLocation();
  const username = location.state && location.state.username;

  return (
    <div>
      <Navbar />
      
      <WelcomeBox username={username} />
    </div>
  );
}

export default Home;

