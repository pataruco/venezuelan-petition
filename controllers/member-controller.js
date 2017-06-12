const express = require('express');
const router = express.Router();
const request = require('request');
// const LetterList = require('../models/letter-list.js');


router.get('/', (req, res) => {
    console.log('Redirect to /a');
    res.render('index');
});



module.exports = router;
