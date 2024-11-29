const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    enum: ["Admin", "Customer"],
    default: "Customer",
  },
  address: {
    type: String,
    required: true
  },
  order_History: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order", // Reference to the Order schema
    },
  ]
}, {timestamps: true});

export default mongoose.model("User", userSchema);