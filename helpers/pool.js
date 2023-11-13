const mysql = require('mysql2');
require('dotenv').config(); 
const { createTableBooking } = require('../data/tableSql');
const { fakeData, transformData } = require('../data/fakeData');


// Проверяем существование базы данных 
async function checkDatabaseExists() {
    try {
        const pool = mysql.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD
        });

        const promisePool = pool.promise();
        const [rows] = await promisePool.query(`SHOW DATABASES LIKE '${process.env.MYSQL_DB}'`);
        return rows.length > 0;
    } catch (error) {
        throw error;
    }
}


// Создаем базу данных, если она не существует, и подключаемся к ней
async function createAndConnectToDatabase() {
    try {
        const databaseExists = await checkDatabaseExists(); 

        if (!databaseExists) {
            const pool = mysql.createPool({
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD
            });

            const promisePool = pool.promise();
            await promisePool.query(`CREATE DATABASE ${process.env.MYSQL_DB}`);

            // const [rows] = await promisePool.query(createTableQuery);
            
            console.log(`Database ${process.env.MYSQL_DB} created.`);
        }

        // Подключаемся к базе данных
        const pool = mysql.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            database: process.env.MYSQL_DB,
            password: process.env.MYSQL_PASSWORD
        });

        const promisePool = pool.promise(); 

        //await promisePool.query(createTableBooking);
        // await promisePool.query(`
        //     INSERT INTO booking 
        //     (route, surname, name, middleName, date, sit, note) 
        //     VALUES ${transformData(fakeData)}`
        // );
        return promisePool;
    }catch (error) {
        console.log('Error in Function  >>> ', error);
    }
}


module.exports = { createAndConnectToDatabase };