const { createAndConnectToDatabase: pool } = require('../helpers/pool');

/**
* Функция добавления новых рейсов
* @typedef {Object} FormFlights
* @property {string} route - уникальный номер рейса
* @property {string} city - город назначения
* @property {string} date - дата вылета
* @property {string} company - перевозчик
* @property {string} checkIn - дата регистрации
* @property {number} freePlace - количество свободных мест
* @property {string} note - примечание
*
* @param {FormFlights} req.boby - обьект с данными
* @param {Object} req - обьект запроса Express
* @return {FormFlights[]} - вернет обновленный массив с данными
*/

const postFormFlights = async (req, res) => {
    let promisePool;
    try { 
        const {route, city, date, company, checkIn, freePlace, note} = req.body;

        promisePool =  await pool(); 

        await promisePool.query(`
            INSERT INTO flights 
            (route, city, date, company, checkIn, freePlace, note) 
            VALUES
            ("${route}", "${city}", "${date}", "${company}", "${checkIn}", ${freePlace}, "${note}")`
        );

        const [rows] = await promisePool.query('SELECT * FROM flights');
        return res.status(200).send(rows);

    } catch (error) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${error}`}); 
    } finally {
        if(promisePool) await promisePool.end(); 
    }
};

module.exports = postFormFlights;