import { useEffect, useState } from 'react'
import '../styles/home.css'
import '../styles/modal.css'
import { useAuth } from '../context/AuthContext.jsx'
import Library from './Library.jsx'
import AddToLibrary from './addToLibrary.jsx'
import NowPlayingInfo from './nowPlayingInfo.jsx'


function AuthUserHome() {
  const { user, loading, error, makeshiftNavbar } = useAuth()
  const [nowPlaying, setNowPlaying] = useState(null)


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
        <Library onSelectTrack={setNowPlaying} />
        <AddToLibrary />
        <NowPlayingInfo track={nowPlaying} />
      </div>
        
        <div className='footer'>
        </div>
      </div>
  )
}

export default AuthUserHome
