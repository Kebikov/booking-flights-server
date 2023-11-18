const { createAndConnectToDatabase: pool } = require('../helpers/pool');


/**
* Функция удаления рейса
* @typedef {Object} RecBody
* @property {number} id - id записи рейса
*
* @param {RecBody} req.body - обьект c данными
* @param {Object} req - обьект запроса Express
* @return {number} 
*/
const deleteFlights = async (req, res) => {
    let promisePool;  
    try { 
        console.log(req.body);
        const {id} = req.body;
        console.log(id);
        promisePool =  await pool();
        
        let [rows] = await promisePool.query(`
            SELECT *
            FROM flights
            WHERE id = ${id} 
        `);
        console.log(rows);

        let routeById = rows[0]?.route;
        console.log('Билеты на рейс :', routeById);

        if(routeById) {
            [rows] = await promisePool.query(`
                SELECT *
                FROM booking
                WHERE SUBSTRING_INDEX(route, '/№', 1) = "${routeById}"
            `);

            if(Array.isArray(rows) && rows.length === 0) {
                //удаляем
                [rows] = await promisePool.query(`DELETE FROM flights WHERE id = ${id}`);

                return res.status(200).send({msg: 'Рейс удален.'});
            } else {
                return res.status(200).send({msg: 'Есть забронированные билеты.'});
            }

        } else {
            console.log(333);
            return res.status(200).send({msg: 'не найден рейс с таким id'});
        }







    } catch (error) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${error}`}); 
    } finally {
        if(promisePool) await promisePool.end(); 
    }
};

module.exports = deleteFlights;