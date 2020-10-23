class Point {
  constructor(x, y, velocity, status=Point.SUSCEPTIBLE) {
    this.x = x
    this.y = y
    this.velocity = velocity
    this.status = status
    this.infectionCircle = new Circle(this.x, this.y, Point.infectionRadius)
    this.lastStatusUpdate = millis()
    this.lastInfection = millis()
    this.ignoreSocialDistancing = false
  }

  /**
   * Update movement information
   * @param {Quadtree} qtree 
   */
  move() {
    this.velocity.limit(Point.maxSpeed)
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.infectionCircle = new Circle(this.x, this.y, Point.infectionRadius)
  }

  /**
   * 
   * @param {Quadtree} qtree 
   */
  update(qtree) {
    // Get points that are within range
    const others = qtree.query(this.infectionCircle).filter(pt => Utils.dist(pt.x, pt.y, this.x, this.y) <= this.infectionCircle.r + Point.radius)
    // Repulse and infect
    const currentTime = millis()
    const runInfection = this.isInfectious() && currentTime - this.lastInfection >= Point.infectionInterval
    const pos = createVector(this.x, this.y)
    this.lastInfection = runInfection ? currentTime : this.lastInfection
    others.forEach(pt => {
      // Repulse
      if (!pt.ignoreSocialDistancing && Point.areSocialDistancing) {
        const dist = p5.Vector.sub(createVector(pt.x, pt.y), pos)
        const mag = max(dist.mag(),1) // prevent mag from being 0
        dist.setMag(Point.maxSpeed*Point.socialDistanceStrength/mag)
        pt.velocity.add(dist) // Think of this as a single instance of acceleration instead of continuous
      }
      // Infect
      if(runInfection && pt.status==0 && random() < Point.infectionRate) {
        pt.setStatus(Point.INFECTIOUS1)
      }
    })
    // Update status
    if(this.status == Point.INFECTIOUS1 && currentTime - this.lastStatusUpdate >= Point.infectious1Interval) {
      this.setStatus(Point.INFECTIOUS2)
    } else if(this.status == Point.INFECTIOUS2 && currentTime - this.lastStatusUpdate >= Point.infectious2Interval) {
      this.setStatus(Point.REMOVED)
    }
  }

  /**
   * Randomly rotate velocity within a given range
   */
  randomSteer() {
    this.velocity.rotate(random(-HALF_PI/8, HALF_PI/8))
  }

  /**
   * Set the current status of the Point
   * @param {Integer} status 
   */
  setStatus(status) {
    this.status = status
    this.lastStatusUpdate = millis()
    if (this.isInfectious()) this.lastInfection = millis()
  }

  /**
   * Returns true if this has an infectious status
   */
  isInfectious() {
    return this.status == Point.INFECTIOUS1 || this.status == Point.INFECTIOUS2
  }

  /**
   * Draw
   */
  draw() {
    let color = null
    if (this.status==Point.SUSCEPTIBLE) color = "#00FFFF"
    else if (this.status==Point.INFECTIOUS1) color ="#FFFF00"
    else if (this.status==Point.INFECTIOUS2) color = "#FF0000"
    else color = "#606060"
    strokeWeight(1)
    stroke(0)
    fill(color)
    circle(this.x, this.y, Point.radius*2)
    if (this.status==Point.INFECTIOUS1 || this.status==Point.INFECTIOUS2) {
      noFill()
      stroke(color)
      circle(this.infectionCircle.x, this.infectionCircle.y, this.infectionCircle.r*2)
    }
  }
}

Point.SUSCEPTIBLE = 0
Point.INFECTIOUS1 = 1 // Infectious, no symptoms
Point.INFECTIOUS2 = 2 // Infectious, with symptoms
Point.REMOVED = 3 // No longer susceptible, either recovered and immune or dead

Point.radius = 4
Point.maxSpeed = 0.6

Point.areSocialDistancing = true
Point.socialDistanceStrength = 10
Point.infectionRadius = 16
Point.infectionInterval = 3000
Point.infectionRate = 0.20
Point.infectious1Interval = 12000
Point.infectious2Interval = 15000