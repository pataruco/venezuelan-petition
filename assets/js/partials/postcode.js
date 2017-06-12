const MP = require('../model/mp.js');

$( document ).ready( ( ) => {

    const $input = $('input#postcode');
    const $form = $('#js-postcode-form');
    const ajaxSettings = {
        async: true,
        crossDomain: true,
        method: 'GET'
    }

    function validate ( postcode ) {
        ajaxSettings.url = `https://api.postcodes.io/postcodes/${postcode}/validate`;
        $.ajax( ajaxSettings ).done( ( response ) => {
            let validation = response;
            if ( validation.result ) {
                return getConstituency( postcode );
            }
            console.error( `postcode ${postcode} not valid` );
        });
    }

    function getConstituency( postcode ) {
        ajaxSettings.url = `https://api.postcodes.io/postcodes?q=${postcode}`;
        $.ajax( ajaxSettings ).done( ( response ) => {
            let constituency = response.result[0].parliamentary_constituency;
            console.log( constituency );
            getMPby( constituency );
        });
    }

    function getMPby( constituency ) {
        let mp = new MP ( constituency )
        console.log( mp );
        console.log(decrypt(mp.email));
    }

    function getValue( e ) {
        e.preventDefault();
        let postcode = $input.val();
        $input.val('');
        validate( postcode );
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

    $form.on('submit', getValue )

}); //end of document
