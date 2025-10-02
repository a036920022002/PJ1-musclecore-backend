const Member=require('../models/members')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// 後臺取得所有會員
const getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: '讀取會員失敗', error });
  }
};

//使用者取得會員資料
const getMemberByToken = async (req, res) => {
  try {
    const userId = req.user.id; // middleware 解析 token 後放在 req.user
    const member = await Member.findById(userId).select('-password');
    if (!member) return res.status(404).json({ message: '會員不存在' });
    res.json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

//使用者更改會員資料
const editMemberByToken = async(req,res)=>{
   try{
    const userId = req.user.id;
    const data=req.body;
    console.log(data)
   
   //篩選修改的欄位
   const allowedFields = ['firstName', 'lastName', 'gender', 'birth', 'phone'];
   const safeUpdateData = {};

   allowedFields.forEach((field) => {
      if (data[field] !== undefined) {
        safeUpdateData[field] = data[field];
      }
    });

    const updatedMember = await Member.findByIdAndUpdate(
      userId,
      { $set: safeUpdateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedMember) {
      return res.status(404).json({ message: '會員不存在' });
    }

    res.json({ message: '會員資料更新成功', member: updatedMember });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
}

//使用者更改密碼
const changepassword=async(req,res)=>{
  try{
  const userId = req.user.id;
  const oldPassword=req.body.oldPassword.trim();
  const newPassword=req.body.newPassword.trim()
  
  const member=await Member.findById(userId);
  if(!member){
    return res.status(404).json({message:"查無會員"});
  }
  
  const isMatch=await bcrypt.compare(oldPassword,member.password);
  if(!isMatch){
    return res.status(400).json({message:"密碼錯誤"})
  }
  const saltRounds=10;
  const hashedPassword=await bcrypt.hash(newPassword,saltRounds)
  member.password=hashedPassword;
  await member.save();
  res.status(200).json({message:"密碼變更成功"})
  }catch(err){
    console.error("更改密碼錯誤",err)
    res.status(500).json({meddsge:"伺服器錯誤",error:err})
  }

}

//使用者會員登入時比對
const memberlogin= async (req, res) => {

  try {
    const { email, password } = req.body;
    const member = await Member.findOne({ email});
    console.log("memberlogin",req.body);
    if (!member) {
      return res.status(401).json({ message: '此帳號不存在' });
    }

    const isMatch=await bcrypt.compare(password,member.password)
    if (!isMatch) {
      return res.status(401).json({ message: "帳號或密碼錯誤" });
    }
    const token=jwt.sign(
      {id:member._id,email:member.email},
      process.env.JWT_SECRET,
      {expiresIn:'1m'}
    )
    console.log("token",token)
    res.status(200).json({ message: "登入成功", token,member});
  } catch (err) {
    console.error("錯誤",err);
    res.status(500).json({ error: '伺服器錯誤' });
  }
};  

//使用者註冊
const createmember= async (req, res) => {
  try{
  const { 
    firstName,
    lastName,
    gender,
    email,
    birth,
    phone,
    password,
    role,
    isActive,
    createdAt} = req.body;

    console.log(req.body)

    const saltRounds=10;
    const hashedPassword=await bcrypt.hash(password,saltRounds)
    const newmember = new Member({firstName,
    lastName,
    gender,
    email,
    birth,
    phone,
    password:hashedPassword,
    role,
    isActive,
    createdAt});
    console.log(newmember)

   await newmember.save();
  res.status(201).json({ message: "會員註冊成功" });
  } catch (err) {
    console.error("錯誤：", err);
    res.status(500).json({ message: "發生錯誤" });
  }
};

//後台讀取會員資料
const  editmember=async (req,res)=>{
 try {
    const member = await Member.findById(req.params.id);
        if (!member) 
      return res.status(404).json({ message: '會員不存在' });
    const memberObj = member.toObject();
    memberObj._id = memberObj._id.toString(); 
    
    res.json(memberObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
}};

//後台更新會員資料
const renewMember= async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id",id)

    const newMember = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      role: req.body.role,
      };

    const updateMember = await Member.findByIdAndUpdate(
      id, 
      newMember,
      { new: true }
    );

    if (!updateMember) {
      return res.status(404).json({ message: '找不到會員' });
    }

    res.json({ message: '會員更新成功', member: updateMember });
  } catch (error) {
    console.error("更新錯誤", error);
    res.status(500).json({ message: '更新會員失敗', error });
  }
};

module.exports ={getMembers,memberlogin,createmember,editmember,renewMember,getMemberByToken,editMemberByToken,changepassword};