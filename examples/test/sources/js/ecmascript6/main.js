import Point from "./point.js";

console.log("ecmascript6");

let a = new Point(10, 20);
let b = new Point(12, 33);
let c = new Point(12, 33);

a.log();
b.log();
c.log();

console.log(a.equal(b));
console.log(b.equal(c));
