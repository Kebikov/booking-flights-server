const express = require('express');
const { createAndConnectToDatabase } = require('./helpers/pool');
const chalk = require('chalk');
const cors = require('cors'); 
const routes = require('./routes');
require('dotenv').config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false})); 
app.use(cors());
app.use('/api', routes);


async function start() {
    try{

        app.listen(process.env.PORT, (err) => { 
            err ? console.info(chalk.bgRed('Error listen port >>> ', err)) : console.info(chalk.bgGreen.bold(`Server started on port ${process.env.PORT}...`));
        });

    }catch(err) {
        console.error('Error >>> ', err);
        process.exit(1);  
    }
}


async function checkСonnectionSQL() { 
    try { 
        const promisePool = await createAndConnectToDatabase();
        const connection = await promisePool.getConnection(); 

        const nameDB = connection.connection.config.database;
        if(nameDB) {
            console.info( chalk.bgGreen.bold(`Connection SQL: ${nameDB}...`) );
        } else {
            console.info( chalk.bgRed.bold('Error: Connection SQL') );
        }
    }catch (error) {
        console.error( chalk.bgRed.bold('Error in Function checkSQL >>> '), error);
    }

} 

checkСonnectionSQL();

start(); 
