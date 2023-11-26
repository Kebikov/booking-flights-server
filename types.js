
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
 * @typedef {Object} FilterFlightsData
 * @property {string} moreLessId - Id столбца для сортировки больше/меньше.
 * @property {boolean} moreLessState - Значение сортировки, true - от большего к меньшему, false - наоборот.
 * @property {string} route - Данные сортировки рейса.
 * @property {string} city - Данные сортировки города назначения.
 * @property {string} date - Данные сортировки дата вылета.
 * @property {string} company - Данные сортировки комании.
 * @property {string} checkIn - Данные сортировки даты регистрации на рейс.
 * @property {number} freePlace - Данные сортировки по количества свободных мест в самолете.
 */

module.exports = {BookingData}


