const mix  = require('laravel-mix');


mix.sass('assets/sass/app.scss', 'public/css')
    .sass('node_modules/animate.css/animate.min.css', 'public/css')
    .copyDirectory('node_modules/slick-carousel/slick/fonts', 'public/css/fonts')
    .copy('node_modules/slick-carousel/slick/ajax-loader.gif', 'public/css/ajax-loader.gif')
    .options({
        processCssUrls: false
    });

mix.js('assets/js/app.js', 'public/js');
