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
            subject: 'Basic Constitutional Freedoms in Venezuela',
            body: [
                `Dear ${ mpData.address_as.replace( /\b\w/g, l => l.toUpperCase() ) },`,
                ``,
                `House of Commons`,
                ``,
                `London`,
                ``,
                `SW1A 0AA`,
                ``,
                `Re.: Basic Constitutional Freedoms in Venezuela`,
                ``,
                `Playing an active role as MP in one of the most influent and leading democracies within the International Community must be the toughest, yet the most grateful experiences a civil servant could achieve. You not only represent my interests as a UK resident, but also serve as an inspiring example to all other foreign government systems based in the respect of Constitutional Freedoms and Human Rights.`,
                ``,
                `Bearing that in mind, I would deeply appreciate if you could push the debate in regards to the current situation in Venezuela, where over 80 students have been assassinated, and more than 15.000 have been injured as a result of the brutal repression the National Armed Forces have executed on behalf the Government to silence the protests for the food and medicine scarcity, and the basic constitutional guarantees.`,
                `With all due respect, I strongly believe that this honourable Parliament cannot remain indifferent, and should take a position as soon as possible.`,
                ``,
                `Truly yours,`,
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
    $input.on('focus', clearError );

}); //end of document
