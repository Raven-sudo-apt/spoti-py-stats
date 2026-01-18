import React from 'react'

function TrackPlaying({ title, url }) {
  if (!title || !url) return <div className='TrackInfo'> <h3> Choose a track to play </h3> </div>
  const handleEnded = () => {
    console.log('Track ended')
  }
    return (
    <div>
      <div className='TrackInfo'>
          <h3>Playing:</h3>
          <h4>{title}</h4>
      </div>
      <audio onEnded={() => handleEnded()} controls autoPlay={true} key={url} style={{ width: '100%' }}>
        <source src={url} type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default TrackPlaying
