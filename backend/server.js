import express from "express";
import cors from "cors";
import 'dotenv/config';
import { connectDB } from "./config/db.js";
import path from "path";

// Import route modules
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import restaurantRouter from "./routes/restaurantRoute.js";
import driverRouter from "./routes/driverRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import profileRouter from "./routes/profileRoute.js";
import searchRouter from "./routes/searchRoute.js"; // Added search route

// Initialize express app
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Connect to the database
connectDB();

// Define routes
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/driver", driverRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/profile", profileRouter);
app.use("/api/search", searchRouter); // Added search route

// Serve static files (e.g., images)
app.use("/images", express.static(path.join(process.cwd(), 'uploads')));

// Basic route for testing
app.get("/", (req, res) => {
    res.send("API is working");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
