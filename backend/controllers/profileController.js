//import Profile from "../models/Profile.js"; // Adjust the path if necessary

// Add a new profile
export const addProfile = async (req, res) => {
  try {
    const {
      firstName, lastName, email, street,
      city, state, zipcode, country, phone, userId,
    } = req.body;

    if (!firstName || !lastName || !email || !street || !city || !state || !zipcode || !country || !phone || !userId) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    const existingProfile = await Profile.findOne({ email });
    if (existingProfile) {
      return res.status(400).json({ success: false, message: "Profile with this email already exists!" });
    }

    const newProfile = new Profile({ firstName, lastName, email, street, city, state, zipcode, country, phone, userId });
    await newProfile.save();

    res.status(201).json({ success: true, data: newProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error while creating profile" });
  }
};

// Fetch all profiles for a specific user
export const fetchAllProfiles = async (req, res) => {
  try {
    const { userId } = req.params;
    const profiles = await Profile.find({ userId });

    res.status(200).json({ success: true, data: profiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error while fetching profiles" });
  }
};

// Edit a profile
export const editProfile = async (req, res) => {
  try {
    const { userId, profileId } = req.params;
    const formData = req.body;

    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: profileId, userId },
      formData,
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({ success: true, data: updatedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error while updating profile" });
  }
};

// Delete a profile
export const deleteProfile = async (req, res) => {
  try {
    const { userId, profileId } = req.params;

    const deletedProfile = await Profile.findOneAndDelete({ _id: profileId, userId });
    if (!deletedProfile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({ success: true, message: "Profile deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error while deleting profile" });
  }
};
