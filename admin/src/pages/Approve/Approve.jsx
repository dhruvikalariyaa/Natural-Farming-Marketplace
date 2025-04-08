import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './approve.css';
const Approve = () => {
  const [farmers, setFarmers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch farmers from API
  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/farmer");
        console.log("API Response:", response.data); // Debugging
        setFarmers(response.data.farmers); // ✅ Extract the array
      } catch (error) {
        console.error("Error fetching farmers:", error);
        setError("Error fetching farmers. Please try again later.");
      }
    };

    fetchFarmers();
  }, []);

  // Approve Farmer
  const approveFarmer = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/farmer/approve/${id}`);

      // ✅ Correct way to update state based on the previous state
      setFarmers(prevFarmers =>
        prevFarmers.map(farmer =>
          farmer._id === id ? { ...farmer, isApproved: true } : farmer
        )
      );
    } catch (error) {
      console.error("Error approving farmer:", error);
      setError("Error approving farmer. Please try again later.");
    }
  };

  console.log("Farmers:", farmers);
  return (
    <div className="approve-farmers-container">
      {error && <p className="error-message">{error}</p>}
      <table className="farmers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {farmers.length > 0 ? (
            farmers.map(farmer => (
              <tr key={farmer._id}>
                <td>{farmer.name}</td>
                <td>{farmer.email}</td>
                <td>{farmer.isApproved ? "✅ Approved" : " Pending"}</td>
                <td>
                  {!farmer.isApproved && (
                    <button className="approve-btn" onClick={() => approveFarmer(farmer._id)}>
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No farmers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Approve;