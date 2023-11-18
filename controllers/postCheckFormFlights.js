const { createAndConnectToDatabase: pool } = require('../helpers/pool');

/**
 * Функция проверки формы добавления рейсов
 * @typedef {Object} ReqFlights
 * @property {string} field - id поля которое проверяем
 * @property {string} value - значение для проверки
 * @param {ReqFlights} req.boby - обьект проверки
 * @return {boolean} - вернет результат проверки поля true/false 
 */

const postCheckFormFlights = async (req, res) => {
    let promisePool;
    try {
        const {field, value} = req.body;

        console.log(field, value);
        promisePool =  await pool();
        console.log(promisePool);
        let rows;

        switch(field) {
            case 'route':
                [rows] = await promisePool.query(`SELECT * FROM flights WHERE ${field} = '${value}'`);
                if(rows.length > 0) return res.status(200).send({msg: false});
                return res.status(200).send({msg: true});
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
        //if(promisePool) await promisePool.end();
    }
};

module.exports = postCheckFormFlights;