const express = require('express');
const router = express.Router();
const request = require('request');
const MP = require('../models/mp.js');


router.get('/', (req, res) => {
    res.render('index');
});

router.post('/getMPby=:constituency', ( req, res ) => {
    let constituency = req.params.constituency;
    let mp = new MP(constituency);
    res.send( mp );
});

module.exports = router;
