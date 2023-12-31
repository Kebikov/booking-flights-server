const { createAndConnectToDatabase: pool } = require('../helpers/pool');
const queryGeneration = require('../helpers/queryGeneration');

/** 
 * Обьект с данными для сортировки в Flight.
 * @typedef {Object} FilterFlights
 * @property {string} [moreLessId]? - Id столбца для сортировки больше/меньше.
 * @property {boolean} [moreLessState]? - Значение сортировки, true - от большего к меньшему, false - наоборот.
 * @property {string} [route]? - Данные сортировки рейса.
 * @property {string} [city]? - Данные сортировки города назначения.
 * @property {string} [date]? - Данные сортировки дата вылета.
 * @property {string} [company]? - Данные сортировки комании.
 * @property {string} [checkIn]? - Данные сортировки даты регистрации на рейс.
 * @property {number} [freePlace]? - Данные сортировки по количества свободных мест в самолете.
 */

/** 
 * Обьект с данными для сортировки в Booking.
 * @typedef {Object} FilterBooking
 * @property {string} [moreLessId]? - Id столбца для сортировки больше/меньше.
 * @property {boolean} [moreLessState]? - Значение сортировки, true - от большего к меньшему, false - наоборот.
 * @property {string} [route]? - Данные сортировки рейса.
 * @property {string} [surname]? - Фамилия пасажира.
 * @property {string} [name]? - Имя пасажира.
 * @property {string} [middleName]? - Отчество пасажира.
 * @property {string} [date]? - Данные сортировки дата вылета.
 * @property {number} [sit]? - Номер места пасажира.
 */

/**
 * @typedef {FilterFlights | FilterBooking} FilterData
 */

/**
 * @typedef {Object} Req
 * @property {FilterData} body - данные для фильтрации.
 */

/**
 * @typedef {Object} GetData
 * @property {FlightsOfBookingData[]} data - Массив обьектов с данными.
 * @property {number} totalPagesBooking - Число страниц для отображения.
 */

/**
 * Получение всех данных с фильтром.
 * @param {Req} req
 * @returns {GetData} - Вернет обьект с : массивом обьектов, число страниц для отображения.
 */
//= postFilterData 
const postFilterData = async (req, res) => {  
    //* Определение количества страниц с учетом заданного количества отображаемых страниц.
    const setTotalPages = (dataArray, total) => {
        if(Array.isArray(dataArray) && dataArray.length > 0) {
            return Math.ceil( dataArray[0].totalRows / total); 
        } else {
            return 0;
        }
    };
    
    let promisePool; 
    let rows;
    /**
     * Массив обьектов с данными.
     * @type {FlightsOfBookingData}
     */
    let data;
    /**
     * Количество страниц в таблице, с учетом заданного количества отображаемых страниц.
     * @type {number}
     */
    let totalPages;

    try {
        promisePool =  await pool();
        const dataBase = req.params.dataBase;
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
         * @type {FilterData} 
         */
        const filterData = req.body; 
        const valueArray = Object.values(filterData);
        const isValue = valueArray.every(item => item === '');
        //* Если есть хоть одно значение для фильтрации, получаем новые данные с учетом фильтра.
        if(!isValue) {
            //* Если установлены варианты фильтрации.
            let query = queryGeneration(filterData, dataBase);
            // Добавление команд для погинации данных.
            if(page === 1) {
                query += ` LIMIT ${total}`;
            } else {
                query += ` LIMIT ${total} OFFSET ${total * (page - 1)}`;  
            }
            [rows] = await promisePool.query(query);
            data = rows;
            totalPages = setTotalPages(data, total); 
        //* Если не установлены ни какие варианты фильтрации.  
        } else {
            if(page === 1) {
                [rows] = await promisePool.query(`SELECT *, (SELECT COUNT(*) FROM ${dataBase}) AS totalRows FROM ${dataBase} LIMIT ${total}`);
            } else {
                [rows] = await promisePool.query(`SELECT *,(SELECT COUNT(*) FROM ${dataBase}) AS totalRows FROM ${dataBase} LIMIT ${total} OFFSET ${total * (page - 1)}`);
            }
            data = rows;
            totalPages = setTotalPages(data, total);
        }

        return res.status(200).send({data, totalPages}); 
    } catch (error) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${error}`}); 

    } finally {
        if(promisePool) await promisePool.end();
    }
};

module.exports = postFilterData;