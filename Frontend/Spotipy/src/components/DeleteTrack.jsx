import axios from 'axios'
import React, { useState } from 'react'

function DeleteTrack({ trackId, trackTitle, onDeleted }) {
    const [showModal, setShowModal] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [error, setError] = useState(null)

    const handleDelete = async () => {

        setConfirmDelete(true)
        setError(null)
        try {
            await axios.delete(`http://localhost:8000/track/${trackId}`, {
                withCredentials: true,
            })

            if (onDeleted) {
                onDeleted(trackId)
            }

            setShowModal(false)
        } catch (err) {
            setError(err.message)
        } finally {
            setConfirmDelete(false)
        }
    }

    return (
        <>
            <button
                className="DeleteButton" onClick={() => setShowModal(true)}> x </button>

            {showModal && (
                <div className="ModalBackground">
                    <div className="ModalConfirm">
                        <h3>Delete track?</h3>
                        <p>Are you sure you want to delete {trackTitle || 'this track'}?</p>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div id="buttonContainer">
                            <button id="ConfirmButton" onClick={handleDelete} disabled={confirmDelete}> {confirmDelete ? 'Deleting...' : 'Yes, delete'}</button>
                            <button id="CancelButton" onClick={() => setShowModal(false)}> Cancel </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DeleteTrack
