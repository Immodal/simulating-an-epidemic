
/**
 * Button that is drawn on the canvas
 */
class Button {
  constructor(x, y, w, h, msg, callback, state=false) {
    this.boundary = new Rectangle(x, y, w, h)
    this.msg = msg
    this.callback = callback
    this.state = state
  }

  inBounds(x, y) {
    return this.boundary.contains({x:x ,y:y})
  }

  action() {
    this.callback()
  }

  draw() {
    strokeWeight(2)
    if (this.state) {
      stroke(0)
      fill(Point.COLOR_INFECTIOUS1)
    } else {
      stroke(COLOR_LIGHT_GRAY)
      noFill()
    }
    rect(this.boundary.x, this.boundary.y, this.boundary.w, this.boundary.h, 5)
    textAlign(CENTER, CENTER)
    rectMode(CENTER)

    textSize(12)
    strokeWeight(0)
    if (this.state) fill(0)
    else fill(COLOR_LIGHT_GRAY)
    text(this.msg, this.boundary.cx, this.boundary.cy+2, this.boundary.w, this.boundary.h)
    rectMode(CORNER)
  }
}