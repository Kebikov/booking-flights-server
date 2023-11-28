const express = require('express');
const router = express.Router({mergeParams: true});


//= router.get('/curent-time')
router.get('/curent-time', async (req, res) => { 
    try {
        const date = new Date();
        const dataTime = new Date(date).getTime();
        return res.status(200).send({time: dataTime}); 
    }catch (error) {
        res.status(500).json({message: `Ошибка сервера, попробуйте позже...${error}`});
    }
});




module.exports = router;

