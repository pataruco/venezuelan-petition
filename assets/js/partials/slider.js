$( document ).ready( ( ) => {
    const $slider = $('#js-slider');
    $slider.slick({
        adaptiveHeight: true,
        dots: true,
        arrows: true,
        prevArrow: '<button class="slider__arrow slider__arrow--left"></button>',
        nextArrow: '<button class="slider__arrow slider__arrow--right"></button>',
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    adaptiveHeight: false
                }
            },
            {
                breakpoint: 320,
                settings: {
                    adaptiveHeight: false,
                    dots: false
                }
            }
        ]
    });
});
