$( document ).ready( ( ) => {

    const $input = $('input#postcode');
    const $form = $('#js-postcode-form');
    const $constituency = $('#js-mp-constituency');
    const $mp = $('#js-mp');
    const $email = $('#js-mp-email');
    const $twiter = $('#js-mp-twitter')
    const ajaxSettings = {
        async: true,
        crossDomain: true,
        method: 'GET'
    }

    function validate ( postcode ) {
        ajaxSettings.url = `https://api.postcodes.io/postcodes/${postcode}/validate`;
        ajaxSettings.method = 'GET';
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
        ajaxSettings.method = 'GET';
        $.ajax( ajaxSettings ).done( ( response ) => {
            let constituency = response.result[0].parliamentary_constituency;
            console.log( constituency );
            getMPby( constituency );
        });
    }

    function getMPby( constituency ) {
        ajaxSettings.url = `/getMPby=${constituency}`;
        ajaxSettings.method = 'post';
        $.ajax( ajaxSettings ).done( ( response ) => {
            let mp = response;
            mp.email = decrypt(mp.email);
            renderMp( mp );
        });
    }

    function renderMp( mp ) {
        // console.log( mp );
        $constituency.text( mp.constituency.replace(/\b\w/g, l => l.toUpperCase() ) );
        $mp.text( mp.name.replace(/\b\w/g, l => l.toUpperCase() ) );
        $email.text( mp.email ).attr('href', `mailto:${ mp.email }`);
        $twitter.text( mp.twitter.handler ).attr('href', mp.twitter.url );
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
