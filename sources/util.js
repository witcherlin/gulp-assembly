const lodash = require("lodash");

/**
 *
 *
 * @constructor
 */
function Util() {

}

/**
 *
 *
 * @param value
 * @returns {boolean}
 */
Util.isString = function (value) {
    return typeof value === "string";
};

/**
 *
 *
 * @param value
 * @returns {boolean}
 */
Util.isNumber = function (value) {
    return typeof value === "number";
};

/**
 *
 *
 * @param value
 * @returns {arg|boolean}
 */
Util.isArray = function (value) {
    return Array.isArray(value);
};

/**
 *
 *
 * @param value
 * @returns {boolean}
 */
Util.isObject = function (value) {
    return (!!value) && (value.constructor === Object);
};

/**
 *
 *
 * @param value
 * @returns {boolean}
 */
Util.isFunction = function (value) {
    return typeof value === "function";
};

/**
 *
 *
 * @param object
 * @param callback
 * @returns {*}
 */
Util.forEach = function (object, callback) {
    if (Util.isArray(object)) {
        for (var i = 0; i < object.length; i++) {
            if (callback.call({key: i, value: object[i]}, object[i], i) === false) {
                break;
            }
        }
    } else {
        for (var key in object) {
            if (callback.call({key: key, value: object[key]}, object[key], key) === false) {
                break;
            }
        }
    }

    return object;
};

Util.matchRegex = function (regex, string, callback) {
    var match = [];

    while ((match = regex.exec(string)) !== null) {
        if (match.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        if (callback.call({}, match) === false) {
            break;
        }
    }
};

Util.extend = function (object, properties) {
    return lodash.extend(object, properties)
};

module.exports = Util;
