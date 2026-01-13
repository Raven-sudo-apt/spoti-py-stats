import React from 'react'

function addToLibrary() {
  return (
    <div className='addToLibrary'>
          <button className='createPlaylist'>
            <div><img style={{ width: "100px" }} src="../../src/assets/add.png" /></div>
            <h3>Create New Playlist</h3>
          </button>
        <button className='addTrack'>
            <div><img style={{ width: "100px" }} src="../../src/assets/add.png" /></div>
            <h3>Add New Track</h3>
        </button>
    </div>
  )
}

export default addToLibrary



