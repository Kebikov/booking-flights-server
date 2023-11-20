
/**
 * Команда создания таблицы SQL : booking
 * @type {string}
 */
const createTableBooking = `
    CREATE TABLE IF NOT EXISTS booking (
        id INT AUTO_INCREMENT PRIMARY KEY,
        route VARCHAR(16), 
        surname VARCHAR(32), 
        name VARCHAR(32), 
        middleName VARCHAR(32), 
        date DATETIME, 
        sit TINYINT, 
        note VARCHAR(64)
    )
`;

/**
 * Команда создания таблицы SQL : flights
 * @type {string}
 */
const createTableFlights = `
    CREATE TABLE IF NOT EXISTS flights (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        route VARCHAR(16), 
        city VARCHAR(32), 
        date DATETIME, 
        company VARCHAR(32), 
        checkIn DATETIME, 
        freePlace TINYINT, 
        note VARCHAR(64)
    )
`;

module.exports = {
    createTableBooking,
    createTableFlights
}