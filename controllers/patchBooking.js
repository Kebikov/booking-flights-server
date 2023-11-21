const { createAndConnectToDatabase: pool } = require('../helpers/pool');

/**
 * @typedef {Object} BookingUpdateData
 * @property {number} id - Id записи.
 * @property {string} surname - Фамилия пасажира.
 * @property {string} name - Имя пасажира.
 * @property {string} middleName - Отчество пасажира.
 */

/**
 * Функция редактирования брони.
 * @param {BookingUpdateData} req.boby - обьект с данными
 * @param {Object} req - обьект запроса Express
 * @return {Object} - вернет обьект с результатом {msg: 'someResalt'}
*/
//= patchBooking 
const patchBooking = async (req, res) => {
    let promisePool;
    try { 
        const {id, surname, name, middleName} = req.body;
        console.log(id, surname, name, middleName); 
        promisePool =  await pool(); 

        await promisePool.query(`
            UPDATE booking SET 
            surname = "${surname}", 
            name = "${name}",
            middleName = "${middleName}"
            WHERE id = ${id}
        `);

        return res.status(200).send({msg: 'Данные обновлены.'});

    } catch (error) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${error}`}); 
    } finally {
        if(promisePool) await promisePool.end(); 
    }
};

module.exports = patchBooking;