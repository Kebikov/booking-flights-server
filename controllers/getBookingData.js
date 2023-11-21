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
        promisePool =  await pool();
        const [rows] = await promisePool.query('SELECT * FROM booking');
        return res.status(200).send(rows);

    } catch (error) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${error}`});

    } finally {
        if(promisePool) await promisePool.end();
    }
};

module.exports = getBookingData;