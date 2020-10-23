let field;

function setup() {
  createCanvas(600, 600)
  field = new Field(0, 0, 500, 500)

  for(let i=0; i<500; i++) {
    const rx = random(field.x, field.x+field.w)
    const ry = random(field.y, field.y+field.h)
    const rv = createVector(random(-Point.maxSpeed, Point.maxSpeed), random(-Point.maxSpeed, Point.maxSpeed))
    let st = Point.SUSCEPTIBLE
    if (random()<0.01) st = Point.INFECTIOUS1
    field.insert(new Point(rx, ry, rv, st))
  }
}

function draw() {
  field.update()
  field.draw()
}