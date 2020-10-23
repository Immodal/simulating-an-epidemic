class Circle extends Boundary {
  constructor(x,y,r) {
    super(x, y)
    this.r = r
  }

  /**
   * Check if the given point resides within this boundary
   * @param {Object} pt Object containing an x and y position attribute
   */
  contains(pt) {
    // Euclidean distance
    return Boundary.dist(pt.x, pt.y, this.x, this.y) <= this.r
  }

  /**
   * Check if the two boundaries intersect
   * @param {Boundary} other 
   */
  intersects(other) {
    if (other instanceof Rectangle) return Boundary.rectangleCircleIntersect(other, this)
    else if (other instanceof Circle) return Boundary.circleIntersect(this, other)
    else null
  }
}