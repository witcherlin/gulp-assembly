class Point
  constructor: (x, y) ->
    @x = x
    @y = y

  equal: (point) ->
    @x == point.x && @y == point.y

  log: ->
    console.log "x: #{@x}, y: #{@y}"

module.exports = Point
