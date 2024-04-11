import React, { useState } from 'react';

function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        // Toggle the play/pause state
        setIsPlaying(!isPlaying);
    };

    return (
        <div>
            <div>
                    <span onClick={handlePlayPause}>▶</span>
            </div>
        </div>
    );
}

export default MusicPlayer;
