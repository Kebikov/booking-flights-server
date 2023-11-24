const express = require('express');
const router = express.Router({mergeParams: true});


//* controllers 
const getBookingData = require('../controllers/getBookingData');
const getFlightsData = require('../controllers/getFlightsData');
const getBooking = require('../controllers/getBooking');
const getFlights = require('../controllers/getFlights');

const postCheckFormFlights = require('../controllers/postCheckFormFlights');
const postFormFlights = require('../controllers/postFormFlights');
const postFormBooking = require('../controllers/postFormBooking');

const deleteFlights = require('../controllers/deleteFlights');
const deleteBooking = require('../controllers/deleteBooking');

const patchFlights = require('../controllers/patchFlights'); 
const patchBooking = require('../controllers/patchBooking');


//= GET 
router.get('/booking-data', getBookingData); // Вернет данные с бронированием.
router.get('/flights-data', getFlightsData); // Вернет данные с рейсами.
router.get('/get-booking/:id', getBooking); // Вернет обьект брони по id.
router.get('/get-flights/:id', getFlights); // Вернет обьект рейса по id.
//= POST 
router.post('/check-form-flights', postCheckFormFlights); // Проверка рейса
router.post('/form-flights', postFormFlights); // Добавление рейса в БД.
router.post('/form-booking', postFormBooking); // Добавление брони в БД.
//= DELETE 
router.delete('/delete-flights', deleteFlights); // Удаление рейса.
router.delete('/delete-booking', deleteBooking); // Удаление брони.
//= PATCH 
router.patch('/patch-flights', patchFlights); // Редактирование рейса.
router.patch('/patch-booking', patchBooking); // Редактирование брони.


module.exports = router;