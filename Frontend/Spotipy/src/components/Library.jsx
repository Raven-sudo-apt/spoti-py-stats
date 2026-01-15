import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'
import NowPlayingInfo from './nowPlayingInfo.jsx'

function Library({ onSelectTrack }) {
  const { user, token } = useAuth()
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [nowPlaying, setNowPlaying] = useState(null)
  

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
        setError('Failed to load tracks')
        console.error(err)
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
          <h3>| Playlists</h3>
          {user && user.playlists && user.playlists.length > 0 ? (
            user.playlists.map((playlist) => (
              <ul key={playlist.id}>
                <li>{playlist.name}</li>
              </ul>
            ))
          ) : (
            <p>No playlists found.</p>
          )}
        </div>
        <div><h3>| Tracks</h3>
          <div>

          {loading && <p>Loading tracks...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
            {tracks && tracks.length > 0 ? (
              tracks.map((track) => ( <div>
                <li className='libraryItem'
                  key={track.id}
                  style={{
                    backgroundColor: nowPlaying?.id === track.id ? '#00352c' : 'transparent'
                  }}
                  onClick={() => {
                    setNowPlaying(track)
                    if (onSelectTrack) {
                      onSelectTrack(track)
                    }
                  }}
                >
                  <div >{track.title}</div>
                </li>
                </div>
              ))
            ) : (
              !loading && <p>No tracks found. Upload one to get started!</p>
              
            )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Library
