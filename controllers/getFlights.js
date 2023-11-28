const { createAndConnectToDatabase: pool } = require('../helpers/pool');
const {FlightsData} = require('../types.js');

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

        return res.status(200).send(rows[0]);
    } catch (error) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${error}`});

    } finally {
        if(promisePool) await promisePool.end();
    }
};

module.exports = getFlights;