const { createAndConnectToDatabase: pool } = require('../helpers/pool');
const queryGenerationFlights = require('../helpers/queryGenerationFlights');


/**
 * @typedef {Object} Req
 * @property {import('../types').FilterFlightsData} body - данные для фильтрации рейсов.
 */

/**
 * @typedef {Object} GetFlightsData
 * @property {import('../types').FlightsData[]} dataFlights - Массив обьектов с данными рейсов.
 * @property {number} totalPagesBooking - Число страниц для отображения.
 */

/**
 * Получение всех данных рейсов.
 * @param {Req} req
 * @returns {GetFlightsData} - Вернет обьект с : массивом обьектов рейсов, число страниц для отображения.
 */
//= postFlightsData 
const postFlightsData = async (req, res) => {  
    
    let promisePool; 
    let rows;
    /**
     * Массив обьектов с данными рейсов.
     * @type {import('../types').FlightsData}  
     */
    let dataFlights;
    /**
     * Количество страниц в таблице booking, с учетом заданного количества отображаемых страниц.
     * @type {number}
     */
    let totalPagesBooking;

    try {
        promisePool =  await pool();
        /**
         * Установленое количество отображаемых записей.
         * @type {number} total
         */
        const total = Number(req.query.total);   
        /**
         * Номер текушей просматриваемой страницы.
         * @type {number} page
         */
        const page = Number(req.query.page);
        /** 
         * Полученые данные. 
         * @type {import('../types').FilterFlightsData} 
         */
        const filterDataFlights = req.body;
        const valueArray = Object.values(filterDataFlights);
        const isValue = valueArray.every(item => item === '');
        //* Если есть хоть одно значение для фильтрации, получаем новые данные с учетом фильтра.
        if(!isValue) {
            //* Если установлены варианты фильтрации.
            let query = queryGenerationFlights(filterDataFlights, 'flights');
            console.log(query);
            // Изминение команды запроса для определения обшего количества отображаемых данных
            const queryCount = query.replace('SELECT *', 'SELECT COUNT(*)');
            //* Определение количества страниц с учетом заданного количества отображаемых страниц.
            [rows] = await promisePool.query(queryCount);
            totalPagesBooking = Math.ceil( rows[0]['COUNT(*)'] / total);
            // Добавление команд для погинации данных.
            if(page === 1) {
                query += ` LIMIT ${total}`;
            } else {
                query += ` LIMIT ${total} OFFSET ${total * (page - 1)}`; 
            }
            [rows] = await promisePool.query(query);

            dataFlights = rows;
        //* Если не установлены ни какие варианты фильтрации.
        } else {
            if(page === 1) {
                [rows] = await promisePool.query(`
                    SELECT *, 
                    (SELECT COUNT(*) FROM flights) AS totalRows 
                    FROM flights 
                    LIMIT ${total}
                `);
            } else {
                [rows] = await promisePool.query(`
                    SELECT *,
                    (SELECT COUNT(*) FROM flights) AS totalRows
                    FROM flights 
                    LIMIT ${total} 
                    OFFSET ${total * (page - 1)} 
                `);
            }
            dataFlights = rows;
            //* Определение количества страниц с учетом заданного количества отображаемых страниц.
            if(Array.isArray(dataFlights) && dataFlights.length > 0) {
                totalPagesBooking = Math.ceil( dataFlights[0].totalRows / total);
            } else {
                totalPagesBooking = 0;
            }
            
        }

        return res.status(200).send({dataFlights, totalPagesBooking});
    } catch (error) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${error}`});

    } finally {
        if(promisePool) await promisePool.end();
    }
};

module.exports = postFlightsData;