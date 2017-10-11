var chalk = require("chalk");
var gutil = require("gulp-util");

var System = (function () {
    function System() {

    }

    System.chalk = chalk;

    System.log = function (title, message) {
        gutil.log(title + ":", message);
    };

    System.info = function (title, message) {
        gutil.log(System.chalk.cyan(title) + ":", message);
    };

    System.warning = function (title, message) {
        gutil.log(System.chalk.yellow(title) + ":", message);
    };

    System.error = function (title, message) {
        gutil.log(System.chalk.red(title) + ":", message);
    };

    return System;
})();

module.exports = System;
