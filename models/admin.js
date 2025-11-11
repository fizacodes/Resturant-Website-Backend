import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // ideally hashed
  role: { type: String, default: "admin" },
});

const admin = mongoose.model("Admin", adminSchema);

export default admin;