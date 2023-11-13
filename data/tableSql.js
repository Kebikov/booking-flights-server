
/**
 * Команда создания таблицы SQL
 * @type {string}
 */
const createTableBooking = `
    CREATE TABLE IF NOT EXISTS booking (
        id INT AUTO_INCREMENT PRIMARY KEY,
        route VARCHAR(16), 
        surname VARCHAR(32), 
        name VARCHAR(32), 
        middleName VARCHAR(32), 
        date DATE, 
        sit TINYINT, 
        note VARCHAR(64)
    )
`;

module.exports = {
    createTableBooking
}