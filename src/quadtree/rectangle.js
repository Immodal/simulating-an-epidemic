class Rectangle extends Boundary {
  constructor(x,y,w,h) {
    super(x, y)
    this.w = w
    this.h = h
    this.hw = this.w/2
    this.hh = this.h/2
    this.cx = this.x + this.hw
    this.cy = this.y + this.hh
  }

  /**
   * Check if the given point resides within this boundary
   * @param {Object} pt Object containing an x and y position attribute
   */
  contains(pt) {
    return pt.x >= this.x && pt.x < this.x+this.w && pt.y >= this.y && pt.y < this.y+this.h
  }

  /**
   * Check if the two boundaries intersect
   * @param {Boundary} other 
   */
  intersects(other) {
    if (other instanceof Rectangle) return Boundary.rectangleIntersect(this, other)
    else if (other instanceof Circle) return Boundary.rectangleCircleIntersect(this, other)
    else null
  }
}