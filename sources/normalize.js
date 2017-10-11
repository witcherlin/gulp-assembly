var util = require("./util.js");
var system = require("./system.js");

var Normalize = (function () {
    var regex = /{([\w:.-]+)}/g;

    function Normalize(options) {
        return Normalize.replaceOptions(options, Normalize.replaceDependencies(Normalize.generateDependencies(options)));
    }

    Normalize.generateDependencies = function (object, prefix) {
        var dependencies = {};

        util.forEach(object, function (value, key) {
            var name = prefix ? prefix + "." + key : key;

            if (util.isArray(value) || util.isObject(value)) {
                dependencies = util.extend(dependencies, Normalize.generateDependencies(value, name));
            } else {
                dependencies[name] = value;
            }
        });

        return dependencies;
    };

    Normalize.replaceDependencies = function (dependencies) {
        var recursion = false;

        util.forEach(dependencies, function (value, key) {
            util.matchRegex(regex, value, function (match) {
                if (match[1] !== key) {
                    if (dependencies[match[1]]) {
                        dependencies[key] = dependencies[key].replace(new RegExp(match[0], "g"),  dependencies[match[1]]);
                        recursion = true;
                    }
                } else {
                    system.error("Recursion in '" + system.chalk.red(key + ": " + value) + "'");
                    process.exit(0);
                    return false;
                }
            });
        });

        if (recursion) {
            dependencies = Normalize.replaceDependencies(dependencies);
        }

        return dependencies;
    };

    Normalize.replaceOptions = function (object, dependencies) {
        util.forEach(object, function (value, key) {
            if (util.isArray(value) || util.isObject(value)) {
                Normalize.replaceOptions(value, dependencies);
            } else {
                util.matchRegex(regex, value, function (match) {
                    object[key] = object[key].replace(new RegExp(match[0], "g"), dependencies[match[1]]);
                });
            }
        });

        return object;
    };

    return Normalize;
})();

module.exports = Normalize;
