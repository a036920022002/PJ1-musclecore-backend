const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    employeeNumber:{
        type:String,
        unique: true,
        required:true
    },
    name:{
        type:String
    },
    password:{
        type:String,
        trim: true,
        minlength: 6,         // 最小長度
    },
    role:{
        type:String,
        enum:["Employee","Boss"]

    }
});

module.exports = mongoose.model('Admin', adminSchema);