const express = require('express');
const router = express.Router({mergeParams: true});

router.use('/admin', require('./admin.routes')); 

module.exports = router;  

