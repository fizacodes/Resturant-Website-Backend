import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/admin.js";
import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);

    // Hash the password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create admin
    const admin = new User({
      name:"admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("Admin created successfully!");
    
    // Disconnect
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

createAdmin();
