const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  Cake_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cake",
  },

  Price: {
    type: Number,
  },

  Quantity:{
    type: Number,
    required: true, // Track the quantity of each item in the cart
    min: [1, "Quantity must be at least 1"], // Ensure quantity is at least 1
  }
});

const cartSchema = new mongoose.Schema({
  User_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  Items: [cartItemSchema],

  Total_Price: {
    type: Number,
  },
});

export default mongoose.model("Cart", cartSchema);
