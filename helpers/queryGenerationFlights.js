// const obj = {
//     moreLessId: 'route', 
//     moreLessState: true, 
//     route: '', 
//     city: 'м', 
//     date: '2023-12-12', 
//     company: '', 
//     checkIn: '', 
//     freePlace: '12'
// };

/**
 * Генерация запроса с учетом полученого обьекта для фильтрации.
 * @param {import('../types').FilterFlightsData} filter - Обьект с данными для фильтрации.
 */
const queryGenerationFlights = (filter, tableName) => {
    let queryFilter = '';

    const matchLetter = ['route', 'city', 'company']; // Ключи - поиск по первым буквам.
    const matchDate = ['date', 'checkIn']; // Ключи - поиск по дате.
    const matchNumber = ['freePlace']; // Ключи - поиск числа, больше или равно.

    //* Добавление условий по поиску
    for(let key in filter) {
        if(key !== 'moreLessId' && key !== 'moreLessState') {
            // Добавление условий по поиску по первой букве.
            if(matchLetter.includes(key) && filter[key] !== '') {
                queryFilter += ` AND ${key} LIKE '${filter[key]}%'`
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
    let query = `SELECT *, (SELECT COUNT(*) FROM ${tableName} ${queryFilter}) AS totalRows FROM ${tableName} ${queryFilter}`;
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

//queryGenerationFlights(obj, 'flights');

module.exports = queryGenerationFlights;