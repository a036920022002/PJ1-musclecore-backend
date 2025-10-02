const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  gender:{
    type:String,
    enum:['male','female','other']
  },
  email: {
    type: String,
    required: true,
    unique: true, // 不允許重複
    lowercase: true
  },
  birth: {
  type: Date,
},
  phone:{
    type:String,
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role:{
    type:String,
    default:'customer',
    enum:['customer','canceled','other']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Member', memberSchema);