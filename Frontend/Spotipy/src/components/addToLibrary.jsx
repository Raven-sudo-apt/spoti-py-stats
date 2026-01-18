import React, { useState } from 'react'
import UploadTrack from './UploadTrack'

function addToLibrary() {
  const [ShowUploadTrack, setShowUploadTrack] = useState(false);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  return (
    <div className='addToLibrary'>
        <button onClick={() => setShowUploadTrack(true)} className='addTrack'>
            <div><img style={{ width: "100px" }} src="../../src/assets/add.png" /></div>
            <h3>Add New Track</h3>
        </button>
        {ShowUploadTrack && <UploadTrack onClose={() => setShowUploadTrack(false)} />}
        
    </div>
  )
}

export default addToLibrary



