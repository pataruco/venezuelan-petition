'use strict';
const request = require('request');
const cheerio = require('cheerio');
let mps = [ ];
const filesystem = require('fs');
let numberOfMPs = 0;
let MPsCounter = 0;


function getMPsIndexPage( error, response, body ) {
    if (error) throw new Error( error );
    if ( !error &&  response.statusCode == 200 ) {
        let $ = cheerio.load(body);
        let links = $('table > tbody > tr > td > a');
        getEachMPsShowPage( links, $ );
    }
}

function getEachMPsShowPage( links, $ ) {
    for ( var i = 0; i < links.length; i++ ) {
        let $element = $( links[i] );
        let name = $element.text();
        let link = $element.attr('href');
        if ( name !== 'back to top' ) {
            numberOfMPs++;
            setTimeout( ( ) => {
                getMPShowPage( link );
            }, i * 100 );
        }
    }
}

function getMPShowPage( link ) {
    let options = {
        method: 'GET',
        url: link
    }
    request(options, getMPData);
}

function getMPData( error, response, body ) {
    if (error) console.error( error );
    if ( !error &&  response.statusCode == 200 ) {
        let $ = cheerio.load(body);
        let name =  cleanString( $('h1').text() );
        let constituency = cleanString( $('#commons-constituency').text() );
        let addressAs = cleanString( $('#commons-addressas').text() );
        let party = cleanString( $('#commons-party').text() );
        let $email = $('p[data-generic-id="email-address"] > a ');
        let email = cleanString( $email.attr('href') );
        let $twitter = $('li[data-generic-id="twitter"] > a ');
        let twitterHandler = $twitter.text();
        let twitterUrl = cleanString( $twitter.attr('href') );
        let website = cleanString( $('li[data-generic-id="website"] > a ').attr('href') );
        let mp = {
            name: name,
            constituency: constituency,
            address_as: addressAs,
            party: party,
            email: email,
            twitter: {
                handler: twitterHandler,
                url: twitterUrl
            },
            website: website
        }
         pushMP( mp );
    }
}


function startScrape() {
    let options = { method: 'GET',
                    url: 'http://www.parliament.uk/mps-lords-and-offices/mps/'
                };
    request( options, getMPsIndexPage );
}

function getMPPage( $element ) {
    let link = $element.attr('href');
    options.url = link;
    getMPData( options );
}


function pushMP( mp ){
    mps.push( mp );
    let MPsJSON = JSON.stringify( mps );
    MPsCounter++;
    console.log( `${mp.name} is scraped` );
    console.info(`${MPsCounter} of ${numberOfMPs}`);
    if ( MPsCounter === numberOfMPs ) {
        saveMembersInAFile( MPsJSON );
    }
}

// https://www.saltycrane.com/blog/2015/07/calling-javascript-python-de-cloudflare-scraped-content/
function decrypt( string ) {
    if ( string !== undefined ) {
        let hash = string.substr(string.indexOf("#") + 1);
        var e, r, n, i, a = hash;
        for (e = "", r = parseInt(a.substr(0, 2), 16), n = 2; a.length - n; n += 2) i = parseInt(a.substr(n, 2), 16) ^ r, e += String.fromCharCode(i);
        return e.toLowerCase();
    }
    return '';
}

function cleanString( string ) {
    if ( string !== undefined ) {
        return string.replace(/\n/g, '').replace(/^\s+|\s+$/g, "").toLowerCase();
    }
    return '';
}

function saveMembersInAFile( json ) {
    filesystem.writeFile('./data/members.json', json, ( error ) => {
        if ( error ) {
            return console.error( error );
        }
        console.log("The file was saved!");
    })
}

startScrape();
