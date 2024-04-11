import React from 'react';
import styles from "../Components/ArtistCard.module.css"; // Create the CSS file for the ArtistCard component

function ArtistCard({ artistData, index }) {
    console.log(artistData);
    return (
        <div className={styles.artistCard}>
            <div className={styles.indexLabel}>{index + 1}</div>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.info}>
                        <h3>Artist: {artistData}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArtistCard;


