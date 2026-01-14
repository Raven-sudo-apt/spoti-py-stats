import React from 'react'

function TrackPlaying({ title, url }) {
  return (
    <div>
      <h4>{title}</h4>
      <audio controls autoPlay key={url} style={{ width: '100%' }}>
        <source src={url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}

export default TrackPlaying
