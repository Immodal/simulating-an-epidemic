class Field {
  constructor(x, y, w, h, qtreeCapacity=10) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.pts = []
    this.qtreeCapacity = qtreeCapacity
    this.qtree = new Quadtree(new Rectangle(this.x, this.y, this.w, this.h), this.qtreeCapacity)
    // Internal query boundaries
    this.padding = 0.1
    // Adjusting the boundaries so that their centers along the long axis are on top of the field border
    const flatW = this.w
    const flatH = this.h * this.padding
    const tallW = this.w * this.padding
    const tallH = this.h
    this.north = new Rectangle(this.x, this.y-flatH/2, flatW, flatH)
    this.south = new Rectangle(this.x, this.y+(this.h-flatH/2), flatW, flatH)
    this.east = new Rectangle(this.x+(this.w-tallW/2), this.y, tallW, tallH)
    this.west = new Rectangle(this.x-tallW/2, this.y, tallW, tallH)
    this.innerPadding = this.padding / 2
    this.central = new Rectangle(this.x+this.w*this.innerPadding*1.5, this.y+this.h*this.innerPadding, this.w*(1-this.innerPadding), this.h*(1-this.innerPadding))
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
    this.wallRepulsion(this.north, this.qtree, "y")
    this.wallRepulsion(this.south, this.qtree, "y")
    this.wallRepulsion(this.east, this.qtree, "x")
    this.wallRepulsion(this.west, this.qtree, "x")
    /*this.qtree.query(this.north).forEach(pt => { if(pt.y + pt.velocity.y <= this.y) pt.velocity.y = -pt.velocity.y })
    this.qtree.query(this.south).forEach(pt => { if(pt.y + pt.velocity.y >= this.y + this.h) pt.velocity.y = -pt.velocity.y })
    this.qtree.query(this.east).forEach(pt => { if(pt.x + pt.velocity.x >= this.x + this.w) pt.velocity.x = -pt.velocity.x })
    this.qtree.query(this.west).forEach(pt => { if(pt.x + pt.velocity.x <= this.x) pt.velocity.x = -pt.velocity.x })*/
    this.pts.forEach(pt => pt.move())
    this.pts.forEach(pt => pt.update(this.qtree))
  }

  wallRepulsion(wall, qtree, shortAxis="x") {
    const rawPts = qtree.query(wall)
    let pts = null
    if (shortAxis=="y") {
      pts = rawPts.filter(pt => Utils.dist(pt.x, pt.y, pt.x, wall.cy) <= this.h*this.innerPadding + Point.radius)
    } else {
      pts = rawPts.filter(pt => Utils.dist(pt.x, pt.y, wall.cx, pt.y) <= this.w*this.innerPadding + Point.radius)
    }
    
    pts.forEach(pt => {
      let pos = null
      if (shortAxis=="y") pos = createVector(pt.x, wall.cy)
      else pos = createVector(wall.cx, pt.y)
      const dist = p5.Vector.sub(createVector(pt.x, pt.y), pos)
      const mag = max(dist.mag(),1) // prevent mag from being 0
      dist.setMag(Point.maxSpeed*2/(mag*mag))
      pt.velocity.add(dist) // Think of this as a single instance of acceleration instead of continuous
    })
  }

  /**
   * Draw
   */
  draw() {
    background(0)
    if (false) _drawWalls()
    this.qtree.draw()
    this.pts.forEach(pt => pt.draw())
  }

  _drawWalls() {
    stroke(0,255,0)
    noFill()
    rect(this.north.x, this.north.y, this.north.w, this.north.h)
    rect(this.south.x, this.south.y, this.south.w, this.south.h)
    rect(this.east.x, this.east.y, this.east.w, this.east.h)
    rect(this.west.x, this.west.y, this.west.w, this.west.h)
  }
}