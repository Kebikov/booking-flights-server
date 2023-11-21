const { createAndConnectToDatabase: pool } = require('../helpers/pool');

/**
 * Данные рейса.
 * @typedef {Object} Flight
 * @property {number} id - Id записи (1).
 * @property {string} route - Имя рейса ('DF-678').
 * @property {string} city - Город прибытия ('Париж').
 * @property {string} date - Дата вылета ('2023-12-12 09:00:00').
 * @property {string} company - Перевозчик('Аэрофлот').
 * @property {string} checkIn - Время регистрации ('2023-12-12 08:30:00').
 * @property {number} freePlace - Свободные места в самолете (20).
 * @property {string} note - Примечание к рейсу ('Любой текст...').
 */

/**
 * Добавление новой брони.
 * @typedef {Object} FormFBooking
 * @property {string} route - Уникальный номер рейса.
 * @property {string} surname - Фамилия.
 * @property {string} name - Имя.
 * @property {string} middleName - Отчество.
 * @property {string} note - Примечание.
 *
 * @param {FormFBooking} req.boby - Обьект с данными.
 * @param {Object} req - Обьект запроса Express.
 * @return {Flight | string} - Вернет обновленный обьект рейса или строку с ошибкой.
 */
//= postFormBooking 
const postFormBooking = async (req, res) => { 
    let promisePool;
    try { 
        promisePool =  await pool();

        /** Полученые данные. @type {FormFBooking} */
        const {route, surname, name, middleName, note} = req.body;

        //* Получение данных рейса
        let [rows] = await promisePool.query(`
            SELECT *
            FROM flights 
            WHERE SUBSTRING_INDEX(route, '/№', 1) = "${route}" 
        `);

        /** 
         * Обьект с данными рейса.
         * @type {Flight}
         */
        const flight = rows[0];
        /** Количество свободных мест рейса. @type {number} */
        const freePlace = flight.freePlace;

        // если свободных мест нет, вернем сообшение
        if(freePlace === 0) return res.status(200).send({msg: 'FREE_PLACE_ZERO'});

        // установка времени бронирования
        const objDate = new Date();
        const nowDate = objDate.toLocaleDateString('fr-CA');
        const nowTime = objDate.toLocaleTimeString('ru-RU');
        /** Время бронирования в формате(2023-12-12 09:00:00). @type {string} */
        const date = `${nowDate} ${nowTime}`;
        console.log(date);
        /** Место пасажира. @type {number} */
        let sit = 0;

        //* Получение данных о забронированных местах на рейсе
        [rows] = await promisePool.query(`
            SELECT sit
            FROM booking
            WHERE SUBSTRING_INDEX(route, '/№', 1) = "${route}" 
        `);

        //* назначение места для пасажира
        if(rows.length === 0) {
            sit = 1;
        } else {
            let isFreeSit = 1;
            while(!sit) {
                const checkSit = rows.some(booking => booking.sit === isFreeSit);
                if(checkSit) {
                    isFreeSit ++;
                } else {
                    sit = isFreeSit;
                }
            } 
        }

        //* Добавление данных новой брони в БД
        await promisePool.query(`
            INSERT INTO booking 
            (route, surname, name, middleName, date, sit, note) 
            VALUES
            ("${route}/№${sit}", "${surname}", "${name}", "${middleName}", "${date}", ${sit}, "${note}")`
        );

        //* Уменьшение количества свободных мест на рейсе на -1
        await promisePool.query(`
            UPDATE flights
            SET
            freePlace = ${freePlace - 1}
            WHERE route = "${route}"`
        );
        
        return res.status(200).send({...flight, freePlace: freePlace - 1});

    } catch (error) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${error}`}); 
    } finally {
        if(promisePool) await promisePool.end(); 
    }
};

module.exports = postFormBooking;