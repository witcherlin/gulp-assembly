class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    equal(point) {
        return this.x === point.x && this.y === point.y;
    }

    log() {
        console.log(`x: ${this.x}, y: ${this.y}`);
    }
}

export {
    Point as default
}
