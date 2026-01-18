import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DeleteTrack from './DeleteTrack.jsx'

function Library({ onSelectTrack }) {
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [nowPlaying, setNowPlaying] = useState(null)
  

  const handleTrackDeleted = (deletedId) => {
    setTracks((prev) => prev.filter((track) => track.id !== deletedId))

    if (nowPlaying?.id === deletedId) {
      setNowPlaying(null)
    }
  }

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get('http://localhost:8000/track/my-tracks/', {
          withCredentials: true,
        })
        console.log(response.data)
        setTracks(response.data.tracks)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTracks()
  }, [])
  
  return (
    <div className='library'>
      <div className='libraryHeader'>
        <img style={{ width: "30px" }} src="../../src/assets/library-trans-white.png" /><h3>Your Library</h3>
      </div>
      <div className='libraryItems'>
        <div>
          <h3>| Tracks</h3>
          {loading && <p>Loading tracks...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul style={{width: '100%', gap: '10px', display: 'flex', flexDirection: 'column' }}>
            {tracks && tracks.length > 0 ? (
              tracks.map((track) => (
                <div key={track.id} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <li className='libraryItem' style={{ backgroundColor: nowPlaying?.id === track.id ? '#00352c' : '', cursor: 'pointer' }}
                  onClick={() => { setNowPlaying(track)
                                  if (onSelectTrack) {
                                  onSelectTrack(track) }
                                  }}>
                    <div>{track.title}</div>
                </li>
                <DeleteTrack
                trackId={track.id}
                trackTitle={track.title}
                onDeleted={handleTrackDeleted}/>
                </div>
              ))
            ) : ( !loading && <p>No tracks found. Upload one to get started!</p> )}
            </ul>
          </div>
        </div>
      </div>
    
  )
}
export default Library
