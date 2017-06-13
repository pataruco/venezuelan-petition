$( document ).ready( ( ) =>{

    const $fullscreenSlide = $('.js-fullscreen-section');
    const $window = $(window)
    const $navButtons = $('#js-fullscreen-section-nav  button')
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
            if ( isScrolledIntoView( $slide ) ) {
                return slideIsInTheView( $slide );
            }
        }
    }

    function slideIsInTheView( $slide ) {
        let sectionId = $slide.attr('id');
        console.log( sectionId );
        let $button = $(`a[href="#${ sectionId }"] > button`);
        console.log( $button );
        $navButtons.removeClass('is-active');
        $button.addClass('is-active');
    }

    function isScrolledIntoView(elem) {
        let docViewTop = $window.scrollTop();
        let docViewBottom = docViewTop + $window.height();

        let elemTop = $(elem).offset().top;
        let elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    $window.on('scroll', checkSlidePosition );




})// end of document
