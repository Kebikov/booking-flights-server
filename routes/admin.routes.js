const express = require('express');
const router = express.Router({mergeParams: true});
const chalk = require('chalk');
const { createAndConnectToDatabase: pool } = require('../helpers/pool');


//= router.get('/curent-time')
router.get('/curent-time', async (req, res) => {
    try {
        console.log('TIME');
        const date = new Date();
        const dataTime = new Date(date).getTime();

        return res.status(200).send({time: dataTime});
    }catch (err) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${err}`});
    }
});

//= router.get('/curent-time')
router.get('/time', async (req, res) => {
    try {
        const promisePool =  await pool();
        const [rows] = await promisePool.query('SELECT * FROM booking');

        return res.status(200).send(rows);
    }catch (err) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${err}`});
    }
});


module.exports = router;

