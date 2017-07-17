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
                    let urls = [ ];
                    for ( var i = 0; i < links.length; i++ ) {
                        let $element = $( links[i] );
                        let name = $element.text();
                        let link = $element.attr('href');
                        if ( name !== 'back to top' ) {
                             urls.push( links );
                        }
                    }
                    console.log( urls );
                    // let MPLinks = links.map( ( link ) => {
                    //      let $element = $( link );
                    //      let name = $element.text();
                    //      console.log( name );
                    //      let url = $element.attr('href');
                    // })
               }
          });
     }
}

let scraper =  new MPLinks( );
scraper.links()
