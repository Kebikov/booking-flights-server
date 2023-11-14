const express = require('express');
const router = express.Router({mergeParams: true});

//* controllers 
const getBookingData = require('../controllers/getBookingData');
const getFlightsData = require('../controllers/getFlightsData');


router.get('/booking-data', getBookingData);
router.get('/flights-data', getFlightsData);


module.exports = router;