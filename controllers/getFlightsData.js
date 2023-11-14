const { createAndConnectToDatabase: pool } = require('../helpers/pool');


/**
* @typedef {Object} FlightsData
* @property {string} route - id рейса
* @property {string} city - город назначения
* @property {string} date - дата и время вылета
* @property {string} company - комания перевозчик
* @property {string} checkIn - крайний срок регистрации на рейс
* @property {number} freePlace - количество свободных мест в самолете
* @property {string} note - примечание
*/

/**
* Функция получения всех данных рейсов
* @returns {Promise<FlightsData[]>} вернет массив с обьектами рейсов
*/
const getFlightsData = async (req, res) => {
    let promisePool;

    try {
        promisePool =  await pool();
        const [rows] = await promisePool.query('SELECT * FROM flights');
        return res.status(200).send(rows);

    } catch (error) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${error}`});

    } finally {
        if(promisePool) await promisePool.end();
    }
};

module.exports = getFlightsData;