import React, { useEffect, useState } from "react";
import axios from "axios";
import "./showfarmer.css";

const Showfarmer = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/farmer");
        
        console.log("API Response:", response.data); // Log full response
        
        if (Array.isArray(response.data.farmers)) {
          setFarmers(response.data.farmers);
        } else {
          console.error("Farmers data is not an array:", response.data.farmers);
        }
      } catch (error) {
        console.error("Error fetching farmers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  return (
    <div className="farmer-container">
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <table className="farmer-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Certificate</th>
            </tr>
          </thead>
          <tbody>
            {farmers.length > 0 ? (
              farmers.map((farmer, index) => (
                <tr key={farmer._id}>
                  <td>{index + 1}</td>
                  <td>{farmer.name || "N/A"}</td>
                  <td>{farmer.email || "N/A"}</td>
                  <td>{farmer.phone || farmer.mobileno || "N/A"}</td>
                  <td className={farmer.isApproved ? "approved" : "pending"}>
                    {farmer.isApproved ? "Approved" : "Pending"}
                  </td>
                  <td>
                    {farmer.file ? (
                      <a href={farmer.file} target="_blank" rel="noopener noreferrer">
                        View Certificate
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">No Farmers Found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Showfarmer;
