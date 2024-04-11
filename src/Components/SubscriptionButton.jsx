import React from "react";
import styles from "./SubscriptionBox.module.css";
import GoPremiumApi from "../APIs/GoPremiumAPI";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubscriptionButton = () => {
  const handleSubscription = () => {
    GoPremiumApi.goPremium();
    toast.success('Subscription successful!');
  };

  return (
    <div className={styles.button}>
      <button
        href="#"
        className={`btn ${styles.pricingBtn} ${styles.buttonTheme}`}
        onClick={handleSubscription}
      >
        Get Started
      </button>
    </div>
  );
};

export default SubscriptionButton;

