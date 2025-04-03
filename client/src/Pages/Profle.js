import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";  

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken"); 
    navigate("/"); 
  };

  return (
    <div>

    <div className="profile-container">
      <div className="profile-icon" onClick={toggleDropdown}>
        <h2>Profile</h2>
        <img src="https://i.pinimg.com/474x/3d/91/09/3d910919cf4d41c1114457504dc29201.jpg" alt="Profile" /> 
        <p>Welcome you back</p>
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <button id="l" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default Profile;