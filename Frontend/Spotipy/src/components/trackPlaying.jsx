import React from 'react'

function TrackPlaying(props) {
  return (
    <div>
      <h4>{props.title}</h4>
                <audio controls autoPlay style={{ width: '100%' }}>
                <source src={props.url} type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
    </div>
  )
}

export default TrackPlaying
