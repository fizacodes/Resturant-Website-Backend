import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Preparing", "Ready", "Delivered", "Cancelled"],
    default: "Pending"
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split("T")[0]
  },
  time: {
    type: String,
    default: () => new Date().toLocaleTimeString()
  }
});

export default mongoose.model("Order", orderSchema);
