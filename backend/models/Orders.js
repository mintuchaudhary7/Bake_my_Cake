const mongoose = require('mongoose');

orderSchema.pre("save", function (next) {
  this.Total_Price = this.Items.reduce(
    (total, item) => total + item.Price * item.Quantity,
    0
  );
  next();
});

const orderItemSchema = new mongoose.Schema({
  Cake_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cake", // Reference to the Cake model
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    User_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },

    Items: {
      type: [orderItemSchema],
      validate: {
        validator: function (items) {
          return items.length > 0; // Ensure at least one item is present
        },
        message: "Order must contain at least one item.",
      },
    },
    Total_Price: {
      type: Number,
      required: true,
    },

    Status: {
      type: String,
      enum: ["Pending", "Delivered"],
    },

    Address: {
      type: String,
      required: true,
    },

    Payment_Status: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    Delivery_Date: {
      type: Date,
      required: true,
    },
    Special_Message: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
