import React from 'react'

function TrackPlaying({ title, url }) {
  return (
    <div>
      <div className='TrackInfo'>
          <h3>Playing:</h3>
          <h4>{title}</h4>
        </div>
      <audio controls autoPlay={true} key={url} style={{ width: '100%' }}>
        <source src={url} type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default TrackPlaying
