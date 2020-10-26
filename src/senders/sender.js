class Sender {
  constructor() {
    this.objs = []
  }

  auto() {}

  launch(from, to, target) {
    const targetCircle = new Circle(target.x, target.y, 16)

    const rand = Utils.randomInt(0, from.pts.length)
    const point = from.pts[rand]
    this.objs.push({ target:target, targetCircle:targetCircle, field:to, point:point })
    from.pts.splice(rand, 1)

    const vel = p5.Vector.sub(target, createVector(point.x, point.y))
    vel.normalize()
    vel.mult(25)
    point.velocity = vel
  }

  update() {
    const removal = []
    this.objs.forEach((obj,i) => {
      if (obj.targetCircle.contains(obj.point)) {
        removal.push(i)
        obj.point.x = obj.targetCircle.x
        obj.point.y = obj.targetCircle.y
        obj.point.velocity.limit(Point.maxSpeed)
        obj.point.randomSteer()
        obj.field.insert(obj.point)
      } else {
        obj.point.move(true)
      }
    })

    for(let i=removal.length-1; i>=0; i--) {
      this.objs.splice(removal[i], 1)
    }
  }

  draw(debug=false) {
    this.objs.forEach(obj => {
      if (debug) {
        stroke(255, 255, 0)
        noFill()
        circle(obj.targetCircle.x, obj.targetCircle.y, obj.targetCircle.r*2)
      }
      obj.point.draw()
    })
  }
}