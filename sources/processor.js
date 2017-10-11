var gulp = require("gulp");
var when = require("gulp-if");
var less = require("gulp-less");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var cssmin = require("gulp-cssmin");
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var annotate = require("gulp-ng-annotate");

var tsify = require("tsify");
var coffeeify = require("coffeeify");
var babelify = require("babelify");
var browserify = require("browserify");

var stream = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");

var del = require("del");

var util = require("./util.js");

var Processor = (function () {
    function Processor(options) {
        this.processors = {};

        this.addProcessor("ts", function (options, done) {
            return browserify(options.loaders.javascript.entry, {
                basedir: options.dir,
                debug: options.loaders.javascript.options.debug
            })
                .plugin(tsify, {
                    sourceMap: options.loaders.javascript.options.debug,
                    noImplicitAny: true,
                    emitDecoratorMetadata: true,
                    experimentalDecorators: true,
                    target: "es5"
                })
                .bundle()
                .pipe(stream(options.name + ".js"))
                .pipe(buffer())
                .pipe(annotate())
                .pipe(when(!options.loaders.javascript.options.debug, uglify()))
                .pipe(gulp.dest(options.output))
                .on("end", function () {
                    return gulp.src(options.loaders.javascript.vendors)
                        .pipe(concat(options.name + ".vendor.js"))
                        .pipe(gulp.dest(options.output))
                        .on("end", function () {
                            if (util.isFunction(done)) {
                                done();
                            }
                        });
                });
        });

        this.addProcessor("es5", function (options, done) {
            return browserify(options.loaders.javascript.entry, {
                debug: options.loaders.javascript.options.debug
            })
                .bundle()
                .pipe(stream(options.name + ".js"))
                .pipe(buffer())
                .pipe(annotate())
                .pipe(when(!options.loaders.javascript.options.debug, uglify()))
                .pipe(gulp.dest(options.output))
                .on("end", function () {
                    return gulp.src(options.loaders.javascript.vendors)
                        .pipe(concat(options.name + ".vendor.js"))
                        .pipe(gulp.dest(options.output))
                        .on("end", function () {
                            if (util.isFunction(done)) {
                                done();
                            }
                        });
                });
        });

        this.addProcessor("es6", function (options, done) {
            return browserify(options.loaders.javascript.entry, {
                debug: options.loaders.javascript.options.debug
            })
                .transform(babelify, {
                    presets: [
                        "es2015"
                    ],
                    plugins: [
                        "transform-class-properties"
                    ]
                })
                .bundle()
                .pipe(stream(options.name + ".js"))
                .pipe(buffer()) 
                .pipe(annotate())
                .pipe(when(!options.loaders.javascript.options.debug, uglify()))
                .pipe(gulp.dest(options.output))
                .on("end", function () {
                    return gulp.src(options.loaders.javascript.vendors)
                        .pipe(concat(options.name + ".vendor.js"))
                        .pipe(gulp.dest(options.output))
                        .on("end", function () {
                            if (util.isFunction(done)) {
                                done();
                            }
                        });
                });
        });

        this.addProcessor("coffee", function (options, done) {
            return browserify(options.loaders.javascript.entry, {
                debug: options.loaders.javascript.options.debug
            })
                .transform(coffeeify, {
                    extensions: [
                        ".coffee"
                    ]
                })
                .bundle()
                .pipe(stream(options.name + ".js"))
                .pipe(buffer())
                .pipe(annotate())
                .pipe(when(!options.loaders.javascript.options.debug, uglify()))
                .pipe(gulp.dest(options.output))
                .on("end", function () {
                    return gulp.src(options.loaders.javascript.vendors)
                        .pipe(concat(options.name + ".vendor.js"))
                        .pipe(gulp.dest(options.output))
                        .on("end", function () {
                            if (util.isFunction(done)) {
                                done();
                            }
                        });
                });
        });

        this.addProcessor("less", function (options, done) {
            return gulp.src(options.loaders.styles.entry)
                .pipe(when(options.loaders.styles.options.debug, sourcemaps.init()))
                .pipe(less())
                .pipe(when(options.loaders.styles.options.debug, sourcemaps.write()))
                .pipe(autoprefixer({
                    browsers: ["last 2 versions"],
                    cascade: false
                }))
                .pipe(when(!options.loaders.styles.options.debug, cssmin()))
                .pipe(rename(options.name + ".css"))
                .pipe(gulp.dest(options.output))
                .on("end", function () {
                    return gulp.src(options.loaders.styles.vendors)
                        .pipe(concat(options.name + ".vendor.css"))
                        .pipe(gulp.dest(options.output))
                        .on("end", function () {
                            if (util.isFunction(done)) {
                                done();
                            }
                        });
                });
        });

        this.addProcessor("scss", function (options, done) {
            return gulp.src(options.loaders.styles.entry)
                .pipe(when(options.loaders.styles.options.debug, sourcemaps.init()))
                .pipe(sass())
                .pipe(when(options.loaders.styles.options.debug, sourcemaps.write()))
                .pipe(autoprefixer({
                    browsers: ["last 2 versions"],
                    cascade: false
                }))
                .pipe(when(!options.loaders.styles.options.debug, cssmin()))
                .pipe(rename(options.name + ".css"))
                .pipe(gulp.dest(options.output))
                .on("end", function () {
                    return gulp.src(options.loaders.styles.vendors)
                        .pipe(concat(options.name + ".vendor.css"))
                        .pipe(gulp.dest(options.output))
                        .on("end", function () {
                            if (util.isFunction(done)) {
                                done();
                            }
                        });
                });
        });

        util.forEach(options.processors, function (func, task) {
            this.addProcessor(task, func);
        }.bind(this));
    }

    Processor.prototype.addProcessor = function (processor, func) {
        this.setProcessor(processor, func);
    };

    Processor.prototype.setProcessor = function (processor, func) {
        this.processors[processor] = func;
    };

    Processor.prototype.getProcessor = function (processor) {
        return this.processors[processor] || function () {};
    };

    Processor.prototype.removeProcessor = function (processor) {
        delete this.processors[processor];
    };

    return Processor;
})();

module.exports = Processor;
