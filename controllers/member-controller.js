const express = require('express');
const router = express.Router();
const request = require('request');


router.get('/', (req, res) => {
    res.render('index');
});

router.post('/getMPby=:constituency', ( req, res ) => {
    let constituency = req.params.constituency;
    console.log(constituency);
});



module.exports = router;
