var gulp = require("gulp");
var assembly = require("../index");

var test = assembly({
    name: "test",
    dir: "./{name}",
    output: "{dir}/../bundle/{name}",
    sources: "{dir}/sources",
    loaders: {
        javascript: {
            options: {
                processor: "es5",
                debug: true
            },
            vendors: [
                "{dir}/assets/test.js"
            ],
            watch: [
                "!{sources}/js/backup/**/*.js",
                "{sources}/js/**/*.js"
            ],
            entry: "{sources}/js/main.js"
        },
        styles: {
            options: {
                processor: "less",
                debug: true
            },
            vendors: [
                "{dir}/assets/test.css"
            ],
            watch: [
                "!{sources}/styles/backup/**/*.less",
                "{sources}/styles/**/*.less"
            ],
            entry: "{sources}/styles/main.less"
        }
    }
}).install();

var test1 = assembly({
    name: "test1",
    dir: "./{name}",
    output: "{dir}/../bundle/{name}",
    sources: "{dir}/sources",
    loaders: {
        html: {
            options: {
                processor: "html",
                debug: true
            },
            watch: [
                "!{sources}/html/backup/**/*.html",
                "{sources}/html/**/*.html"
            ],
            entry: "{sources}/html/index.html"
        },
        javascript: {
            options: {
                processor: "es5",
                debug: true
            },
            vendors: [
                "{dir}/assets/test.js"
            ],
            watch: [
                "!{sources}/js/backup/**/*.js",
                "{sources}/js/**/*.js"
            ],
            entry: "{sources}/js/main.js"
        },
        styles: {
            options: {
                processor: "less",
                debug: true
            },
            vendors: [
                "{dir}/assets/test.css"
            ],
            watch: [
                "!{sources}/styles/backup/**/*.less",
                "{sources}/styles/**/*.less"
            ],
            entry: "{sources}/styles/main.less"
        }
    },
    processors: {
        html: function (options, done) {
            console.log("custom html settings");
        }
    },
    tasks: {
        temp: function (options) {
            console.log(options);
        }
    }
}).install();

/////////////////////////
// TODO: METHOD 1
/////////////////////////

//gulp.task("temp", function () {
//    test1.run("temp");
//});
//
//gulp.task("clean", function () {
//    test.run("clean");
//    test1.run("clean");
//});
//
//gulp.task("build", ["clean"], function () {
//    test.run("build");
//    test1.run("build");
//});
//
//gulp.task("watch", ["build"], function () {
//    test.run("watch");
//    test1.run("watch");
//});

/////////////////////////
// TODO: METHOD 2
/////////////////////////

gulp.task("temp", [
    "test:temp",
    "test1:temp"
]);

gulp.task("clean", [
    "test:clean",
    "test1:clean"
]);

gulp.task("build", [
    "clean",
    "test:build",
    "test1:build"
]);

gulp.task("watch", [
    "build",
    "test:watch",
    "test1:watch"
]);
