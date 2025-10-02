const Order=require('../models/order')
const jwt = require('jsonwebtoken')

//後台商品清單
const getorder= async (req, res) => {
  try {
    const order = await Order.find();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: '讀取訂單失敗', error });
  }
};

//後台點選訂單詳細
const getorderId= async (req,res)=>{
 try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ message: '訂單不存在' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
}};

//後台訂單狀態更新
const changeOrderStatus=async(req,res)=>{
    try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["處理中", "已寄出"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const order = await Order.findOne({ orderId });
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}



//使用者結帳生成訂單
const orderSave = async(req,res)=>{
  try {
    const { items, total, customerInfo, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "訂單商品不可為空" });
    }
    const orderId = req.serialNumber || null;
    const order = new Order({
      orderId,
      items,
      total,
      customerInfo,
      paymentMethod,
      userId: req.user ? req.user.id : null, // 如果有 token → 存 userId
    });

    await order.save();

    res.status(201).json({
      message: "訂單建立成功",
      orderId: order._id,
      order,
    });
  } catch (error) {
    console.error("建立訂單失敗:", error);
    res.status(500).json({ message: "建立訂單失敗", error: error.message });
  }
};

//會員個人訂單
const memberorder = async(req,res)=>{
 try {
  console.log("req.user",req.user)
  const userId = req.user.userId;
  const orders = await Order.find({ userId }).sort({ createdAt: -1 }); // 只抓自己的
  res.json(orders);
 }catch (error) {
    res.status(500).json({ message: "查詢訂單失敗", error });
  }
}

module.exports ={getorder,getorderId,orderSave,changeOrderStatus,memberorder};