//@ts-check

/**
 * Массив обьектов для создания брони
 * @type {{
 *      route: string, 
 *      surname: string, 
 *      name: string, 
 *      middleName: string, 
 *      date: string, 
 *      sit: number, 
 *      note: string 
 * }[]}
 */
const fakeData = [
    { 
        route: 'DF-345', 
        surname: 'Иванов', 
        name: 'Иван', 
        middleName: 'Иванович', 
        date: '2023-12-12T09:00:00', 
        sit: 4, 
        note: 'Note for object 1' 
    },
    { 
        route: 'DF-678', 
        surname: 'Петров', 
        name: 'Петр', 
        middleName: 'Петрович', 
        date: '2023-12-13T10:30:00', 
        sit: 5, 
        note: 'Note for object 2' 
    },
    { 
        route: 'DF-910', 
        surname: 'Сидоров', 
        name: 'Сидор',
        middleName: 'Сидорович', 
        date: '2023-12-14T12:45:00', 
        sit: 2, 
        note: 'Note for object 3' 
    },
    { 
        route: 'DF-111', 
        surname: 'Козлов', 
        name: 'Козел', 
        middleName: 'Козлович', 
        date: '2023-12-15T14:15:00', 
        sit: 8, 
        note: 'Note for object 4' 
    },
    { 
        route: 'DF-222', 
        surname: 'Смирнов', 
        name: 'Смирн', 
        middleName: 'Смирнович', 
        date: '2023-12-16T16:30:00', 
        sit: 3, 
        note: 'Note for object 5' 
    },
    { 
        route: 'DF-333', 
        surname: 'Иванова', 
        name: 'Иванна', 
        middleName: 'Ивановна', 
        date: '2023-12-17T18:45:00', 
        sit: 6, 
        note: 'Note for object 6' 
    },
    { 
        route: 'DF-444', 
        surname: 'Петрова', 
        name: 'Петра', 
        middleName: 'Петровна', 
        date: '2023-12-18T20:00:00', 
        sit: 1, 
        note: 'Note for object 7' 
    },
    { 
        route: 'DF-555', 
        surname: 'Сидорова', 
        name: 'Сидора', 
        middleName: 'Сидоровна', 
        date: '2023-12-19T22:15:00', 
        sit: 9, 
        note: 'Note for object 8' 
    },
    { 
        route: 'DF-666', 
        surname: 'Козлова', 
        name: 'Козла', 
        middleName: 'Козловна', 
        date: '2023-12-20T09:30:00', 
        sit: 4, 
        note: 'Note for object 9' 
    },
    { 
        route: 'DF-777', 
        surname: 'Смирнова', 
        name: 'Смирна', 
        middleName: 'Смирновна', 
        date: '2023-12-21T10:45:00', 
        sit: 7, 
        note: 'Note for object 10' 
    },
    { 
        route: 'DF-888', 
        surname: 'Иванович', 
        name: 'Иванка', 
        middleName: 'Ивановна', 
        date: '2023-12-22T12:00:00', 
        sit: 2, 
        note: 'Note for object 11' 
    },
    { 
        route: 'DF-999', 
        surname: 'Петрович', 
        name: 'Петровна', 
        middleName: 'Петровна', 
        date: '2023-12-23T14:15:00', 
        sit: 5, 
        note: 'Note for object 12' 
    },
    { 
        route: 'DF-101', 
        surname: 'Сидорович', 
        name: 'Сидорка', 
        middleName: 'Сидоровна', 
        date: '2023-12-24T16:30:00', 
        sit: 8, 
        note: 'Note for object 13' 
    },
    { 
        route: 'DF-121', 
        surname: 'Козлович', 
        name: 'Козлона', 
        middleName: 'Козловна', 
        date: '2023-12-25T18:45:00', 
        sit: 3, 
        note: 'Note for object 14' 
    },
    { 
        route: 'DF-141', 
        surname: 'Смирнович', 
        name: 'Смирночка', 
        middleName: 'Смирновна', 
        date: '2023-12-26T20:00:00', 
        sit: 6, 
        note: 'Note for object 15' 
    },
    { 
        route: 'DF-161', 
        surname: 'Иванков', 
        name: 'Иванко', 
        middleName: 'Иванович', 
        date: '2023-12-27T22:15:00', 
        sit: 1, 
        note: 'Note for object 16' 
    },
    { 
        route: 'DF-181', 
        surname: 'Петровков', 
        name: 'Петро', 
        middleName: 'Петрович', 
        date: '2023-12-28T09:30:00', 
        sit: 9, 
        note: 'Note for object 17' 
    },
    { 
        route: 'DF-201', 
        surname: 'Сидорков', 
        name: 'Сидорко', 
        middleName: 'Сидорович', 
        date: '2023-12-29T10:45:00', 
        sit: 4, 
        note: 'Note for object 18' 
    }
];


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
}


module.exports = {
    fakeData,
    transformData
};

console.log(new Date('2023-12-15T14:15:00').getTime());