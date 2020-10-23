let field;

function setup() {
  createCanvas(500, 500)
  field = new Field(0, 0, 500, 500)

  for(let i=0; i<500; i++) {
    const rx = random(field.x, field.x+field.w)
    const ry = random(field.y, field.y+field.h)
    const rv = createVector(random(-0.4, 0.4), random(-0.4, 0.4))
    let st = Point.SUSCEPTIBLE
    if (random()<0.01) st = Point.INFECTIOUS1
    field.insert(new Point(rx, ry, rv, st))
  }
}

function draw() {
  field.update()
  field.draw()
}