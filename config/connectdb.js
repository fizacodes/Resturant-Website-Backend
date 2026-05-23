
import mongoose from "mongoose";

let isConnected = false;

const connectdb = async () => {
  try {
    if (isConnected) {
      return;
    }

    const conn = await mongoose.connect(process.env.MONGO_URL);

    isConnected = conn.connections[0].readyState === 1;

    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    console.error("MongoDB Error:", error.message);
    throw error;
  }
};

export default connectdb;

