var express = require('express');
var router = express.Router();
const {getorder,getorderId,orderSave,changeOrderStatus,memberorder} = require('../controller/order');
const verifyToken = require('../middleware/verifyToken');
const generateSerialNumber=require("../middleware/generateCounter")

router.get('/', getorder)
router.get('/my-orders',verifyToken,memberorder)
router.get('/:orderId', getorderId)
router.patch('/:orderId', changeOrderStatus)
router.post('/',
    verifyToken,
    generateSerialNumber('order', 'ORD'),
    orderSave)




module.exports = router;