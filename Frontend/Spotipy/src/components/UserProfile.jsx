import axios from "axios";
import { useParams } from "react-router-dom";
import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile() {
    const { id } = useParams();
    const { user, loading, error, logout } = useAuth()
    const [userProfile, setUser] = useState(null);


      useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/user/${id}`, {
              withCredentials: true
            });
            setUser(response.data);
          } catch (err) {
            console.error("Error fetching user profile:", err);
            setUser(null);
          } 
        };
        fetchUserProfile();
      }, [id]);
    return (
        <div>
        <div className="homelogo" style={{display: "flex", gap: "20px", alignItems: "center"}}>
        <Link to="/"><img id="logo" src="../../src/assets/spotipy.png" alt="Spoti.py Logo" /></Link>
        </div>
        <div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {user && (
            <div>
                <h2>{user.username}'s Profile</h2>
                <p>Email: {user.email}</p>
                <p>Joined: {user.created_at}</p>
            </div>
        )}
        </div>
        </div>
    )
}

export default UserProfile;