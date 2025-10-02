var express = require('express');
var router = express.Router();
const Product=require('../models/product');
const path=require("path");
const multer=require("multer")
const {getproduct,getproductId,putproductId,deleteproductId,postproduct}=require('../controller/product')

router.get('/', getproduct);

router.get('/:productId', getproductId);

router.put('/:productId', putproductId);

router.delete('/:productId', deleteproductId);


// 設定 multer 儲存設定
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // 上傳圖片儲存在 uploads 資料夾
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + '-' + file.originalname;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

router.post("/",postproduct);

module.exports = router;