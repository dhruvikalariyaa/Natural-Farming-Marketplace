import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyProfile.css"; // Import the CSS file

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: { line1: "", line2: "" },
    gender: "",
    dob: "",
    image: null,
  });

  // Fetch user profile data
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserData(response.data.user);
      setFormData({
        name: response.data.user.name,
        phone: response.data.user.phone,
        address: {
          line1: response.data.user.address?.line1 || "",
          line2: response.data.user.address?.line2 || "",
        },
        gender: response.data.user.gender || "",
        dob: response.data.user.dob ? response.data.user.dob.split("T")[0] : "",
        image: null,
      });
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch profile");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "line1" || name === "line2") {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address", JSON.stringify(formData.address));
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("dob", formData.dob);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await axios.put(
        "http://localhost:5000/api/user/profile",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Profile updated successfully!");
      setUserData(response.data.user); // Update profile immediately
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {userData && (
        <div className="profile-details">
          <div className="image-wrapper">
            <img
              src={userData.image || "/default-profile.png"} // Fallback image
              alt="Profile"
              className="profile-image"
            />
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Address Line 1:</label>
                <input
                  type="text"
                  name="line1"
                  value={formData.address.line1}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Address Line 2:</label>
                <input
                  type="text"
                  name="line2"
                  value={formData.address.line2}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Gender:</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label>Date of Birth:</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Profile Image:</label>
                <input type="file" name="image" onChange={handleFileChange} />
              </div>
              <button type="submit" className="save-button">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {userData.name}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Phone:</strong> {userData.phone}
              </p>
              <p>
                <strong>Address:</strong> {userData.address?.line1}, {userData.address?.line2}
              </p>
              <p>
                <strong>Gender:</strong> {userData.gender}
              </p>
              <p>
                <strong>Date of Birth:</strong> {userData.dob}
              </p>
              <button onClick={() => setIsEditing(true)} className="edit-button">
                Edit Profile
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MyProfile;
