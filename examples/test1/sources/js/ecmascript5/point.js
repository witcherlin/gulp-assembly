function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.equal = function (point) {
    return this.x === point.x && this.y === point.y;
};

Point.prototype.log = function () {
    console.log("x: " + this.x + ", y: " + this.y);
};

module.exports = Point;
