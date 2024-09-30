import foodModel from "../models/foodModel.js";
import restaurantModel from "../models/restaurantModel.js"; // Import restaurant model
import fs from 'fs';

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({}).populate('restaurantId');
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error retrieving food items" });
    }
};

// Add food
const addFood = async (req, res) => {
    try {
        const { name, description, price, category, restaurantId } = req.body;

        // Check if restaurant exists
        const restaurant = await restaurantModel.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ success: false, message: "Restaurant not found" });
        }

        let image_filename = req.file ? `${req.file.filename}` : null;

        const food = new foodModel({
            name,
            description,
            price,
            category,
            image: image_filename,
            restaurantId
        });

        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding food item" });
    }
};

// Delete food
const removeFood = async (req, res) => {
    try {
        const { id } = req.body;

        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        if (food.image) {
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) console.error('Error removing image file:', err);
            });
        }

        await foodModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Food Removed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing food item" });
    }
}

export { listFood, addFood, removeFood };
