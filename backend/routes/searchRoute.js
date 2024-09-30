import express from 'express';
import { search, getSuggestions } from '../controllers/searchController.js';

const router = express.Router();

// Define the search route
router.get('/search', search);

// Define the suggestions route
router.get('/search/suggestions', getSuggestions); // New route for suggestions

export default router;
