import foodModel from '../models/foodModel.js';
import restaurantModel from '../models/restaurantModel.js';

// Function to handle general search
export const search = async (req, res) => {
  try {
    const query = req.query.query || '';

    if (!query.trim()) {
      return res.json({ data: { foodItems: [], restaurants: [] } });
    }

    // Search for restaurants by name
    const restaurants = await restaurantModel.find({
      name: { $regex: query, $options: 'i' }
    }).select('_id name');  // Only fetch _id and name to avoid fetching unnecessary data

    // Search for food items by name, description, or restaurant association
    const foodItems = await foodModel.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { restaurantId: { $in: restaurants.map(restaurant => restaurant._id) } }
      ]
    }).populate('restaurantId', 'name');  // Populate only restaurant name

    return res.json({
      data: {
        foodItems: foodItems.length ? foodItems : [],
        restaurants: restaurants.length ? restaurants : []
      }
    });

  } catch (error) {
    console.error('Error fetching search results:', error.message);  // Log error message
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Function to handle suggestions
export const getSuggestions = async (req, res) => {
  try {
    const query = req.query.query || '';

    if (!query.trim()) {
      return res.json({ suggestions: [] });
    }

    // Fetch restaurant name suggestions
    const restaurantSuggestions = await restaurantModel.find({
      name: { $regex: query, $options: 'i' }
    }).select('_id name').limit(5);  // Limit suggestions to 5

    // Fetch food item name suggestions
    const foodSuggestions = await foodModel.find({
      name: { $regex: query, $options: 'i' }
    }).select('_id name').limit(5);  // Limit suggestions to 5

    const suggestions = [
      ...restaurantSuggestions.map(item => ({ id: item._id, name: item.name, type: 'restaurant' })),
      ...foodSuggestions.map(item => ({ id: item._id, name: item.name, type: 'food' })),
    ];

    return res.json({ suggestions });

  } catch (error) {
    console.error('Error fetching suggestions:', error.message);  // Log error message
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
