/**
 * Data structure for keeping track of which points are in a given area
 */
class Quadtree {

  /** */
  constructor(rectangle, capacity) {
    this.capacity = capacity
    this.boundary = rectangle
    this.pts = []
    this.divs = []
  }

  /**
   * Insert a point into the tree, if over capacity, subdivide and insert into child
   * Returns true if insertion was successful
   * @param {Object} pt Object containing an x and y position attribute
   */
  insert(pt) {
    if(!this.inBounds(pt)) return false

    if(this.divs.length==0 && this.pts.length<this.capacity) this.pts.push(pt)
    else {
      if (this.divs.length==0) this._subdivide()
      return this._insertIntoDivision(pt)
    }
  }

  /**
   * Check if the given point resides within the bounds of this tree
   * @param {Object} pt Object containing an x and y position attribute
   */
  inBounds(pt) {
    return this.boundary.contains(pt)
  }
  
  /**
   * Return the points for any division that intersects with boundary
   * @param {Boundary} boundary 
   */
  query(boundary) {
    if (!this.boundary.intersects(boundary)) return []
    else if (this.divs.length==0) return this.pts
    else return this.divs.map(div => div.query(boundary)).reduce((acc, pts) => acc.concat(pts))
  }

  /**
   * Count the number of points in this tree and its children
   */
  count() {
    if(this.divs.length==0) return this.pts.length
    else return this.divs.reduce((acc, d) => acc + d.count(), 0)
  }

  /**
   * Create 4 subdivisions and then redistribute points into them
   */
  _subdivide() {
    const x = this.boundary.x
    const y = this.boundary.y
    const hw = this.boundary.hw
    const hh = this.boundary.hh
    this.divs.push(new Quadtree(new Rectangle(x, y, hw, hh), this.capacity)) // NW
    this.divs.push(new Quadtree(new Rectangle(x+hw, y, hw, hh), this.capacity)) // NE
    this.divs.push(new Quadtree(new Rectangle(x, y+hh, hw, hh), this.capacity)) // SW
    this.divs.push(new Quadtree(new Rectangle(x+hw, y+hh, hw, hh), this.capacity)) // SE
    this.pts.forEach(pt => this._insertIntoDivision(pt))
    this.pts.length = 0
  }

  /**
   * Insert a point into child tree
   * @param {Object} pt Object containing an x and y position attribute
   */
  _insertIntoDivision(pt) {
    for (let i=0; i<this.divs.length; i++) {
      if (this.divs[i].inBounds(pt)) {
        this.divs[i].insert(pt)
        return true
      }
    }
    return false
  }

  /**
   * Draw
   */
  draw() {
    stroke(255)
    noFill()
    strokeWeight(1)
    rect(this.boundary.x, this.boundary.y, this.boundary.w, this.boundary.h)
    if(this.divs.length>0) this.divs.forEach(d => d.draw())
  }
}

// Extra code used for testing
QuadtreeTestCode = {
  drawTree: (qtree, other) => {
    stroke(255)
    noFill()
    strokeWeight(1)
    if(qtree.divs.length>0) {
      rect(qtree.boundary.x, qtree.boundary.y, qtree.boundary.w, qtree.boundary.h)
      qtree.divs.forEach(d => d.draw(other))
    } else {
      if(qtree.boundary.intersects(other)) stroke(255,0,0)
      rect(qtree.boundary.x, qtree.boundary.y, qtree.boundary.w, qtree.boundary.h)
      stroke(255)
      strokeWeight(4)
      qtree.pts.forEach(pt => point(pt.x, pt.y))
    }
  },

  drawLoop: () => {
    // needs
    //qtree = new Quadtree(new Rectangle(0, 0, width, height), 10)
    //let qtree;
    //let shape;
    //let justInserted = false

    background(0) 

    shape = new Circle(mouseX, mouseY, 100)
    stroke(0,255,0)
    strokeWeight(1)
    circle(shape.x, shape.y, shape.r*2)
  
    if(mouseIsPressed) {
      if (!justInserted) {
        qtree.insert(createVector(mouseX, mouseY))
        justInserted = true
      }
    } else justInserted = false
  
    QuadtreeTestCode.drawTree(qtree, shape)
  }
}