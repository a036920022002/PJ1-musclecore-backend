const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // 例如 "orderNumber"
  seq: { type: Number, default: 0 }
});

module.exports = mongoose.model("Counter", counterSchema);