var Point = require("./point.js");

console.log("ecmascript5");

var a = new Point(10, 20);
var b = new Point(12, 33);
var c = new Point(12, 33);

a.log();
b.log();
c.log();

console.log(a.equal(b));
console.log(b.equal(c));
