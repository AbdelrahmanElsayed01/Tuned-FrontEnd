import React from 'react';
import styles from "./SearchResult.module.css";
import MusicPlayer from './MusicPlayer';
import PlayerApi from '../APIs/SongPlayerApi'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListenTogetherNotification from './ListenTogetherNotification';

function SearchResult({ songData, handleAddSong, handleDeleteSongFromPlaylist,sendMessage }) {
    let artistname = '';
    const minutes = Math.floor(songData.duration_ms / 60000);
    const seconds = ((songData.duration_ms % 60000) / 1000).toFixed(0);

    const handlePlayPause = () => {
        if (songData.preview_url == null) {
            alert("this song has no preview")
        }
        else {
            console.log("send not",{text: JSON.stringify(<ListenTogetherNotification songData={songData}/>) })
            sendMessage({text: songData} )
        }

    };

    const handlePlayPause2 = () => {
        if (songData.preview_url == null) {
            alert("this song has no preview")
        }
        else{
            window.open(songData.preview_url, '_blank');
            toast.success(
            <SearchResult 
                songData={songData} 
            />
                , {
            });
        }
    }

    if (songData?.artists) {
        artistname = songData.artists.map((artist) => artist.name).join(', ');
    }

    return (
        <div className={styles.searchBody}>
            <div className={styles.container}>
                <div className={styles.row}>
                    {songData.album ? (
                        <img src={songData.album.images[0].url} alt="Song" className={styles.image} />
                    ) : (<img src={songData.image} alt="Song" className={styles.image} />)}
                    <div className={styles.info}>
                        <h3>Artist: {artistname || songData?.artist}</h3>
                        <h3>Song: {songData?.name || songData?.title}</h3>
                        <p>Duration:{songData?.duration ? songData?.duration : `${minutes} min ${seconds} sec`} </p>
                    </div>
                    <div className={styles.controls} style={{ textAlign: "center" }}>
                        <button className={styles.control} onClick={() => handlePlayPause2()} style={{ margin: '0 10px' }}>
                            <MusicPlayer />
                        </button>
                        <button className={styles.control} onClick={() => handlePlayPause()} style={{ margin: '0 10px' }}>
                        <h1 style={{ fontSize: '15px' }}>listen along</h1>
                        </button>
                        {handleDeleteSongFromPlaylist ?
                            <button className={styles.control} onClick={() => handleDeleteSongFromPlaylist(songData.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" id="delete"><path fill="#000" d="M15 3a1 1 0 0 1 1 1h2a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2h2a1 1 0 0 1 1-1h6Z"></path><path fill="#000" fillRule="evenodd" d="M6 7h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7Zm3.5 2a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 1 0v-9a.5.5 0 0 0-.5-.5Zm5 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 1 0v-9a.5.5 0 0 0-.5-.5Z" clipRule="evenodd"></path></svg>
                            </button>
                            :
                            <button className={styles.control} onClick={() => handleAddSong(songData)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" /></svg>
                            </button>
                        }

                        <div style={{ marginTop: '10px' }}>
                            {songData.preview_url == null &&
                                <p>PREMIUM</p>
                            }
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchResult;
