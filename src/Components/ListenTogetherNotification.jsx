import React from 'react';
import styles from "./SearchResult.module.css";
import MusicPlayer from './MusicPlayer';




const ListenTogetherNotification = ({songData,from})=>{
    let artistname = '';
    const handlePlayPause = () => {
        window.open(songData.preview_url, '_blank');
    
    };
    
    if (songData?.artists) {
        artistname = songData.artists.map((artist) => artist.name).join(', ');
    }

    return (
        <div className={styles.searchBody}>
            <div className={styles.container}>
                <div className={styles.NotRow}>
                    {songData.album ? (
                        <img src={songData.album.images[0].url} alt="Song" className={styles.NotImage} />
                    ) : (<img src={songData.image} alt="Song" className={styles.NotImage} />)}
                    <div className={styles.info}>
                        {from } is listening to { songData?.name } by {artistname || songData?.artist}.
                        Listen along!
                    </div>
                    <div className={styles.controls} style={{ textAlign: "center" }}>
                        <button className={styles.control} onClick={() => handlePlayPause()} style={{ margin: '0 10px' }}>
                            <MusicPlayer />
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )

}

export default ListenTogetherNotification