const { createAndConnectToDatabase: pool } = require('../helpers/pool');


/**
 * @typedef {Object} RecBody
 * @property {number} id - id записи брони
 */

/**
 * Функция удаления брони по переданному id и добавления места на рейс
 * @param {number} req.body - обьект c данными
 * @param {Object} req - обьект запроса Express
 * @return {string} Строку с результатом. 
 */
//= deleteBooking 
const deleteBooking = async (req, res) => {
    let promisePool;  
    try { 
        const {id} = req.body;
        console.log(id);
        console.log(typeof id);
        promisePool =  await pool();

        // удаляем
        let [rows] = await promisePool.query(`
            DELETE FROM booking 
            WHERE id = ${id}
        `);

        // добавляем +1 место в самолете
        [rows] = await promisePool.query(`
            UPDATE flights 
            SET 
            freePlace = freePlace + 1 
            WHERE id = ${id}
        `);

        return res.status(200).send({msg: 'BOOKING_DELETED'});
    } catch (error) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${error}`}); 
    } finally {
        if(promisePool) await promisePool.end(); 
    }
};

module.exports = deleteBooking;

