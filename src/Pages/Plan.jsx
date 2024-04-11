import React from "react";
import { useLocation } from 'react-router-dom';
import SubscriptionBox from "../Components/SubscriptionBox";
import Navbar from "../Components/NavBar"



function Plan() {
  const location = useLocation();
  const userId = location.state && location.state.userId;
  console.log(userId);
  return (
    <div>
      <Navbar />
      <SubscriptionBox  />
    </div>
  );
}

export default Plan;
