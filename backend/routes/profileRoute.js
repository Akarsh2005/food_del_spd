import express from "express";
import {
  addProfile,
  fetchAllProfiles,
  editProfile,
  deleteProfile,
} from "../controllers/profileController.js"; // Adjust the path if necessary

const router = express.Router();

// Route to add a new profile
router.post("/add", addProfile);

// Route to get all profiles for a user
router.get("/get/:userId", fetchAllProfiles);

// Route to update a profile by userId and profileId
router.put("/update/:userId/:profileId", editProfile);

// Route to delete a profile by userId and profileId
router.delete("/delete/:userId/:profileId", deleteProfile);

export default router;
