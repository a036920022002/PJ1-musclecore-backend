const mongoose = require('mongoose');
require('dotenv').config();

console.log('MONGO_URI:',process.env.MONGO_URI);


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ 成功連接 MongoDB');
  } catch (err) {
    console.error('❌ MongoDB 連線失敗：', err);
    process.exit(1);
  }
};

module.exports = connectDB;


