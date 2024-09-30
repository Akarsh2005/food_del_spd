import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose
    .connect(process.env.URI)
    .then(() => {
      console.log("db connected successfully");
    })
    .catch((err) => {
      console.error("Connection failed", err);
    });
};
