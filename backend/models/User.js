import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Role:{
    type: String,
    enum: ["Admin", "Customer"],
    default: "Customer",
  },
  Address: {
    type: String,
    required: true
  },
  Order_History: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order", // Reference to the Order schema
    },
  ]
}, {timestamps: true});

export default mongoose.model("User", userSchema);