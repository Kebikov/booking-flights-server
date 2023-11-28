/**
 * Функция преобразования массива обьектов в строку для добавления в БД
 * @param {object[]} array массив обьектов для дальнейшего преобразования
 * @returns {string | undefined} вернет значения массива в виде строки подготовленной для добавления в БД
 */
const transformData = (array) => {
    try {
        if(!Array.isArray(array)) throw new Error('Переменная не является массивом.');
        /**
         * Конечный результат вида: "(valueA, valueB, ...), (valueA, valueB, ...), ..."
         * @type {string}
         */
        let str = '';
        for(let i = 0; i < array.length; i++) {
            /**
             * Массив ключей обьекта
             * @type {string[]}
             */
            const keys = Object.keys(array[i]);
            /**
             * Все value обьекта в виде строки: "(valueA, valueB, ...)"
             * @type {string}
             */
            let objString = '';
            /**
             * Value обьекта в виде строки c запятой в конце: "value,"
             * @type {string}
             */
            let keyStr = '';
            for(let k = 0; k < keys.length; k++) {
                if(typeof array[i][keys[k]] === 'number') {
                    keyStr += array[i][keys[k]] + ',';
                } else {
                    keyStr += `"${array[i][keys[k]]}",`;
                }
            }
            keyStr = keyStr.slice(0, -1);
            objString = `(${keyStr}),`;
            str += objString;
        }
        str = str.slice(0, -1);
        return str;
    }catch (error) {
        console.error(error);
    }
};

module.exports = transformData;