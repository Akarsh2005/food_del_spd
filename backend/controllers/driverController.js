import driverModel from "../models/driverModel.js";

// List all drivers
const listDrivers = async (req, res) => {
    try {
        const drivers = await driverModel.find({});
        res.json({ success: true, data: drivers });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error retrieving drivers" });
    }
};

// Create a new driver
const createDriver = async (req, res) => {
    try {
        const { name, phone, location, email } = req.body;
        if (!name || !phone || !location || !email) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newDriver = new driverModel({ name, phone, location, email });
        await newDriver.save();

        res.status(201).json({ success: true, data: newDriver });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error creating driver" });
    }
};

// Get a single driver by ID
const getDriverById = async (req, res) => {
    try {
        const { id } = req.params;
        const driver = await driverModel.findById(id);
        if (!driver) {
            return res.status(404).json({ success: false, message: "Driver not found" });
        }
        res.json({ success: true, data: driver });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error retrieving driver" });
    }
};

// Update a driver by ID
const updateDriver = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, location, email } = req.body;

        const updatedDriver = await driverModel.findByIdAndUpdate(id, { name, phone, location, email }, { new: true });
        if (!updatedDriver) {
            return res.status(404).json({ success: false, message: "Driver not found" });
        }
        res.json({ success: true, data: updatedDriver });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating driver" });
    }
};

// Delete a driver by ID
const deleteDriver = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDriver = await driverModel.findByIdAndDelete(id);
        if (!deletedDriver) {
            return res.status(404).json({ success: false, message: "Driver not found" });
        }
        res.json({ success: true, message: "Driver deleted" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error deleting driver" });
    }
};

// Search drivers by name, location, or email
const searchDriver = async (req, res) => {
    try {
        const { query } = req.query;
        const drivers = await driverModel.find({
            $or: [
                { name: { $regex: query, $options: "i" } }, // Search by driver name
                { location: { $regex: query, $options: "i" } }, // Search by driver location
                { email: { $regex: query, $options: "i" } } // Search by driver email
            ]
        });

        res.json({ success: true, data: drivers });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error searching drivers" });
    }
};

export { createDriver, listDrivers, getDriverById, updateDriver, deleteDriver, searchDriver };
