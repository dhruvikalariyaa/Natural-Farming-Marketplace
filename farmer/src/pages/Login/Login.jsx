import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FarmerContext } from "../../context/FarmerContext";
import "./Login.css";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { fToken, setFToken } = useContext(FarmerContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    file: "",
    mobileno: "",
    address: "",
    image: "",
  });
  const [filePreview, setFilePreview] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (fToken) {
      navigate("/home");
    }
  }, [fToken, navigate]);

  useEffect(() => {
    if (!isLogin) {
      startCamera();
    }
  }, [isLogin]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      alert("Camera access denied! Allow camera permission.");
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    // Capture image from video stream
    canvas.width = 200;
    canvas.height = 200;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to base64
    const imageData = canvas.toDataURL("image/png");
    setFormData({ ...formData, image: imageData });
    setImagePreview(imageData);

    // Stop video stream after capture
    stopCamera();
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop()); // Stop each track
      videoRef.current.srcObject = null; // Remove video source
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size should be less than 10MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, file: reader.result });
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? "http://localhost:5000/api/farmer/login"
        : "http://localhost:5000/api/farmer/register";
      const { data } = await axios.post(url, formData);
      if (isLogin) {
        if (!data.farmer.isApproved) {
          alert("Admin approval pending");
          return;
        }
        setFToken(data.token);
        alert("Login Successful");
        navigate("/home");
      } else {
        alert("Registration Successful, Wait for Admin Approval");
        setIsLogin(true);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <div className="auth-box">
        <h2 className="title">{isLogin ? "Farmer Login" : "Farmer Registration"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Name" onChange={handleChange} className="input-field" required />
              </div>
              <div className="form-group">
                <label htmlFor="mobileno">Mobile No:</label>
                <input type="text" id="mobileno" name="mobileno" placeholder="Mobile No" onChange={handleChange} className="input-field" required />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input type="text" id="address" name="address" placeholder="Address" onChange={handleChange} className="input-field" required />
              </div>

              {/* Camera Capture */}
              <div className="form-group">
                <label>Profile Picture:</label>
                {!imagePreview ? (
                  <>
                    <video ref={videoRef} autoPlay className="video-preview"></video>
                    <button type="button" className="capture-btn" onClick={captureImage}>Capture Photo</button>
                  </>
                ) : (
                  <img src={imagePreview} alt="Captured Image" className="image-preview" />
                )}
                <canvas ref={canvasRef} width="200" height="200" style={{ display: "none" }}></canvas>
              </div>

              <div className="form-group">
                <label htmlFor="file">Certificate:</label>
                <input type="file" id="file" name="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="input-field" required />
                {filePreview && <a href={filePreview} target="_blank" rel="noopener noreferrer">View Certificate</a>}
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Email" onChange={handleChange} className="input-field" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Password" onChange={handleChange} className="input-field" required />
          </div>
          <button type="submit" className="submit-btn">{isLogin ? "Login" : "Register"}</button>
        </form>
        <p className="toggle-text">
          {isLogin ? "New Farmer? " : "Already registered? "}
          <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register Here" : "Login Here"}
          </button>
        </p>
      </div>
    </div>
  );
}
