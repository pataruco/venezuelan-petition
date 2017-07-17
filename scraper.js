'use strict';
const request = require('request');
const cheerio = require('cheerio');


class MPLinks {

     get links() {
          return this.getMPLinks;
     }

     getMPLinks() {
          let options = {
              method: 'GET',
              url:  'http://www.parliament.uk/mps-lords-and-offices/mps/'
          }
          request( options, ( error, response, body ) => {
               if (error) throw new Error( error );
               if ( !error &&  response.statusCode == 200 ) {
                    let $ = cheerio.load(body);
                    let links = $('table > tbody > tr > td > a');
                    mpLinks = links.map()
               }
          });
     }
}

let scraper =  new Scraper( );
scraper.links();
