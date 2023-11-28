const { createAndConnectToDatabase: pool } = require('../helpers/pool');

/**
 * Проверка формы добавления рейсов.
 * @typedef {Object} ReqFlights
 * @property {string} field - Id поля которое проверяем.
 * @property {string} value - Значение для проверки.
 * 
 * @param {Object} req - Обьект запроса Express.
 * @param {ReqFlights} req.boby - Обьект с данными.
 * @return {boolean} - Вернет результат проверки поля true/false.
 */
//= postCheckFormFlights 
const postCheckFormFlights = async (req, res) => {
    let promisePool;
    try {
        const {field, value} = req.body;

        promisePool =  await pool();

        let rows;

        switch(field) {
            case 'route':
                [rows] = await promisePool.query(`SELECT * FROM flights WHERE ${field} = '${value}'`);
                if(rows.length > 0) return res.status(200).send({msg: false}); // рейс такой есть
                return res.status(200).send({msg: true}); // такого рейса нет
            case 'date': 
                [rows] = await promisePool.query(`SELECT * FROM flights WHERE ${field} = '${value}'`);
                if(rows.length < 2) {
                    return res.status(200).send({msg: true});
                } else {
                    return res.status(200).send({msg: false});
                }
            default:
                return res.status(200).send({msg: 'route not found'});
        }

    } catch (error) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${error}`});

    } finally {
        if(promisePool) await promisePool.end();
    }
};

module.exports = postCheckFormFlights;