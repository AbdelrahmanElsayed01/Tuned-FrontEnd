import React from 'react';
import styles from "./Navbar.module.css";
import AccessToken from '../APIs/AccessToken';

const handleLogOut = () => {
  console.log("clear it");
  AccessToken.clear();
}

function Navbar() {
  const isPremiumUser = AccessToken.getAccessToken() && AccessToken.getClaims().roles[0] === "premium";
  const isFreeUser = AccessToken.getAccessToken() && AccessToken.getClaims().roles[0] === "free";

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="pictures/Tuned logo no background.png" alt="Logo" />
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a href="/home" className={styles.navLink}>
            Home
          </a>
        </li>
        {isPremiumUser && (
          <li className={styles.navItem}>
            <a href="/playlist" className={styles.navLink}>
              Your playlist
            </a>
          </li>
        )}
        <li className={styles.navItem}>
          <a href="/topArtists" className={styles.navLink}>
            Top Artists
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="/search" className={styles.navLink}>
            Discover
          </a>
        </li>
        {isFreeUser && (        
          <li className={styles.navItem}>
            <a href="/plan" className={styles.navLink}>
              Go Premium
            </a>
          </li>)}

        <li className={styles.navItem}>
          <a href="/" onClick={() => handleLogOut()} className={styles.navLink}>
            Log out
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
