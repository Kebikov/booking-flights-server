const { createAndConnectToDatabase: pool } = require('../helpers/pool');

/**
* Функция редактирования рейсов
* @typedef {Object} FormFlights
* @property {number} id - уникальный id рейса
* @property {string} date - дата вылета
* @property {string} checkIn - дата регистрации
*
* @param {FormFlights} req.boby - обьект с данными
* @param {Object} req - обьект запроса Express
* @return {Object} - вернет обьект с результатом {msg: 'someResalt'}
*/
//= patchFlights 
const patchFlights = async (req, res) => {
    let promisePool;
    try { 
        const {id, date, checkIn} = req.body;

        promisePool =  await pool(); 

        await promisePool.query(`
            UPDATE flights SET 
            date = "${date}", 
            checkIn = "${checkIn}"
            WHERE id = ${id}
        `);

        return res.status(200).send({msg: 'Данные обновлены.'});

    } catch (error) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${error}`}); 
    } finally {
        if(promisePool) await promisePool.end(); 
    }
};

module.exports = patchFlights;