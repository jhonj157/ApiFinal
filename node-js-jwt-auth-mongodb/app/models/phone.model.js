const mongoose = require("mongoose");

const Phone = mongoose.model(
  "Phone",
  new mongoose.Schema({
    brand: String,
    model: String,
    storage: Number,
    color: String,
    operating_system: String,
    price: Number,
    active: Boolean
  },
  { timestamps: { createdAt: 'created_at' } }
  )
);

module.exports = Phone;
