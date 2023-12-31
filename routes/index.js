const express = require('express');
const router = express.Router({mergeParams: true});

router.use('/admin', require('./admin.routes')); 
router.use('/sql', require('./sql.routes')); 

module.exports = router;  

