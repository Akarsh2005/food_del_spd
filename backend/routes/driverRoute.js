import express from 'express';
import { createDriver, listDrivers, getDriverById, updateDriver, deleteDriver, searchDriver } from '../controllers/driverController.js';

const driverRouter = express.Router();

// Create a new driver
driverRouter.post("/add", createDriver);

// List all drivers
driverRouter.get("/list", listDrivers);

// Get a driver by ID
driverRouter.get("/:id", getDriverById);

// Update a driver by ID
driverRouter.put("/:id", updateDriver);

// Delete a driver by ID
driverRouter.delete("/:id", deleteDriver);

// Search drivers
driverRouter.get("/search", searchDriver);

export default driverRouter;
