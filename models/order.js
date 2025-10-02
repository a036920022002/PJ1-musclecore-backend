const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  productId: Number,
  productName: String,
  productPrice: Number,
  quantity: Number
});

const orderSchema = new mongoose.Schema({
   orderId:{ type: String, unique: true },
   items: { type: [itemSchema], required: true },
   total: { type: Number,required: true},
   customerInfo: {
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  paymentMethod: { type: String, default: "unknown" },
  status: {
    type:String,
    enum:['處理中','已寄出'],
    default:"處理中"},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('orders', orderSchema);