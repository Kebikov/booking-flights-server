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
 * Функция получения всех данных бранирования
 * @returns {Promise<BookingData[]>} вернет массив с обьектами брони
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
        console.log('total=', total);
        console.log('page=', page);

        promisePool =  await pool();
        let rows;
        if(page === 1) {
            console.log(1);
            [rows] = await promisePool.query( `SELECT * FROM booking LIMIT ${total}` );
        } else {
            console.log(2);
            [rows] = await promisePool.query( `SELECT * FROM booking LIMIT ${total} OFFSET ${total * (page - 1)}` );
        }


        let arrayBookingData = await promisePool.query('SELECT COUNT(*) FROM booking');
        /**
         * @type {number} totalLineInTableBooking
         * - Количество записей в таблице booking.
         */
        let totalLineInTableBooking = arrayBookingData[0][0]['COUNT(*)'];
        let totalPagesBooking = Math.ceil( totalLineInTableBooking / total);

        return res.status(200).send({rows, totalPagesBooking});

    } catch (error) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${error}`});

    } finally {
        if(promisePool) await promisePool.end();
    }
};

module.exports = getBookingData;