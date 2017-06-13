$( document ).ready( ( ) =>{

    const $fullscreenSlide = $('.js-fullscreen-section');
    const $window = $(window);
    const $navButtons = $('#js-fullscreen-section-nav  button');

    //easy scroll
    $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });

    function checkSlidePosition ( e ) {
        for ( let slide of $fullscreenSlide ) {
            let $slide = $( slide );
            if ( $slide.isOnScreen() ) {
                return slideIsInTheView( $slide );
            }
        }
    }

    function slideIsInTheView( $slide ) {
        let sectionId = $slide.attr('id');
        let $button = $(`a[href="#${ sectionId }"] > button`);
        $navButtons.removeClass('is-active');
        $button.addClass('is-active');
    }

    $window.on('scroll', checkSlidePosition );
    $window.on('load', checkSlidePosition() );
})// end of document
