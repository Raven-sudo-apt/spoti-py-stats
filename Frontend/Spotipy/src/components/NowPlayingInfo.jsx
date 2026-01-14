import React from 'react'
import TrackPlaying from './trackPlaying'

function NowPlayingInfo({ track }) {
    if (!track) return null

    return (
        <div>
        <div className='nowPlaying'>
            <div className='nowPlayingHeader'><img style={{ width: "30px" }} src='../../src/assets/image_white.png' /><h3>Now Playing</h3></div>
            <div className='nowPlayingInfo'>
                <TrackPlaying key={track.id} title={track.title} url={track.url} />
            </div>
        </div>
        </div>
    )
}

export default NowPlayingInfo
