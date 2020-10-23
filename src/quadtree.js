class Quadtree {

  /**
   * @param {Float} x 
   * @param {Float} y 
   * @param {Float} w 
   * @param {Float} h 
   */
  constructor(x,y,w,h, capacity) {
    this.capacity = capacity
    this.x = x
    this.y = y
    this.w = w
    this.h = h
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
    return pt.x >= this.x && pt.x < this.x+this.w && pt.y >= this.y && pt.y < this.y+this.h
  }

  /**
   * Draw
   */
  draw() {
    stroke(255)
    strokeWeight(1)
    noFill()
    rect(this.x, this.y, this.w, this.h)
    if(this.divs.length>0) this.divs.forEach(d => d.draw())
    else {
      strokeWeight(4)
      this.pts.forEach(pt => point(pt.x, pt.y))
    }
  }

  /**
   * Create 4 subdivisions and then redistribute points into them
   */
  _subdivide() {
    this.divs.push(new Quadtree(this.x, this.y, this.w/2, this.h/2, this.capacity)) // NW
    this.divs.push(new Quadtree(this.x+this.w/2, this.y, this.w/2, this.h/2, this.capacity)) // NE
    this.divs.push(new Quadtree(this.x, this.y+this.h/2, this.w/2, this.h/2, this.capacity)) // SW
    this.divs.push(new Quadtree(this.x+this.w/2, this.y+this.h/2, this.w/2, this.h/2, this.capacity)) // SE
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
}
