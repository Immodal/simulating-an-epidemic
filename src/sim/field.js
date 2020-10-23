class Field {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.pts = []
    this.qtreeCapacity = 10
    this.qtree = new Quadtree(new Rectangle(this.x, this.y, this.w, this.h), this.qtreeCapacity)
    // Internal query boundaries
    this.padding = 0.1
    this.north = new Rectangle(this.x, this.y, this.w, this.h*this.padding)
    this.south = new Rectangle(this.x, this.y+(this.h - this.h*this.padding), this.w, this.h*this.padding)
    this.east = new Rectangle(this.x+(this.w - this.w*this.padding), this.y, this.w*this.padding, this.h)
    this.west = new Rectangle(this.x, this.y, this.w*this.padding, this.h)
    this.central = new Rectangle(this.x+this.w*this.padding, this.y+this.h*this.padding, this.w*(1-this.padding), this.h*(1-this.padding))
  }

  /**
   * Add a point to this Field
   * @param {Point} pt 
   */
  insert(pt) {
    this.pts.push(pt)
  }

  /**
   * Update all info for this time step
   */
  update() {
    this.qtree = new Quadtree(new Rectangle(this.x, this.y, this.w, this.h), this.qtreeCapacity)
    this.pts.forEach(pt => this.qtree.insert(pt))
    this.qtree.query(this.central).forEach(pt => { if(random()<0.5) pt.randomSteer() })
    this.qtree.query(this.north).forEach(pt => { if(pt.y + pt.velocity.y <= this.y) pt.velocity.y = -pt.velocity.y })
    this.qtree.query(this.south).forEach(pt => { if(pt.y + pt.velocity.y >= this.y + this.h) pt.velocity.y = -pt.velocity.y })
    this.qtree.query(this.east).forEach(pt => { if(pt.x + pt.velocity.x >= this.x + this.w) pt.velocity.x = -pt.velocity.x })
    this.qtree.query(this.west).forEach(pt => { if(pt.x + pt.velocity.x <= this.x) pt.velocity.x = -pt.velocity.x })
    this.pts.forEach(pt => pt.move())
    this.pts.forEach(pt => pt.update(this.qtree))
  }

  /**
   * Draw
   */
  draw() {
    background(0)
    //this.qtree.draw()
    this.pts.forEach(pt => pt.draw())
  }
}