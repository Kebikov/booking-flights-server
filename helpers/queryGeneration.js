const {FilterData, DataBase} = require('../types.js');


/**
 * Генерация запроса с учетом полученого обьекта для фильтрации.
 * @param {FilterData} filter - Обьект с данными для фильтрации.
 * @param {DataBase} dataBase - Имя базы данных.
 */
const queryGeneration = (filter, dataBase) => {
    let queryFilter = '';
    const matchLetter = ['route', 'city', 'company', 'surname', 'name', 'middleName']; // Ключи - поиск по первым буквам.
    const matchDate = ['date', 'checkIn']; // Ключи - поиск по дате.
    const matchNumber = ['freePlace', 'sit']; // Ключи - поиск числа, больше или равно.

    //* Добавление условий по поиску
    for(let key in filter) {
        if(key !== 'moreLessId' && key !== 'moreLessState') {
            // Добавление условий по поиску по первой букве.
            if(matchLetter.includes(key) && filter[key] !== '') {
                queryFilter += ` AND ${key} LIKE '${filter[key]}%'`;
            }

            // Добавление условий по поиску по дате.
            if(matchDate.includes(key) && filter[key] !== '') {
                queryFilter += ` AND DATE(${key}) = "${filter[key]}"`;
            }

            // Добавление условий по поиску числа, больше или равно.
            if(matchNumber.includes(key) && filter[key] !== '') {
                queryFilter += ` AND ${key} >= ${filter[key]}`;
            }
        }
    }
    //* Замена первого AND на WHERE, в части команды для фильтрации
    queryFilter = queryFilter.replace(' AND', ' WHERE', 1);
    //* Состовление запроса с учетом фильтра
    let query = `SELECT *, (SELECT COUNT(*) FROM ${dataBase} ${queryFilter}) AS totalRows FROM ${dataBase} ${queryFilter}`;
    //* Если есть данные для сортировки, добавляем команда для сортировки.
    if(filter?.moreLessId) {
        // Если значение true, сортировка от большего к меншему, по выбраной колонке.
        if(filter.moreLessState === true) {
            query += ` ORDER BY ${filter.moreLessId} DESC`;
        } else {
            // Иначе, сортировка от меншего к большему, по выбраной колонке.
            query += ` ORDER BY ${filter.moreLessId} ASC`;
        }
    }

    return query;
};


module.exports = queryGeneration; 