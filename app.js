const express = require('express');
const { createAndConnectToDatabase } = require('./helpers/pool');
const chalk = require('chalk');
const cors = require('cors'); 
const routes = require('./routes'); 
require('dotenv').config();

console.log(chalk.bgBlue.bold(' START '));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false})); 
app.use(cors());
app.use('/api', routes);    

async function start() {
    try{

        app.listen(process.env.PORT, (err) => { 
            err ? console.log(chalk.bgRed('Error listen port >>> ', err)) : console.log(chalk.bgGreen.bold(`Server started on port ${process.env.PORT}...`));
        });

    }catch(err) {
        console.log('Error >>> ', err);
        process.exit(1);  
    }
}


async function checkСonnectionSQL() { 
    try { 
        const promisePool = await createAndConnectToDatabase();
        const connection = await promisePool.getConnection(); 

        const nameDB = connection.connection.config.database;
        if(nameDB) {
            console.log( chalk.bgGreen.bold(`Connection SQL: ${nameDB}...`) )
        } else {
            console.log( chalk.bgRed.bold('Error: Connection SQL') )
        }
    }catch (error) {
        console.log( chalk.bgRed.bold('Error in Function checkSQL >>> '), error);
    }

} 

checkСonnectionSQL();

start(); 
