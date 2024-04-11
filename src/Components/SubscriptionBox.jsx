import React from "react";
import styles from "./SubscriptionBox.module.css";
import SubscriptionButton from "../Components/SubscriptionButton";
import AccessToken from "../APIs/AccessToken";

const SubscriptionBox = () => {
  return (
    <>
    { AccessToken.getAccessToken() && AccessToken.getClaims().roles[0] =="premium" ?
    (
        <h1 className={styles.premuimTitle}>You already have a Premium account</h1>
    ):(
      <section className={styles.pricingTables}>
      <div className="container">
        {/* Main title */}
        <div className={styles.mainTitle}>
          <h1>Switch to Premium</h1>
          <p>Enjoy unlimited playlists, recommendations made specifically for you, and more.</p>
        </div>
        <div className="row">
          <div className={`${styles.pricing} ${styles.featured}`}>
            <div className={styles.listingBadges}>
              <span className={styles.featuredBadge}>Featured</span>
            </div>
            <div className={`${styles.priceHeader} ${styles.priceHeader2}`}>
              <div className={styles.title}>Premium</div>
              <div className={styles.price}>10€</div>
            </div>
            <div className={styles.content}>
              <ul>
                <li>Unlimited number of playlists</li>
                <li>Weekly recommendations</li>
                <li>No annoying ads</li>
                <li>Share music with friends</li>
              </ul>
            </div>
            <SubscriptionButton />
          </div>
        </div>
      </div>
    </section>
    )
    
    }
    
    </>
    
  );
};

export default SubscriptionBox;
