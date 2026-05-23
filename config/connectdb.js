import mongoose from "mongoose";

const connectdb = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error('MONGO_URL is required');
  }

  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export default connectdb;