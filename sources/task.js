var gulp = require("gulp");
var del = require("del");

var util = require("./util.js");
var extend = require("./extend.js");
var normalize = require("./normalize.js");
var system = require("./system.js");

var Processor = require("./processor.js");

var Task = (function (Processor) {
    extend(Task, Processor);

    function Task(options) {
        Processor.call(this, options);

        this.tasks = {};

        this.addTask("install", function () {
            util.forEach(this.tasks, function (func, task) {
                gulp.task(options.name + ":" + task, func);
            });
        }.bind(this));

        this.addTask("clean", function () {
            del.sync(options.output);
        });

        this.addTask("build", function () {
            util.forEach(options.loaders, function (loader) {
                this.getProcessor(loader.options.processor)(options);
            }.bind(this));
        }.bind(this));

        this.addTask("watch", function () {
            util.forEach(options.loaders, function (loader) {
                gulp.watch(loader.watch, function (event) {
                    this.getProcessor(loader.options.processor)(options, function () {
                        system.info("Changed", "File '" + system.chalk.cyan(event.path) + "' was " + event.type + ", running tasks...");
                    });
                }.bind(this));
            }.bind(this));
        }.bind(this));

        util.forEach(options.tasks, function (func, task) {
            this.addTask(task, func);
        }.bind(this));
    }

    Task.prototype.addTask = function (task, func) {
        this.setTask(task, func);
    };

    Task.prototype.setTask = function (task, func) {
        this.tasks[task] = func;
    };

    Task.prototype.getTask = function (task) {
        return this.tasks[task] || function () {};
    };

    Task.prototype.removeTask = function (task) {
        delete this.tasks[task];
    };

    return Task;
})(Processor);

module.exports = Task;
