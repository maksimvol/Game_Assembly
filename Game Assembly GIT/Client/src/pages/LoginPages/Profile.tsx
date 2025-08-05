import { useState } from "react";
import "../../components/Style/Profile.css"
import { useNavigate } from "react-router-dom";

const Profile = ({ user, onLogout }: any) => {
    const navigate = useNavigate();

    if (!user) {
        navigate("/login");
        return null;
    }

    console.log(user);

    return (
        <div className="profileContainer">
            <h1>Profile</h1>
            <div className="profileDetails">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </div>
            <button onClick={onLogout} className="logoutButton">Logout</button>
        </div>
    );
  };
  
  export default Profile;