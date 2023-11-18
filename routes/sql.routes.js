const express = require('express');
const router = express.Router({mergeParams: true});

//* controllers 
const getBookingData = require('../controllers/getBookingData');
const getFlightsData = require('../controllers/getFlightsData');

const postCheckFormFlights = require('../controllers/postCheckFormFlights');
const postFormFlights = require('../controllers/postFormFlights');

const deleteFlights = require('../controllers/deleteFlights');

//= GET 
router.get('/booking-data', getBookingData); 
router.get('/flights-data', getFlightsData);
//= POST 
router.post('/check-form-flights', postCheckFormFlights);
router.post('/form-flights', postFormFlights);
//= DELETE 
router.delete('/delete-flights', deleteFlights);


module.exports = router;