import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FarmerContext } from '../../context/FarmerContext';
import './FarmerProfile.css';

const FarmerProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true); // Prevents continuous re-renders
  const { fToken } = useContext(FarmerContext);
  const backendUrl = "http://localhost:5000";

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/farmer/me`, {
          headers: { Authorization: `Bearer ${fToken}` },
        });
        setProfileData(data.farmer);
        setLoading(false); // Data fetched successfully
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
        setLoading(false);
      }
    };

    if (loading) fetchProfileData(); // Fetch data only once
  }, [fToken, loading]);

  if (loading) return <p>Loading...</p>; // Prevents blinking effect

  return (
    <div className="farmer-profile">
      <h1>Farmer Profile</h1>
      <div className="profile-details">
        <label>Name:</label>
        <p>{profileData?.name}</p>
        
        <label>Email:</label>
        <p>{profileData?.email}</p>
        
        <label>Mobile Number:</label>
        <p>{profileData?.mobileno}</p>
        
        <label>Address:</label>
        <p>{profileData?.address}</p>
        
        <label>Profile Image:</label>
        {profileData?.image ? (
          <img 
            src={`${backendUrl}/uploads/${profileData.image}`} 
            alt="Profile" 
            className="profile-image"
            onError={(e) => { e.target.onerror = null; e.target.src = '/default-profile.png'; }}
          />
        ) : (
          <p>No profile image available</p>
        )}
      </div>
    </div>
  );
};

export default FarmerProfile;
