
/**
 * Генерация запроса с учетом полученого обьекта для фильтрации.
 * @param {import('../types').FilterFlightsData} filter - Обьект с данными для фильтрации.
 */
const queryGenerationFlights = (filter, tableName) => {
    let query = `SELECT * FROM ${tableName} WHERE`;

    const matchLetter = ['route', 'city', 'company'];
    const matchDate = ['date', 'checkIn'];
    const matchNumber = ['freePlace'];

    for(let key in filter) {
        if(key !== 'moreLessId' && key !== 'moreLessState') {
            //* Добавление условий по поиску по первой букве.
            if(matchLetter.includes(key) && filter[key] !== '') {
                // Если последнее слово не 'WHERE', то добавляем ' AND'.
                if(query.split(' ').at(-1) !== 'WHERE') query += ' AND';
                query += ` ${key} LIKE '${filter[key]}%'`
            }

            //* Добавление условий по поиску по дате.
            if(matchDate.includes(key) && filter[key] !== '') {
                // Если последнее слово не 'WHERE', то добавляем ' AND'.
                if(query.split(' ').at(-1) !== 'WHERE') query += ' AND';
                query += ` DATE(${key}) = "${filter[key]}"`;
            }

            //* Добавление условий по поиску числа, больше или равно.
            if(matchNumber.includes(key) && filter[key] !== '') {
                // Если последнее слово не 'WHERE', то добавляем ' AND'
                if(query.split(' ').at(-1) !== 'WHERE') query += ' AND';
                query += ` ${key} >= ${filter[key]}`;
            }
        }
    }

    // Если последняя команда в запросе 'WHERE', удаляем ее.
    if(query.split(' ').at(-1) === 'WHERE') {
        query = query.replace(' WHERE', '');
    }

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

module.exports = queryGenerationFlights;