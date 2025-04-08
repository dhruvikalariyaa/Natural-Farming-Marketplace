import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const FarmerContext = createContext();

const FarmerContextProvider = ({ children }) => {
  const backendUrl = "http://localhost:5000";

  const [fToken, setFToken] = useState(localStorage.getItem("fToken") || "");
  const [farmerData, setFarmerData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Farmer Data
  const fetchFarmerData = async () => {
    if (!fToken) return;

    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/farmer/me`, {
        headers: { Authorization: `Bearer ${fToken}` },
      });

      if (data.success) {
        setFarmerData(data.farmer);
      } else {
        toast.error(data.message);
        logoutFarmer(); // Logout if invalid token
      }
    } catch (error) {
      console.error("Error fetching farmer data:", error);
      toast.error("Failed to fetch farmer data. Please log in again.");
      logoutFarmer(); // Logout on error
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Farmer's Products
  const getAllProducts = async () => {
    if (!fToken) {
      toast.warn("Please log in to view your products.");
      return;
    }

    if (!farmerData) {
      setTimeout(getAllProducts, 500); // Wait until `farmerData` is available
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/products/farmer/${farmerData._id}`, {
        headers: { Authorization: `Bearer ${fToken}` },
      });

      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login Farmer
  const loginFarmer = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/farmer/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (data.success) {
        setFToken(data.token);
        localStorage.setItem("fToken", data.token);
        setFarmerData(data.farmer);
        toast.success("Login successful");

        setTimeout(() => getAllProducts(), 500); // Ensure `fToken` is updated before fetching products
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout Farmer
  const logoutFarmer = () => {
    setFToken("");
    localStorage.removeItem("fToken");
    setFarmerData(null);
    setProducts([]);
    toast.success("Logged out successfully");
  };

  // ✅ Check Token Expiry
  useEffect(() => {
    if (fToken) {
      try {
        const decodedToken = jwtDecode(fToken);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          toast.warn("Session expired. Please log in again.");
          logoutFarmer();
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("Invalid token. Please log in again.");
        logoutFarmer();
      }
    }
  }, [fToken]);

  // ✅ Fetch Farmer Data When Token Changes
  useEffect(() => {
    if (fToken) {
      fetchFarmerData();
    }
  }, [fToken]);
  
  useEffect(() => {
    console.log("Updated Farmer Data:", farmerData); // ✅ Debugging
  }, [farmerData]);
  

  return (
    <FarmerContext.Provider
      value={{
        fToken,
        setFToken,
        farmerData,
        setFarmerData,
        products,
        getAllProducts,
        loginFarmer,
        logoutFarmer,
        loading,
      }}
    >
      {children}
    </FarmerContext.Provider>
  );
};

export { FarmerContext, FarmerContextProvider };
