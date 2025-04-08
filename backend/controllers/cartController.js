import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import User from "../models/userModel.js";

/**
 * @desc    Get user cart
 * @route   GET /api/cart
 * @access  Private
 */
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate("cartItems.product", "name price image");
        if (!cart) return res.status(200).json({ message: "Cart is empty", cart: [] });

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error: error.message });
    }
};

/**
 * @desc    Add item to cart
 * @route   POST /api/cart
 * @access  Private
 */
export const addToCart = async (req, res) => {
    try {
        const { productId, qty } = req.body;
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = new Cart({ user: req.user._id, cartItems: [] });
        }

        const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            // Product exists, update quantity
            cart.cartItems[itemIndex].qty += qty;
        } else {
            // Add new item
            cart.cartItems.push({
                product: product._id,
                name: product.name,
                qty,
                price: product.price,
                image: product.image
            });
        }

        // Recalculate total price
        cart.totalPrice = cart.cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);

        await cart.save();
        res.status(200).json({ message: "Item added to cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Error adding item to cart", error: error.message });
    }
};

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/cart/:productId
 * @access  Private
 */
export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== productId);

        // Recalculate total price
        cart.totalPrice = cart.cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);

        await cart.save();
        res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Error removing item from cart", error: error.message });
    }
};