import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const backendUrl = "http://localhost:5000";

    const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken") || "");
    const [adminData, setAdminData] = useState(null);
    const [farmers, setFarmers] = useState([]);
    const [products, setProducts] = useState([]);

    // Sync adminToken with localStorage
    useEffect(() => {
        if (adminToken) {
            localStorage.setItem("adminToken", adminToken);
        } else {
            localStorage.removeItem("adminToken");
        }
    }, [adminToken]);

    // Fetch Admin Profile Data
    // const getAdminProfile = async () => {
    //     if (!adminToken) return;
    //     try {
    //         const { data } = await axios.get(`${backendUrl}/api/admin/profile`, {
    //             headers: { Authorization: `Bearer ${adminToken}` },
    //         });
    //         if (data.success) {
    //             setAdminData(data.admin);
    //         } else {
    //             toast.error(data.message);
    //         }
    //     } catch (error) {
    //         toast.error("Failed to fetch admin profile");
    //         console.error(error);
    //     }
    // };

    // Fetch All Farmers
    const fetchFarmers = async () => {
        if (!adminToken) return;
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/farmer`, {
                headers: { Authorization: `Bearer ${adminToken}` },
            });
            setFarmers(data.farmers);
        } catch (error) {
            toast.error("Failed to fetch farmers");
            console.error(error);
        }
    };

    // Approve Farmer
    const approveFarmer = async (farmerId) => {
        if (!adminToken) return;
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/admin/farmer/approve/${farmerId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${adminToken}` },
                }
            );
            if (data.success) {
                toast.success("Farmer approved successfully");
                fetchFarmers();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error approving farmer");
            console.error(error);
        }
    };

    // Delete Farmer
    const deleteFarmer = async (farmerId) => {
        if (!adminToken) return;
        try {
            await axios.delete(`${backendUrl}/api/admin/farmer/${farmerId}`, {
                headers: { Authorization: `Bearer ${adminToken}` },
            });
            setFarmers((prevFarmers) => prevFarmers.filter((farmer) => farmer._id !== farmerId));
            toast.success("Farmer deleted successfully");
        } catch (error) {
            toast.error("Error deleting farmer");
            console.error(error);
        }
    };

    // Fetch All Products
    const fetchProducts = async () => {
        if (!adminToken) return;
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/products`, {
                headers: { Authorization: `Bearer ${adminToken}` },
            });
            setProducts(data.products);
        } catch (error) {
            toast.error("Failed to fetch products");
            console.error(error);
        }
    };

    // Delete Product
    const deleteProduct = async (productId) => {
        if (!adminToken) return;
        try {
            await axios.delete(`${backendUrl}/api/admin/products/${productId}`, {
                headers: { Authorization: `Bearer ${adminToken}` },
            });
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
            toast.success("Product deleted successfully");
        } catch (error) {
            toast.error("Error deleting product");
            console.error(error);
        }
    };

    return (
        <AdminContext.Provider
            value={{
                adminToken,
                setAdminToken,
                adminData,
                // getAdminProfile,
                farmers,
                fetchFarmers,
                approveFarmer,
                deleteFarmer,
                products,
                fetchProducts,
                deleteProduct,
                backendUrl,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};

export { AdminContext, AdminContextProvider }; // ✅ Fixed typo
