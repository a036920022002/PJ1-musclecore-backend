const Admin=require('../models/admin')
const bcrypt = require('bcrypt');

const getadmin=async (req, res) => {
  try {
    const admin = await Admin.find();
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: '讀取會員失敗', error });
  }
};

const postadmin= async (req, res) => {//登入時比對

  try {
    const { employeeNumber, password } = req.body;
    const admin = await Admin.findOne({ employeeNumber});

    if (!admin) {
      res.status(401).json({ error: '帳號或密碼錯誤' });
    }

    const isMatch=await bcrypt.compare(password,admin.password)
    if (!isMatch) {
      return res.status(401).json({ message: "帳號或密碼錯誤" });
    }
    res.status(200).json({ message: "登入成功", admin });
  } catch (err) {
    console.error("錯誤",err);
    res.status(500).json({ error: '伺服器錯誤' });
  }
};

const createadmin= async (req, res) => {//新增管理者
  try{
  const { 
    employeeNumber,
    name,
    password,
    role} = req.body;

    console.log(req.body)
    const saltRounds=10;
    const hashedPassword=await bcrypt.hash(password,saltRounds)
    const newadmin = new Admin({employeeNumber,
    name,
    password:hashedPassword,
    role})
    console.log(newadmin)

   await newadmin.save();
  res.status(201).json({ message: "已新增人員", admin: newadmin });
  } catch (err) {
    console.error("錯誤：", err);
    res.status(500).json({ message: "發生錯誤" });
  }


};


module.exports ={getadmin,postadmin,createadmin};