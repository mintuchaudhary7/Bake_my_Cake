const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  Size: {
    type: String,
    enum: ["Small", "Medium", "Large", "Extra Large"], // Define valid sizes
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
})

const cakeSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Flavour: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Price: {
    type: [priceSchema]
  },
  Image_Url: {
    type: String,
    required: true,
  },
  IsAvailable:{
    type: Boolean,
    default: true
  }
});

export default mongoose.model("Cake", cakeSchema);