const { createAndConnectToDatabase: pool } = require('../helpers/pool');

/**
 * Функция проверки формы добавления рейсов
 * @typedef {Object} ReqFlights
 * @property {string} field - id поля которое проверяем
 * @property {string} value - значение для проверки
 * @param {ReqFlights} req.boby - обьект проверки
 * @return {boolean} - вернет результат проверки поля true/false 
 */

const postFormFlights = async (req, res) => {
    let promisePool;
    try {
        const {field, value} = req.body;

        promisePool =  await pool();
        const [rows] = await promisePool.query(`SELECT * FROM flights WHERE ${field} = ${value}`);
        if(Array.isArray(rows) && rows.length > 0) {
            
        }
        return res.status(200).send(rows);

    } catch (error) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${error}`});

    } finally {
        if(promisePool) await promisePool.end();
    }
};

module.exports = postFormFlights;