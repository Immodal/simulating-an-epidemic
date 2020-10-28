class Simulation {
  constructor(controls, chart, fullReset=false) {
    this.controls = controls
    this.chart = chart
    this.id = null
  
    this.reset(fullReset)
  }

  /**
   * Reset the simulation
   */
  reset(full=false) {
    globalUpdateCount = 0
    this.lastRUpdate = 0
    this.rMax = 0
    this.rVal = 0
    this.fields = []

    // Unique for each simulation
    this._reset()

    this.updateR()
    this.controls.updateCallbacks(this)
    if(full) this.controls.reset(this.id)
    this.chart.reset()
  }

  /**
   * Override this for each unique sim
   */
  _reset() {}

  /**
   * Move simulation forward timesteps dictated by simulation speed
   */
  update() {
    for(let i=0; i<Simulation.speed; i++) {
      globalUpdateCount += 1
      this.fields.forEach(f => f.update())
      this.sender.auto()
      this.sender.update()
      this.updateR()
      this.chart.update(this.fields, this.sender)
    }
  }

  /**
   * Draw
   */
  draw() {
    stroke(255)
    fill(255)
    textAlign(LEFT, CENTER)
    textSize(TEXT_SIZE_R)
    text(`R: ${this.rVal.toFixed(4)}`, TEXT_X_R, TEXT_Y_R)
    text(`Rmax: ${this.rMax.toFixed(4)}`, TEXT_X_R_MAX, TEXT_Y_R)
    text(`Quarantined: ${this.sender.nQuarantined}`, TEXT_X_QUARANTINED, TEXT_Y_R)
    
    this.fields.forEach(f => f.draw())
    this.sender.draw()
  }

  /**
   * Update internal R value
   */
  updateR() {
    if (this.lastRUpdate==0 || globalUpdateCount - this.lastRUpdate >= DAY_LENGTH) {
      let pts = this.fields.map(f => f.pts).reduce((acc, pts) => acc.concat(pts), [])
      pts.push(...this.sender.objs.map(o => o.point))
    
      let nInfectious = 0
      const val = pts
        .map(pt => {
          if (pt.isInfectious()) {
            nInfectious += 1
            const timeInfectious = globalUpdateCount - pt.lastStatusUpdate + (pt.status == Point.INFECTIOUS2) ? Point.infectious1Interval : 0
            if (timeInfectious>0) {
              const timeRemaining = Point.infectious2Interval + Point.infectious1Interval - timeInfectious
              return pt.nInfected/timeInfectious*timeRemaining // estimated infections over duration of illness
            } else return 0
          } else return 0
        })
        .reduce((sum, ei) => sum + ei)
    
      if (nInfectious>0) {
        this.rVal = val/nInfectious
        this.rMax = this.rMax < this.rVal ? this.rVal : this.rMax
      } else this.rVal = 0
      this.lastRUpdate = globalUpdateCount
    }
  }
}

Simulation.speed = SIM_SPEED_DEFAULT
Simulation.hospitalResources = HOSPITAL_RESOURCES_DEFAULT