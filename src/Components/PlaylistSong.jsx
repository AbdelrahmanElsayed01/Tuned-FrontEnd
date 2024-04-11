import React from 'react';
import styles from "./SearchResult.module.css";
import MusicPlayer from './MusicPlayer';

function playlistSong(songData){
    let artistname = '';
    const minutes = Math.floor(songData.duration_ms / 60000);
    const seconds = ((songData.duration_ms % 60000) / 1000).toFixed(0);

    const handlePlayPause = () => {
        if(songData.preview_url == null){
            alert("this song has no preview")
        }
        else{
            window.open(songData.preview_url, '_blank');

        }

    };

    if (songData?.artists) {
        artistname = songData.artists.map((artist) => artist.name).join(', ');
    }

    return (
        <div className={styles.searchBody}> 
                    <div className={styles.container}>
            <div className={styles.row}>
                <img src={songData.album.images[0].url} alt="Song" className={styles.image} />
                <div className={styles.info}>
                    <h3>Artist: {artistname}</h3>
                    <h3>Song: {songData.name}</h3>
                    <p>Duration: {minutes} min {seconds} sec</p>
                </div>
                <div className={styles.controls}>
                    <button className={styles.control} onClick={()=>handlePlayPause()}>
                    <MusicPlayer />
                    </button>
                    <button className={styles.control}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/></svg>
                    </button>
                    {songData.preview_url == null &&
                    <italic>PREMIUM</italic>
                    }
                    
                </div>
            </div>
        </div>
        </div>
    );
}
export default playlistSong;