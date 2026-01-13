import React from 'react'

function nowPlaying() {
    return (
        <div>
        <div className='nowPlaying'>
            <div className='nowPlayingHeader'><img style={{ width: "30px" }} src='../../src/assets/image_white.png' /><h3>Now Playing</h3></div>
            <div className='nowPlayingInfo'>
                <img style={{ width: "100px", height: "100px" }} src="../../src/assets/playlist-placeholder.png" alt="Playlist Image" />
                <div>
                    <h4>Track Title</h4>
                    <p>Artist Name</p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default nowPlaying
