const mix  = require('laravel-mix');

mix.js('assets/js/app.js', 'public/js')
    .sass('assets/sass/app.scss', 'public/css')
    .copyDirectory('node_modules/slick-carousel/slick/fonts', 'public/css/fonts')
    .copy('node_modules/slick-carousel/slick/ajax-loader.gif', 'public/css/ajax-loader.gif')
    .options({
        processCssUrls: false
    });
