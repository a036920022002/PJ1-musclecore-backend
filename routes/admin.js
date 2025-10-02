var express = require('express');
var router = express.Router();
const Admin=require('../models/admin')
const bcrypt=require("bcrypt")
const {getadmin,postadmin,createadmin}=require('../controller/admin')

router.get('/', getadmin);

router.post('/', postadmin);

router.post('/new',createadmin);


module.exports = router;