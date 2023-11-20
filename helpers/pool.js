const mysql = require('mysql2');
require('dotenv').config(); 

const checkDatabaseExists = require('./checkDatabaseExists');
const ifDatabaseNotExists = require('./ifDatabaseNotExists');


/**
 * Функция по : 
 * - проверке cушествования BD
 * - если нет BD то : создает BD, создает таблицы(booking и flights) и наполняет данными
 * @returns {Promise} вернет promisePool для далянейшего подключения
 * @example
 * const { createAndConnectToDatabase: pool } = require('../helpers/pool');
 * const promisePool =  await pool();
 * const [rows] = await promisePool.query('SELECT * FROM booking');
 */
async function createAndConnectToDatabase() {
    try {

        const isDatabaseExists = await checkDatabaseExists(); 

        if (!isDatabaseExists) {
            await ifDatabaseNotExists();
        }

        // Подключаемся к базе данных
        const pool = mysql.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            database: process.env.MYSQL_DB,
            password: process.env.MYSQL_PASSWORD,
            typeCast: function(field, next) { // Отключите преобразование даты
                if (field.type === 'DATETIME') {
                    return field.string();
                }
                    return next();
                }
        });

        const promisePool = pool.promise(); 

        

        return promisePool;
        
    }catch (error) {
        console.error( chalk.bgRed.bold('Error in Function createAndConnectToDatabase >>> '), error );
    }
}


module.exports = { createAndConnectToDatabase };