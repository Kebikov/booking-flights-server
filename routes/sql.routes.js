const express = require('express');
const router = express.Router({mergeParams: true});

//* controllers 
const getBookingData = require('../controllers/getBookingData');
const getFlightsData = require('../controllers/getFlightsData');

const postFormFlights = require('../controllers/postFormFlights');

//= GET 
router.get('/booking-data', getBookingData);
router.get('/flights-data', getFlightsData);
//= POST 
router.post('/check-form-flights', postFormFlights);


module.exports = router;