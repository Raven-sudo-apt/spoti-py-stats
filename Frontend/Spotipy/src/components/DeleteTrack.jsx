import axios from 'axios'
import React from 'react'

function DeleteTrack() {
    const handleDelete = async (trackId) => {
        try {
            const response = await axios.delete(`http://localhost:8000/track/${trackId}`, {
                withCredentials: true,
            })
            console.log('Track deleted:', response.data)
        } catch (error) {
            console.error('Error deleting track:', error)
        }
    }

  return (
    <div>
        <button className="DeleteButton" onClick={() => handleDelete()}>Delete Track</button>
    </div>
  )
}

export default DeleteTrack
