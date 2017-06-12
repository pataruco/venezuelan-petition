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
        ajaxSettings.url = `/getMPby=${constituency}`;
        ajaxSettings.method = 'post';
        $.ajax( ajaxSettings ).done( ( response ) => {
            console.log( response );
        });
    }

    function getValue( e ) {
        e.preventDefault();
        let postcode = $('input#postcode').val();
        validate( postcode );
    }

    $form.on('submit', getValue )

}); //end of document
