const { createAndConnectToDatabase: pool } = require('../helpers/pool');


/**
 * @typedef {Object} BookingData
 * @property {number} id - Id записи.
 * @property {string} route - Уникальное имя рейса.
 * @property {string} surname - Фамилия пасажира.
 * @property {string} name - Имя пасажира.
 * @property {string} middleName - Отчество пасажира.
 * @property {string} date - Время регистрации.
 * @property {number} sit - Номер места пасажира.
 * @property {string} note - Примечание.
 */

/**
 * @typedef {Object} GetBookingData
 * @property {BookingData[]} - Массив обьектов с данными брони.
 * @property {number} - Число страниц для отображения.
 */

/**
 * @returns {GetBookingData} - Вернет обьект с : массивом обьектов брони, число страниц для отображения.
 */

const getBookingData = async (req, res) => {
    let promisePool;
    try {
        /**
         * @type {number} total
         * - Установленое количество отображаемых записей.
         */
        const total = Number(req.query.total);
        /**
         * @type {number} page
         * - Номер текушей просматриваемой страницы.
         */
        const page = Number(req.query.page);

        promisePool =  await pool();
        let rows;
        if(page === 1) {
            [rows] = await promisePool.query( `SELECT * FROM booking LIMIT ${total}` );
        } else {
            [rows] = await promisePool.query( `SELECT * FROM booking LIMIT ${total} OFFSET ${total * (page - 1)}` );
        }

        const dataBooking = rows;

        [rows] = await promisePool.query('SELECT COUNT(*) FROM booking');
        /**
         * @type {number} totalLineInTableBooking
         * - Количество записей в таблице booking.
         */
        let totalLineInTableBooking = rows[0]['COUNT(*)'];
        let totalPagesBooking = Math.ceil( totalLineInTableBooking / total);

        return res.status(200).send({dataBooking, totalPagesBooking});
    } catch (error) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${error}`});

    } finally {
        if(promisePool) await promisePool.end();
    }
};

module.exports = getBookingData;