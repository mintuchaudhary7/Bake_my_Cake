const mongoose = require('mongoose');

orderSchema.pre("save", function (next) {
  this.Total_Price = this.Items.reduce(
    (total, item) => total + item.Price * item.Quantity,
    0
  );
  next();
});

const orderItemSchema = new mongoose.Schema({
  cake_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cake", // Reference to the Cake model
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },

    items: {
      type: [orderItemSchema],
      validate: {
        validator: function (items) {
          return items.length > 0; // Ensure at least one item is present
        },
        message: "Order must contain at least one item.",
      },
    },
    total_Price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Delivered"],
    },

    address: {
      type: String,
      required: true,
    },

    payment_Status: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    delivery_Date: {
      type: Date,
      required: true,
    },
    special_Message: {
      type: String,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Order", orderSchema);