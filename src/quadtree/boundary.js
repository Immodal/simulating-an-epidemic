class Boundary {
  constructor(x,y) {
    this.x = x
    this.y = y
  }

  static dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2))
  }

  static rectangleIntersect(r1, r2) {
    const xDist = abs(r1.cx - r2.cx)
    const yDist = abs(r1.cy - r2.cy)
    return (xDist <= r1.hw + r2.hw) && (yDist <= r1.hh + r2.hh)
  }
  
  static rectangleCircleIntersect(r1, c1) {
    const xDist = Math.abs(r1.cx - c1.x)
    const yDist = Math.abs(r1.cy - c1.y)

    if (xDist > (c1.r + r1.hw) || yDist > (c1.r + r1.hh)) return false
    else if (xDist <= r1.hw || yDist <= r1.hh) return true
    else return Boundary.dist(xDist, yDist, r1.hw, r1.hh) <= c1.r
  }
  
  static circleIntersect (c1, c2) {
    return Boundary.dist(c1.x, c1.y, c2.x, c2.y) <= c1.r + c2.r
  }
}



