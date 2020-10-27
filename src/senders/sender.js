class Sender {
  constructor() {
    this.objs = []
  }

  auto() {}

  launch(ptInd, from, to, target) {
    const targetCircle = new Circle(target.x, target.y, 16)

    const point = from.pts[ptInd]
    this.objs.push({ target:target, targetCircle:targetCircle, field:to, point:point })
    from.pts.splice(ptInd, 1)

    const vel = p5.Vector.sub(target, createVector(point.x, point.y))
    vel.normalize()
    vel.mult(25)
    point.velocity = vel
  }

  launchRandom(from, to, target) {
    this.launch(Utils.randomInt(0, from.pts.length), from, to, target)
  }

  /**
   * 
   * @param {Integer} n Number of points to test
   * @param {Field} from 
   * @param {Field} to 
   */
  testAndQuarantine(n, from, to, target) {
    let subjects = Utils.range(from.pts.length)
    Utils.shuffle(subjects)
      .slice(0, min(subjects.length, n))
      .filter(s => from.pts[s].isInfectious())
      .sort((a,b) => a<b ? 1 : a>b ? -1 : 0)
      .forEach(s => {
        from.pts[s].inQuarantine = true
        this.launch(s, from, to, target)
      })
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