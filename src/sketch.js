let field;

function setup() {
  createCanvas(600, 600)
  //frameRate(1)
  field = new Field(50, 50, 500, 500)

  for(let i=0; i<500; i++) {
    const rx = random(field.x, field.x+field.w)
    const ry = random(field.y, field.y+field.h)
    const rv = createVector(random(-Point.maxSpeed, Point.maxSpeed), random(-Point.maxSpeed, Point.maxSpeed))
    let st = Point.SUSCEPTIBLE
    if (random()<0.01) st = Point.INFECTIOUS1
    const point = new Point(rx, ry, rv, st)
    //if (random()<0.5) point.ignoreSocialDistancing = true
    field.insert(point)
  }
}

function draw() {
  field.update()
  field.draw()
}