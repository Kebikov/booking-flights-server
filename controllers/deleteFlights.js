const { createAndConnectToDatabase: pool } = require('../helpers/pool');


/**
* Функция удаления рейса по переданному id(удаляем в случае отсутствия брони на рейс)
* @typedef {Object} RecBody
* @property {number} id - id записи рейса
*
* @param {RecBody} req.body - обьект c данными
* @param {Object} req - обьект запроса Express
* @return {number} 
*/
//= deleteFlights 
const deleteFlights = async (req, res) => {
    let promisePool;  
    try { 
        const {id} = req.body;
        promisePool =  await pool();
        // запрос для получения рейса по id
        let [rows] = await promisePool.query(`
            SELECT *
            FROM flights
            WHERE id = ${id} 
        `);
        // получение имени рейса 
        let routeById = rows[0]?.route;

        if(routeById) {
            // получение брони с именеи рейса routeById, поиск по первой части значения столбца до '/№'
            [rows] = await promisePool.query(`
                SELECT *
                FROM booking
                WHERE SUBSTRING_INDEX(route, '/№', 1) = "${routeById}"
            `);
            // проверка есть ли забронированые билеты на рейс, если да то не удаляем
            if(Array.isArray(rows) && rows.length === 0) {
                //удаляем
                [rows] = await promisePool.query(`DELETE FROM flights WHERE id = ${id}`);
                return res.status(200).send({msg: 'Рейс удален.'});
            } else {
                return res.status(200).send({msg: 'Есть забронированные билеты.'});
            }

        } else {
            return res.status(200).send({msg: 'не найден рейс с таким id'});
        }

    } catch (error) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${error}`}); 
    } finally {
        if(promisePool) await promisePool.end(); 
    }
};

module.exports = deleteFlights;