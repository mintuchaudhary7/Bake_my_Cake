const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  size: {
    type: String,
    enum: ["Small", "Medium", "Large", "Extra Large"], // Define valid sizes
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
})

const cakeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  flavour: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: [priceSchema]
  },
  image_Url: {
    type: String,
    required: true,
  },
  isAvailable:{
    type: Boolean,
    default: true
  }
});

export default mongoose.model("Cake", cakeSchema);