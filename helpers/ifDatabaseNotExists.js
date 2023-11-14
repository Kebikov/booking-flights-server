const mysql = require('mysql2');
const chalk = require('chalk');
const { createTableBooking, createTableFlights } = require('../data/tableSql');
const transformData = require('./transformData');
const fakeDataBooking = require('../data/fakeDataBooking');
const fakeDataFlights = require('../data/fakeDataFlights');

/**
 * Функция создает : 
 * - BD с именем в process.env.MYSQL_DB
 * - две таблицы(booking и flights)
 * - неполняет начальными данными таблицы
 * @returns {void}
 */
const ifDatabaseNotExists = async () => {
    try {
        const pool = mysql.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD
        });
        const promisePool = pool.promise();

        // создание: BD с именем в process.env.MYSQL_DB
        await promisePool.query(`CREATE DATABASE ${process.env.MYSQL_DB}`);

        // Использование созданной базы данных
        await promisePool.query(`USE ${process.env.MYSQL_DB}`);

        // создание: две таблицы(booking и flights)
        await promisePool.query(createTableBooking);
        await promisePool.query(createTableFlights);

        // наполняем данными таблицу booking, преобразуя обьект в строку с помошью transformData
        await promisePool.query(`
            INSERT INTO booking 
            (route, surname, name, middleName, date, sit, note) 
            VALUES ${transformData(fakeDataBooking)}`
        );

        // наполняем данными таблицу flights, преобразуя обьект в строку с помошью transformData
        await promisePool.query(`
            INSERT INTO flights 
            (route, city, date, company, checkIn, freePlace, note) 
            VALUES ${transformData(fakeDataFlights)}` 
        );

        // закрываем  созданный promisePool
        await promisePool.end();

        console.log(`Database ${process.env.MYSQL_DB} created.`);
    }catch (error) {
        console.error( chalk.bgRed.bold('Error in Function ifDatabaseNotExists >>> '), error );
    }
}

module.exports = ifDatabaseNotExists;