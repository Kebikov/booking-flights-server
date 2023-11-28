/**
 * @typedef {Object} BookingData
 * @property {number} id - Id записи в BD.
 * @property {string} route - Уникальное имя рейса.
 * @property {string} surname - Фамилия пасажира.
 * @property {string} name - Имя пасажира.
 * @property {string} middleName - Отчество пасажира.
 * @property {string} date - Время регистрации.
 * @property {number} sit - Номер места пасажира.
 * @property {string} note - Примечание.
 */

/** 
 * @typedef {Object} FlightsData
 * @property {number} id - Id записи в BD.
 * @property {string} route - Уникальное имя рейса.
 * @property {string} city - Город назначения.
 * @property {string} date - Дата и время вылета.
 * @property {string} company - Комания перевозчик.
 * @property {string} checkIn - Крайний срок регистрации на рейс.
 * @property {number} freePlace - Количество свободных мест в самолете.
 * @property {string} note - Примечание.
 */

/**
 * @typedef {FlightsData | BookingData} FlightsOfBookingData
 */

/**
 * @typedef {'flights' | 'booking'} Table
 */

/**
 * @exports  DataBase
 * @typedef {'booking' | 'flights'} DataBase
 */




