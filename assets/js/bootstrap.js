
window._ = require('lodash');

try {
    window.$ = window.jQuery = require('jquery');
    window.moment = require('moment');
    // require('bootstrap-sass');
} catch (e) {}
