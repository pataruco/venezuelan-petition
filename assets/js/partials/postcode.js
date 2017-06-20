$( document ).ready( ( ) => {
    const mailtoLink = require('mailtolink');
    const $input = $('input#postcode');
    const $form = $('#js-postcode-form');
    const $constituency = $('#js-mp-constituency');
    const $name = $('#js-mp');
    const $email = $('#js-mp-email');
    const $twitter = $('#js-mp-twitter');
    const $website = $('#js-mp-website');
    const $MPReveal = $('.js-mp-reveal');
    const $MPButton = $('#js-mp-button');
    const $letterReveal = $('.js-letter-reveal');
    const $emailtime = $('#js-email-time');
    const $emailTo = $('#js-email-addressed');
    const $emailInput = $('.js-email-name');
    const $emailForm = $('#js-email-form');
    const ajaxSettings = {
        async: true,
        crossDomain: true,
        method: 'GET'
    }

    let postcodeApiData = {}
    let mpData = { }


    function validate ( postcode ) {
        ajaxSettings.url = `https://api.postcodes.io/postcodes/${postcode}/validate`;
        ajaxSettings.method = 'GET';
        $.ajax( ajaxSettings ).done( ( response ) => {
            let validation = response;
            if ( validation.result ) {
                return getConstituency( postcode );
            }
            $input.addClass('has-error animated shake').attr('placeholder', 'Postcode not found');
        });
    }

    function getConstituency( postcode ) {
        ajaxSettings.url = `https://api.postcodes.io/postcodes?q=${postcode}`;
        ajaxSettings.method = 'GET';
        $.ajax( ajaxSettings ).done( ( response ) => {
            let postcodeApiData  = response.result[0];
            let constituency = response.result[0].parliamentary_constituency;
            getMPby( constituency );
        });
    }

    function getMPby( constituency ) {
        ajaxSettings.url = `/getMPby=${constituency}`;
        ajaxSettings.method = 'post';
        $.ajax( ajaxSettings ).done( ( response ) => {
            mp = response;
            mpData = response;
            mp.email = decrypt(mp.email);
            renderMp( mp );
        });
    }

    function showReveal( $element ){
        $element.slideDown( 600 )
            .addClass('center-align');
        $('html, body').animate({
            scrollTop: $element.offset().top
        }, 1000 );
    }

    function renderMp( mp ) {
        showReveal( $MPReveal );
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

    function renderEmailDate( ) {
        let today = moment().format('Do of MMM of YYYY');
        $emailtime.text( today );
    }

    function renderEmailTo() {
        let addressTo = mp.address_as.replace( /\b\w/g, l => l.toUpperCase() )
        $emailTo.text( addressTo  );
    }

    function revealLetter( e ) {
         showReveal( $letterReveal )
         renderEmailDate();
         renderEmailTo();
    }
    function sendEmail( e ) {
        e.preventDefault();
        let from = $emailInput.val( );
        let email = setEmail( from );
        window.location.href = email;
    }

    function setEmail( from ) {
        let email = mailtoLink(mpData.email, {
            subject: 'Venezuela Appeal',
            body: [
                `Dear ${ mpData.address_as.replace( /\b\w/g, l => l.toUpperCase() ) },`,
                ``,
                `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
                ``,
                `Your Sincerously`,
                ``,
                `${ from }`
            ].join('\n')
        });
        return email;
    }

    function clearError ( e ) {
        $(this).removeClass('has-error animated shake').attr('placeholder', 'Postcode');
    }

    $emailForm.on('submit', sendEmail );
    $MPButton.on('click', revealLetter );
    $form.on('submit', getValue );
    $input.on('focus', clearError )

}); //end of document
