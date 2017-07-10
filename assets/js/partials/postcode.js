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
    const $emailMPTitle = $('#js-email-mp-title');
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
        let addressTo = mp.address_as.replace( /\b\w/g, l => l.toUpperCase() );
        let mpTitle = mp.name.replace( /\b\w/g, l => l.toUpperCase() ).replace('Mp', 'MP');
        $emailTo.text( addressTo  );
        $emailMPTitle.text( mpTitle );
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
                `${ mp.name.replace( /\b\w/g, l => l.toUpperCase() ).replace('Mp', 'MP') }`,
                ``,
                `House of Commons`,
                ``,
                `London`,
                ``,
                `SW1A 0AA`,
                ``,
                `Dear ${ mpData.address_as.replace( /\b\w/g, l => l.toUpperCase() ) },`,
                ``,
                `Re.: Basic Constitutional Freedoms in Venezuela`,
                ``,
                `I am writing to draw your attention to the recent developments in Venezuela and to kindly request your help, as a resident of the constituency you represent, to raise this matter before the British Parliament.`,
                ``,
                `During the last three months Venezuela has seen a general outburst of anti-government protests across the country. Years of economic crisis, hyper-inflation, severe food shortages and grave human rights violations have increased social discontent and heightened tension between political actors.`,
                ``,
                `The situation escalated into violence after a number of institutions controlled by the ruling party, took a series of decisions aimed to suppress political dissent and to illegitimately increase the government’s power, including striping the opposition-controlled National Assembly of its authority, illegally barring opposition leaders from running for public office and using military courts to trial political activists. Additionally, in an attempt to circumvent the incumbent National Assembly, President Nicolas Maduro recently called for a new Constitutional Assembly where more than half of its members will not be elected by direct, universal and secret suffrage, as required by the existent constitution and international standards.`,
                ``,
                `The government assault to democracy has triggered massive demonstrations across the country. The protests have been disproportionally repressed by official security forces and armed paramilitary groups. As of the date of this letter, the brutal repression has resulted in more than 90 protesters killed, more than 15,000 injured and near 1,200 detained.`,
                ``,
                `The UN Human Rights Commission, the US Congress, the EU Parliament, the Spanish Legislature and the Organisations of American States have strongly condemned the disproportionate use of public force and expressed their concern for the breach of democratic order in Venezuela. On 9 April 2016 the UK Foreign Office issued a short statement also condemning the recent developments in the country.`,
                ``,
                `As MP in one of the most influencing and leading democracies within the International Community I would like to request your help to voice Venezuela’s current developments at the British Parliament. I strongly believe that this honourable Parliament cannot remain indifferent to a situation that contradict British values, and should take a position as soon as possible, as Venezuela is listed in the Human Rights Priority Country Report published by the Foreign Commonwealth Office on 26 April 2016.`,
                ``,
                `I thank you in advance for your consideration and would be happy to discuss this issue with you further as well as to provide you with more detailed information if required.`,
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
