import express from 'express';
import { createRestaurant, listRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant } from '../controllers/restaurantController.js';

const restaurantRouter = express.Router();

// Create a new restaurant
restaurantRouter.post("/add", createRestaurant);

// List all restaurants
restaurantRouter.get("/list", listRestaurants);

// Get a restaurant by ID
restaurantRouter.get("/:id", getRestaurantById);

// Update a restaurant by ID
restaurantRouter.put("/:id", updateRestaurant);

// Delete a restaurant by ID
restaurantRouter.delete("/:id", deleteRestaurant);

export default restaurantRouter;
