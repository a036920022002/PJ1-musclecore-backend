var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
   res.json({ message: "Hello from Express users API!" });
});

module.exports = router;
