class Point {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    equal(point: Point): boolean {
        return this.x === point.x && this.y === point.y;
    }

    log(): void {
        console.log(`x: ${this.x}, y: ${this.y}`);
    }
}

export {
    Point as default
}
