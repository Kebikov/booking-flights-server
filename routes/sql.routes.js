const express = require('express');
const router = express.Router({mergeParams: true});


//* controllers 
const getBooking = require('../controllers/getBooking');
const getFlights = require('../controllers/getFlights');

const postCheckFormFlights = require('../controllers/postCheckFormFlights');
const postFormFlights = require('../controllers/postFormFlights');
const postFormBooking = require('../controllers/postFormBooking');
const postFilterData = require('../controllers/postFilterData');

const deleteFlights = require('../controllers/deleteFlights');
const deleteBooking = require('../controllers/deleteBooking');

const patchFlights = require('../controllers/patchFlights'); 
const patchBooking = require('../controllers/patchBooking');


//= GET 
router.get('/get-booking/:id', getBooking); // Вернет обьект Booking по id.
router.get('/get-flights/:id', getFlights); // Вернет обьект Flights по id. 
//= POST 
router.post('/check-form-flights', postCheckFormFlights); // Проверка Flights.
router.post('/form-flights', postFormFlights); // Добавление Flights в БД.
router.post('/form-booking', postFormBooking); // Добавление Booking в БД.

router.post('/filter-data/:dataBase', postFilterData); // Вернет данные, с учетом фильтрации.
//= DELETE 
router.delete('/delete-flights', deleteFlights); // Удаление Flights.
router.delete('/delete-booking', deleteBooking); // Удаление Booking.
//= PATCH 
router.patch('/patch-flights', patchFlights); // Редактирование Flights.
router.patch('/patch-booking', patchBooking); // Редактирование Booking.


module.exports = router;