const { createAndConnectToDatabase: pool } = require('../helpers/pool');


/** Функция получения всех данных рейсов
 * @typedef {Object} FormFlights
 * @property {string} route - Уникальный номер рейса.
 * @property {string} city - Город назначения.
 * @property {string} date - Дата вылета.
 * @property {string} company - Перевозчик.
 * @property {string} checkIn - Дата регистрации.
 * @property {number} freePlace - Количество свободных мест.
 * @property {string} note - Примечание.
 */

/**
 * @typedef {Object} GetFlightsData
 * @property {FormFlights[]} - Массив обьектов с данными рейсов.
 * @property {number} - Число страниц для отображения.
 */

/**
 * @returns {GetFlightsData} - Вернет обьект с : массивом обьектов рейсов, число страниц для отображения.
 */

const getFlightsData = async (req, res) => {
    
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
            [rows] = await promisePool.query( `SELECT * FROM flights LIMIT ${total}` );
        } else {
            [rows] = await promisePool.query( `SELECT * FROM flights LIMIT ${total} OFFSET ${total * (page - 1)}` );
        }

        const dataFlights = rows;

        [rows] = await promisePool.query('SELECT COUNT(*) FROM flights');
        /**
         * @type {number} totalLineInTableBooking
         * - Количество записей в таблице booking.
         */
        let totalLineInTableBooking = rows[0]['COUNT(*)'];
        let totalPagesBooking = Math.ceil( totalLineInTableBooking / total);

        return res.status(200).send({dataFlights, totalPagesBooking});
    } catch (error) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${error}`});

    } finally {
        if(promisePool) await promisePool.end();
    }
};

module.exports = getFlightsData;