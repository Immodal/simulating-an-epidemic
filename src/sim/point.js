class Point {
  constructor(x, y, velocity) {
    this.x = x
    this.y = y
    this.velocity = velocity
    this.r = 2
  }

  move() {
    this.x += this.velocity.x
    this.y += this.velocity.y
  }

  randomSteer() {
    this.velocity.rotate(random(-HALF_PI/8, HALF_PI/8))
  }

  draw() {
    stroke(255)
    strokeWeight(this.r*2)
    point(this.x, this.y)
  }
}