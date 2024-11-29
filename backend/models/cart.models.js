const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  cake_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cake",
  },

  price: {
    type: Number,
  },

  quantity:{
    type: Number,
    required: true, // Track the quantity of each item in the cart
    min: [1, "Quantity must be at least 1"], // Ensure quantity is at least 1
  }
});

const cartSchema = new mongoose.Schema({
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  items: [cartItemSchema],

  total_Price: {
    type: Number,
  },
});

module.exports = mongoose.model("Cart", cartSchema);