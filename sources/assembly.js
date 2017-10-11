var extend = require("./extend.js");
var normalize = require("./normalize.js");

var Task = require("./task.js");

var Assembly = (function (Task) {
    extend(Assembly, Task);

    function Assembly(options) {
        options = normalize(options);

        Task.call(this, options);
    }

    Assembly.prototype.install = function () {
        this.getTask("install")();

        return this;
    };

    Assembly.prototype.run = function (task) {
        this.getTask(task)();

        return this;
    };

    return Assembly;
})(Task);

module.exports = Assembly;
