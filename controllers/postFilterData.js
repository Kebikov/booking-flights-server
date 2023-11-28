const { createAndConnectToDatabase: pool } = require('../helpers/pool');
const queryGeneration = require('../helpers/queryGeneration');
const { FlightsOfBookingData, FilterData } = require('../types.js');


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
    console.log('/filter-data/:dataBase');
    //* Определение количества страниц с учетом заданного количества отображаемых страниц.
    const setTotalPages = (dataArray, total) => {
        if(Array.isArray(dataArray) && dataArray.length > 0) {
            return Math.ceil( dataArray[0].totalRows / total);
        } else {
            return 0;
        }
    }
    
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
        //console.log('',dataBase); 
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
        console.log('',total, page, filterData);  
        const valueArray = Object.values(filterData);
        const isValue = valueArray.every(item => item === '');
        console.group('REQ');
        console.log('Пказывать по >>> ', total);
        console.log('Номер страницы >>> ', page);
        console.log('Есть ли фильтр >>> ', !isValue);
        console.log('Фильтр >>> ', isValue ? 'нет' : filterData);
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
            console.log(query);
            [rows] = await promisePool.query(query);
            data = rows;
            console.log(data);
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
        console.log(data, totalPages);
        return res.status(200).send({data, totalPages}); 
    } catch (error) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${error}`}); 

    } finally {
        if(promisePool) await promisePool.end();
    }
};

module.exports = postFilterData;