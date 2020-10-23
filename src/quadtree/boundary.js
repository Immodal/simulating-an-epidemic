class Boundary {
  constructor(x,y) {
    this.x = x
    this.y = y
  }

  /**
   * Returns true if the rectangles intersect
   * @param {Rectangle} r1 
   * @param {Rectangle} r2 
   */
  static rectangleIntersect(r1, r2) {
    const xDist = abs(r1.cx - r2.cx)
    const yDist = abs(r1.cy - r2.cy)
    return (xDist <= r1.hw + r2.hw) && (yDist <= r1.hh + r2.hh)
  }
  
  /**
   * Returns true if the rectangle and circle intersect
   * @param {Rectangle} r1 
   * @param {Circle} c1 
   */
  static rectangleCircleIntersect(r1, c1) {
    const xDist = Math.abs(r1.cx - c1.x)
    const yDist = Math.abs(r1.cy - c1.y)

    if (xDist > (c1.r + r1.hw) || yDist > (c1.r + r1.hh)) return false
    else if (xDist <= r1.hw || yDist <= r1.hh) return true
    else return Utils.dist(xDist, yDist, r1.hw, r1.hh) <= c1.r
  }
  
    /**
   * Returns true if the circles intersect
   * @param {Circle} c1
   * @param {Circle} c2 
   */
  static circleIntersect (c1, c2) {
    return Utils.dist(c1.x, c1.y, c2.x, c2.y) <= c1.r + c2.r
  }
}



