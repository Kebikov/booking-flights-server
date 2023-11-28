/** 
 * @typedef {Object} FlightsData
 * @property {number} id - Id записи.
 * @property {string} route - Уникальное имя рейса.
 * @property {string} city - Город назначения.
 * @property {string} date - Дата и время вылета.
 * @property {string} company - Комания перевозчик.
 * @property {string} checkIn - Крайний срок регистрации на рейс.
 * @property {number} freePlace - Количество свободных мест в самолете.
 * @property {string} note - Примечание.
 */

/**
 * Массив обьектов для создания рейсов
 * @type {FlightsData[]} 
 */

const fakeDataFlights = [
    {
        route: 'DF-345',
        city: 'Минск',
        date: '2023-12-12T09:00:00', 
        company: 'Белавиа',
        checkIn: '2023-12-12T08:30:00', 
        freePlace: 23,
        note: 'some note'
    },
    {
        route: 'DF-678',
        city: 'Париж',
        date: '2023-12-12T09:00:00',
        company: 'Аэрофлот',
        checkIn: '2023-12-12T08:30:00',
        freePlace: 20,
        note: 'some note'
    },
    {
        route: 'DF-350',
        city: 'Лондон',
        date: '2023-12-14T15:00:00',
        company: 'Белавиа',
        checkIn: '2023-12-14T14:30:00',
        freePlace: 6,
        note: 'some note'
    },
    {
        route: 'DF-910',
        city: 'Варшава',
        date: '2023-12-14T10:00:00',
        company: 'AIRLINES',
        checkIn: '2023-12-14T09:30:00',
        freePlace: 12,
        note: 'some note'
    },
    {
        route: 'DFQ-392',
        city: 'Минск',
        date: '2023-12-20T09:00:00',
        company: 'Аэрофлот',
        checkIn: '2023-12-20T08:30:00',
        freePlace: 23,
        note: 'some note'
    },
    {
        route: 'DFX-670',
        city: 'Москва',
        date: '2023-12-22T09:00:00',
        company: 'AIRLINES',
        checkIn: '2023-12-22T08:30:00',
        freePlace: 25,
        note: 'some note'
    },
    {
        route: 'DF-111',
        city: 'Барселона',
        date: '2023-12-30T10:00:00',
        company: 'AIRLINES',
        checkIn: '2023-12-30T09:30:00',
        freePlace: 29,
        note: 'some note'
    }
];

module.exports = fakeDataFlights;