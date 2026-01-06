import React from 'react'

export default function displayArists() {
  return (
    <div>
        <p style={{fontSize: "24px", fontWeight: "bold"}}>Artists</p>
        <div style={{display: "flex", flexWrap: "wrap", gap: "20px"}}>
            {/* Example Artist Card */}
            <div style={{width: "150px", textAlign: "center"}}>
                <img src="https://via.placeholder.com/150" alt="Artist" style={{width: "100%", borderRadius: "50%"}} />
                <p style={{marginTop: "10px", fontWeight: "bold"}}>Artist Name</p>
            </div>
            {/* Repeat Artist Cards as needed */}
        </div>
    </div>
  )
}
