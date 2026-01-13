import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'
function Library() {
    const { user } = useAuth()
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
                {user && user.tracks && user.tracks.length > 0 ? (
                  user.tracks.map((track) => (
                    <div key={track.id}>
                      <p>{track.title} by {track.artist}</p>
                    </div>
                  ))
                ) : (
                  <p>No tracks found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
  )
}

export default Library
