const express = require('express');
const router = express.Router();
const request = require('request');
// const LetterList = require('../models/letter-list.js');


router.get('/', (req, res) => {
    console.log('Redirect to /a');
    res.render('index');
});

// router.get('/letter=:letter/page=:page', (req, res) => {
//   var letter = req.params.letter;
//   var page = req.params.page;
//   console.log('letter=>', letter, 'page=>', page);
//   var url = `https://ibl.api.bbci.co.uk/ibl/v1/atoz/${letter}/programmes?page=${page}`;
//   request(url, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       console.log('BBC API response', response.statusCode);
//       var letter = new LetterList();
//       var data = JSON.parse(body);
//       letter.init(data);
//       res.render('show', { letter } );
//     }
//   });
// });

module.exports = router;
