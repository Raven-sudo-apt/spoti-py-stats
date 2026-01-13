import { useEffect } from 'react'
import '../styles/home.css'
import '../styles/modal.css'
import { useAuth } from '../context/AuthContext.jsx'
import Library from './Library.jsx'
import addToLibrary from './addToLibrary.jsx'
import nowPlaying from './nowPlaying.jsx'


function AuthUserHome() {
  const { user, loading, error, makeshiftNavbar } = useAuth()


  useEffect(() => {
    if (user) {
      document.title = "spoti.py"
    }
  }, [user])

  return (
    <div>
      {makeshiftNavbar()}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className='homebody'>

        {Library()}
        {addToLibrary()}
        {nowPlaying()}
        </div>
        
        <div className='footer'>
          <div className='playingTrack'>
          </div>
        </div>
      </div>
  )
}

export default AuthUserHome
