const { createAndConnectToDatabase: pool } = require('../helpers/pool');


/** Функция получения всех данных рейсов
* @typedef {Object} FormFlights
* @property {string} route - уникальный номер рейса
* @property {string} city - город назначения
* @property {string} date - дата вылета
* @property {string} company - перевозчик
* @property {string} checkIn - дата регистрации
* @property {number} freePlace - количество свободных мест
* @property {string} note - примечание
*
* @returns {FormFlights[]} вернет массив с обьектами рейсов
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