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
const fakeDataBooking = [
    { 
        route: 'DF-345/1', 
        surname: 'Иванов', 
        name: 'Иван', 
        middleName: 'Иванович', 
        date: '2023-12-11T09:40:00', 
        sit: 1, 
        note: 'Note for object 1' 
    },
    { 
        route: 'DF-345/2', 
        surname: 'Петров', 
        name: 'Петр', 
        middleName: 'Петрович', 
        date: '2023-12-11T09:30:00', 
        sit: 2, 
        note: 'Note for object 2' 
    },
    { 
        route: 'DF-345/3', 
        surname: 'Сидоров', 
        name: 'Сидор',
        middleName: 'Сидорович', 
        date: '2023-12-11T09:10:00', 
        sit: 3, 
        note: 'Note for object 3' 
    },
    { 
        route: 'DF-678/1', 
        surname: 'Козлов', 
        name: 'Козел', 
        middleName: 'Козлович', 
        date: '2023-12-11T13:20:00', 
        sit: 1, 
        note: 'Note for object 4' 
    },
    { 
        route: 'DF-678/2', 
        surname: 'Смирнов', 
        name: 'Смирн', 
        middleName: 'Смирнович', 
        date: '2023-12-11T13:30:00', 
        sit: 2, 
        note: 'Note for object 5' 
    },
    { 
        route: 'DF-350/1', 
        surname: 'Иванова', 
        name: 'Иванна', 
        middleName: 'Ивановна', 
        date: '2023-12-10T14:00:00', 
        sit: 1, 
        note: 'Note for object 6' 
    },
    { 
        route: 'DF-350/2', 
        surname: 'Петрова', 
        name: 'Петра', 
        middleName: 'Петровна', 
        date: '2023-12-10T15:40:00', 
        sit: 2, 
        note: 'Note for object 7' 
    },
    { 
        route: 'DF-910/1', 
        surname: 'Сидорова', 
        name: 'Сидора', 
        middleName: 'Сидоровна', 
        date: '2023-12-10T11:00:00', 
        sit: 1, 
        note: 'Note for object 8' 
    },
    { 
        route: 'DF-910/2', 
        surname: 'Козлова', 
        name: 'Козла', 
        middleName: 'Козловна', 
        date: '2023-12-10T10:20:00', 
        sit: 2, 
        note: 'Note for object 9' 
    },
    { 
        route: 'DF-910/3', 
        surname: 'Смирнова', 
        name: 'Смирна', 
        middleName: 'Смирновна', 
        date: '2023-12-10T13:40:00', 
        sit: 3, 
        note: 'Note for object 10' 
    },
    { 
        route: 'DFQ-392/1', 
        surname: 'Иванович', 
        name: 'Иванка', 
        middleName: 'Ивановна', 
        date: '2023-12-15T19:00:00', 
        sit: 1, 
        note: 'Note for object 11' 
    },
    { 
        route: 'DFX-670/1', 
        surname: 'Петрович', 
        name: 'Петровна', 
        middleName: 'Петровна', 
        date: '2023-12-20T09:30:00',
        sit: 1, 
        note: 'Note for object 12' 
    },
    { 
        route: 'DFX-670/2', 
        surname: 'Сидорович', 
        name: 'Сидорка', 
        middleName: 'Сидоровна', 
        date: '2023-12-20T06:00:00', 
        sit: 2, 
        note: 'Note for object 13' 
    },
    { 
        route: 'DFX-670/3', 
        surname: 'Козлович', 
        name: 'Козлона', 
        middleName: 'Козловна', 
        date: '2023-12-20T07:00:00', 
        sit: 3, 
        note: 'Note for object 14' 
    },
    { 
        route: 'DF-111/1', 
        surname: 'Смирнович', 
        name: 'Смирночка',
        middleName: 'Смирновна', 
        date: '2023-12-16T10:00:00', 
        sit: 1, 
        note: 'Note for object 15' 
    },
    { 
        route: 'DF-111/2', 
        surname: 'Иванков',
        name: 'Иванко', 
        middleName: 'Иванович', 
        date: '2023-12-12T10:10:00', 
        sit: 2, 
        note: 'Note for object 16' 
    },
    { 
        route: 'DF-111/3', 
        surname: 'Петровков', 
        name: 'Петро', 
        middleName: 'Петрович', 
        date: '2023-12-11T11:00:00', 
        sit: 3, 
        note: 'Note for object 17' 
    },
    { 
        route: 'DF-111/4', 
        surname: 'Сидорков', 
        name: 'Сидорко', 
        middleName: 'Сидорович', 
        date: '2023-12-16T10:30:00', 
        sit: 4, 
        note: 'Note for object 18' 
    }
];


module.exports = fakeDataBooking;

