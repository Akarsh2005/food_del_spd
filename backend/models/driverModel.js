import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true }
});

const driverModel = mongoose.models.driver || mongoose.model("driver", driverSchema);
export default driverModel;
