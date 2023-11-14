const { createAndConnectToDatabase: pool } = require('../helpers/pool');

/**
* @typedef {Object} BookingData
* @property {string} route - id рейса
* @property {string} surname - фамилия пасажира
* @property {string} name - имя пасажира
* @property {string} middleName - отчество пасажира
* @property {string} date - фамилия пасажира
* @property {number} sit - номер места пасажира
* @property {string} note - примечание
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