const { createAndConnectToDatabase: pool } = require('../helpers/pool');

/** 
 * @typedef {Object} FlightsData
 * @property {number} id - Id записи в BD.
 * @property {string} route - Уникальное имя рейса.
 * @property {string} city - Город назначения.
 * @property {string} date - Дата и время вылета.
 * @property {string} company - Комания перевозчик.
 * @property {string} checkIn - Крайний срок регистрации на рейс.
 * @property {number} freePlace - Количество свободных мест в самолете.
 * @property {string} note - Примечание.
 */

/**
 * Функция для получения обьекта рейса по id.
 * @returns {FlightsData} - Вернет обьект рейса.
 */
const getFlights = async (req, res) => {
    let promisePool;
    try {
        /**
         * @type {number} - Id обьекта в БД.
         */
        const id = req.params.id;

        promisePool =  await pool();

        const [rows] = await promisePool.query(`SELECT * FROM flights WHERE id = "${id}"`);
        /**
         * @type {FlightsData}
         */
        const data = rows[0];
        return res.status(200).send(data);
    } catch (error) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${error}`});

    } finally {
        if(promisePool) await promisePool.end();
    }
};

module.exports = getFlights;