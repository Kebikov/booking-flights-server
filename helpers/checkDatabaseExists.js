const mysql = require('mysql2');
const chalk = require('chalk');
/**
 * Прововерка существования базы данных : process.env.MYSQL_DB
 * @returns {boolean} вернет true, если есть такая база данных, false, если нет
 */
const checkDatabaseExists = async () => {
    let promisePool;
    try {
        const pool = mysql.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD
        });

        promisePool = pool.promise();
        const [rows] = await promisePool.query(`SHOW DATABASES LIKE '${process.env.MYSQL_DB}'`);
        return rows.length > 0;
        
    } catch (error) {
        console.error( chalk.bgRed.bold('Error in Function checkDatabaseExists >>> '), error );
    } finally {
        if(promisePool) await promisePool.end();
    }
};

module.exports = checkDatabaseExists;  