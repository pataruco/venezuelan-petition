$( document ).ready( ( ) => {

    const $input = $('input#postcode');
    const $form = $('#js-postcode-form');
    const $constituency = $('#js-mp-constituency');
    const $name = $('#js-mp');
    const $email = $('#js-mp-email');
    const $twitter = $('#js-mp-twitter');
    const $website = $('#js-mp-website');
    const $mpReveal = $('.js-mp-reveal');
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

    function showMPReveal( ) {
        $mpReveal.slideDown( 500 )
            .addClass('center-align');
        $('html, body').animate({
            scrollTop: $mpReveal.offset().top
        }, 1000 );
    }

    function renderMp( mp ) {
        showMPReveal( );
        renderMPConstituency( mp );
        renderMPName( mp );
        renderMPEmail( mp );
        renderMPTwitter( mp );
        renderMPWebsite( mp );
    }

    function renderMPWebsite( mp ) {
        $website.show()
            .find('dd > a')
            .text( mp.website )
            .attr('href', mp.website );
    }

    function renderMPTwitter( mp ) {
        $twitter.show( )
            .find('dd > a ')
            .text( mp.twitter.handler )
            .attr('href', mp.twitter.url );
    }

    function renderMPEmail ( mp ) {
        $email.show()
            .find('dd > a')
            .text( mp.email )
            .attr('href', `mailto:${ mp.email }`);
    }

    function renderMPName( mp ) {
        let name = mp.name;
        name = name.replace( /\b\w/g, l => l.toUpperCase() )
                    .replace('Mp', 'MP');
        $name.show().find('dd').text( name );
    }

    function renderMPConstituency( mp ) {
        $constituency.show().
            find('dd').
            text(  mp.constituency.replace(/\b\w/g, l => l.toUpperCase() ) );
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
