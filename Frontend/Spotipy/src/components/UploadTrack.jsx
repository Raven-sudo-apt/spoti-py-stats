import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

function UploadTrack({ onClose }) {
    const { loading, error } = useAuth()
    const [data, setData] = useState( { track: null } )
    const [uploading, setUploading] = useState(false)
    const [localError, setLocalError] = useState(null)

    const handleChange = (event) => {
        const { files } = event.target
        setData({ track: files[0] })
        console.log(files)
    }

    const handleUpload = async (event) => {
        event.preventDefault()
        if (!data.track) {
            setLocalError('Please choose a file')
            return
        }

        setUploading(true)
        setLocalError(null)
        try {
            const form = new FormData()
            form.append('track_file', data.track)

            await axios.post('http://localhost:8000/track/upload/', form, {
                withCredentials: true,
            })
            
            setData({ track: null })
            onClose()
        } catch (err) {
            setLocalError(err.message || 'Error uploading file')
        } finally {
            setUploading(false)
            window.location.reload()    
        }
    }

    return (
        <div className="ModalBackground">
            <form className='ModalConfirm' onSubmit={handleUpload}>

                <h2>Add New Track</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}> 
                <label htmlFor='track'>Choose File</label>
                <input className="fileInput" onClick={() => setLocalError(null)} type="file" name="track" id="track" onChange={handleChange} accept="audio/*" required />
                {data.track && <p>Selected File: {data.track.name}</p>}
                </div>
                {(localError || error) && <p style={{ color: 'red' }}>Error: {localError || error}</p>}
                <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
                    <button id='ConfirmButton' type="submit" disabled={uploading || loading}>{uploading ? "Uploading..." : "Upload"}</button>
                    <button id='CancelButton' type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>

            
        </div>
    )
}

export default UploadTrack
