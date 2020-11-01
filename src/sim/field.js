class Field {
  constructor(x, y, w, h, nPoints, infectiousRate, vaccinationRate, qtreeCapacity, isQuarantine) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h

    this.isQuarantine = isQuarantine
    this.pts = []
    this.fill(nPoints, infectiousRate, vaccinationRate)
    this.qtreeCapacity = qtreeCapacity
    this.qtree = new Quadtree(new Rectangle(this.x, this.y, this.w, this.h), this.qtreeCapacity)
    this.repulsionZones = []
    this.stats = null
    // Internal query boundaries
    this.padding = 0.1
    this.north = new Rectangle(this.x, this.y, this.w, this.h*this.padding)
    this.south = new Rectangle(this.x, this.y+(this.h - this.h*this.padding), this.w, this.h*this.padding)
    this.east = new Rectangle(this.x+(this.w - this.w*this.padding), this.y, this.w*this.padding, this.h)
    this.west = new Rectangle(this.x, this.y, this.w*this.padding, this.h)
    this.central = new Rectangle(this.x+this.w*this.padding, this.y+this.h*this.padding, this.w*(1-this.padding), this.h*(1-this.padding))
  }

  /**
   * Fill this field with nPoints number of Points
   * @param {Integer} nPoints Number of points to generate
   * @param {Float} infectiousRate Chance a random point will start off with the INFECTIOUS1 status
   * @param {Float} vaccineRate Chance a random point will start off with the VACCINATED status, takes precedence over infectiousRate
   */
  fill(nPoints, infectiousRate, vaccineRate=0) {
    this.pts = []
    let nInfected = 0
    for(let i=0; i<nPoints; i++) {
      const rx = random(this.x, this.x+this.w)
      const ry = random(this.y, this.y+this.h)
      const rv = createVector(random(-Point.maxSpeed, Point.maxSpeed), random(-Point.maxSpeed, Point.maxSpeed))
      let st = Point.SUSCEPTIBLE
      // Guarantee at least 1 infected if infection rates is non-zero and vaccination rate is below 100%
      if (random()<infectiousRate || (i==nPoints-1 && vaccineRate<1 && infectiousRate>0 && nInfected==0)) {
        st = Point.INFECTIOUS1
        nInfected += 1
      } 
      // Override infection if randomed into into vaccination
      if (random()<vaccineRate && (i<nPoints-1)) {
        if (st == Point.INFECTIOUS1) nInfected -= 1
        st = Point.VACCINATED
      }
      const point = new Point(rx, ry, rv, st)
      this.insert(point)
    }
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
    this.repulsionZones.forEach(c => this._circleRepulsion(c))
    this.qtree.query(this.north).forEach(pt => { if(pt.y + pt.velocity.y <= this.y) pt.velocity.y = -pt.velocity.y })
    this.qtree.query(this.south).forEach(pt => { if(pt.y + pt.velocity.y >= this.y + this.h) pt.velocity.y = -pt.velocity.y })
    this.qtree.query(this.east).forEach(pt => { if(pt.x + pt.velocity.x >= this.x + this.w) pt.velocity.x = -pt.velocity.x })
    this.qtree.query(this.west).forEach(pt => { if(pt.x + pt.velocity.x <= this.x) pt.velocity.x = -pt.velocity.x })
    this.pts.forEach(pt => pt.move())
    if (this.isQuarantine) {
      let hospitalResourceUsed = 0
      this.pts.forEach(pt => {
        if (hospitalResourceUsed<Simulation.hospitalResources && pt.status == Point.INFECTIOUS2) {
          pt.beingTreated = true
          hospitalResourceUsed += 1
        } else {
          pt.beingTreated = false
        }
      })
    }
    this.pts.forEach(pt => pt.update(this.qtree))
  }

  /**
   * Add a Circle Boundary that automatically repulses nearby points
   * @param {Circle} circle 
   */
  addRepulsionZone(circle) {
    this.repulsionZones.push(circle)
  }

  /**
   * Repulse nearby points from the given Circle Boundary
   * @param {Circle} circle 
   */
  _circleRepulsion(circle) {
    const pts = this.qtree.query(circle).filter(pt => Utils.dist(pt.x, pt.y, circle.x, circle.y) <= circle.r + Point.radius)
    const pos = createVector(circle.x, circle.y)
    pts.forEach(pt => {
      const dist = p5.Vector.sub(createVector(pt.x, pt.y), pos)
      const mag = max(dist.mag(),1) // prevent mag from being 0
      dist.setMag(Point.maxSpeed*3/mag)
      pt.velocity.add(dist) // Think of this as a single instance of acceleration instead of continuous
    })
  }

  /**
   * Draw
   */
  draw(debug=false) {
    if(debug) this._drawWalls()
    if(debug) this._drawRepulsionZones()
    if(debug) this.qtree.draw()
    stroke(COLOR_LIGHT_GRAY)
    strokeWeight(2)
    noFill()
    rect(this.x, this.y, this.w, this.h)
    this.pts.forEach(pt => pt.draw())
  }

  /**
   * Draw walls
   */
  _drawWalls() {
    stroke(0,255,0)
    noFill()
    rect(this.north.x, this.north.y, this.north.w, this.north.h)
    rect(this.south.x, this.south.y, this.south.w, this.south.h)
    rect(this.east.x, this.east.y, this.east.w, this.east.h)
    rect(this.west.x, this.west.y, this.west.w, this.west.h)
  }

  /**
   * Draw repulsion zones
   */
  _drawRepulsionZones() {
    strokeWeight(2)
    stroke(0,255,0)
    noFill()
    this.repulsionZones.forEach(c => circle(c.x, c.y, c.r*2))
  }
}