var express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { getMembers,memberlogin,createmember,editmember,renewMember,getMemberByToken,editMemberByToken,changepassword} = require('../controller/member');

router.get('/user',verifyToken, getMemberByToken)
router.put('/user',verifyToken,editMemberByToken)
router.post('/change-password',verifyToken,changepassword)

router.get('/',getMembers);

router.get('/:id',editmember);

router.post('/login',memberlogin)

router.post('/register',createmember)

router.put('/:id',renewMember)

module.exports = router;