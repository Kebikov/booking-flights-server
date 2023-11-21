const express = require('express');
const router = express.Router({mergeParams: true});


//* controllers 
const getBookingData = require('../controllers/getBookingData');
const getFlightsData = require('../controllers/getFlightsData');

const postCheckFormFlights = require('../controllers/postCheckFormFlights');
const postFormFlights = require('../controllers/postFormFlights');
const postFormBooking = require('../controllers/postFormBooking');

const deleteFlights = require('../controllers/deleteFlights');
const deleteBooking = require('../controllers/deleteBooking');

const patchFlights = require('../controllers/patchFlights');
const patchBooking = require('../controllers/patchBooking');


//= GET 
router.get('/booking-data', getBookingData); // вернет данные с бронированием
router.get('/flights-data', getFlightsData); // вернет данные с рейсами
//= POST 
router.post('/check-form-flights', postCheckFormFlights); // проверка рейса
router.post('/form-flights', postFormFlights); // добавление рейса в БД
router.post('/form-booking', postFormBooking); // добавление брони в БД
//= DELETE 
router.delete('/delete-flights', deleteFlights); // удаление рейса
router.delete('/delete-booking', deleteBooking); // удаление брони
//= PATCH 
router.patch('/patch-flights', patchFlights); // редактирование рейса
router.patch('/patch-booking', patchBooking); // редактирование брони


module.exports = router;