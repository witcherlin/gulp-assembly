Point = require "./point.coffee"

console.log "coffee"

a = new Point 10, 20
b = new Point 12, 33
c = new Point 12, 33

a.log()
b.log()
c.log()

console.log a.equal b
console.log b.equal c
