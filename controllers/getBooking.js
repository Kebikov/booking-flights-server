const { createAndConnectToDatabase: pool } = require('../helpers/pool');

/**
 * @typedef {Object} BookingData
 * @property {number} id - Id записи в BD.
 * @property {string} route - Уникальное имя рейса.
 * @property {string} surname - Фамилия пасажира.
 * @property {string} name - Имя пасажира.
 * @property {string} middleName - Отчество пасажира.
 * @property {string} date - Время регистрации.
 * @property {number} sit - Номер места пасажира.
 * @property {string} note - Примечание.
 */

/**
 * Функция для получения обьекта брони по id.
 * @returns {BookingData} - Вернет обьект Booking.
 */

const getBooking = async (req, res) => {
    let promisePool;
    try {
        /**
         * @type {number} - Id обьекта в БД.
         */
        const id = req.params.id;

        promisePool =  await pool();

        const [rows] = await promisePool.query(`SELECT * FROM booking WHERE id = "${id}"`);

        return res.status(200).send(rows[0]);
    } catch (error) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${error}`});

    } finally {
        if(promisePool) await promisePool.end();
    }
};

module.exports = getBooking;