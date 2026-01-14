import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'

function Library() {
  const { user, token } = useAuth()
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) return

    const fetchTracks = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get('http://localhost:8000/track/my-tracks/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setTracks(response.data.tracks)
      } catch (err) {
        setError('Failed to load tracks')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTracks()
  }, [token])

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
            {tracks && tracks.length > 0 ? (
              tracks.map((track) => (
                <ul key={track.id} style={{ padding: '10px', borderBottom: '1px solid #333', cursor: 'pointer' }}>
                  <li>{track.title} {track.artist_name && `by ${track.artist_name}`}</li>
                </ul>
              ))
            ) : (
              !loading && <p>No tracks found. Upload one to get started!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Library
