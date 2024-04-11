import React from 'react';
import styles from "./WelcomeBox.module.css"

function WelcomeBox({ username }) {
  return (
    <div className={styles.containerWelcomeBox} >
      <div className={styles.contentContainerWelcomeBox} >
        <h1 className={styles.welcomeTextWelcomeBox}>Welcome to</h1>
        <img
          src="pictures/Tuned logo no background.png"
          alt="Tuned"
          className={styles.tunedImageWelcomeBox}
        />
        <h1 className={styles.welcomeTextWelcomeBox} >{username}</h1>
      </div>
    </div>
  );
}

export default WelcomeBox;

