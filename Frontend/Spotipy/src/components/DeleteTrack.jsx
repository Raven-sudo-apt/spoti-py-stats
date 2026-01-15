import React from 'react'

function DeleteTrack() {
    const handleDelete = async (trackId) => {
        try {
            const response = await delete(`http://localhost:8000/track/${trackId}`, {
                withCredentials: true,
            })
            console.log('Track deleted:', response.data)
        } catch (error) {
            console.error('Error deleting track:', error)
        }
    }

  return (
    <div>
      
    </div>
  )
}

export default DeleteTrack
