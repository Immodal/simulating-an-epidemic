let field;

function setup() {
  createCanvas(500, 500)
  field = new Field(100, 100, 300, 300)

  for(let i=0; i<500; i++) {
    const rx = random(field.x, field.x+field.w)
    const ry = random(field.y, field.y+field.h)
    const rv = createVector(random(-0.3, 0.3), random(-0.3, 0.3))
    field.insert(new Point(rx, ry, rv))
  }
}

function draw() {
  field.update()
  field.draw()
}