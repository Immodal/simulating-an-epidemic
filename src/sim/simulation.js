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
    else this.controls.syncSimWithSettings()
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
    if (this.chart.simComplete>=SIM_COMPLETE_THRESH) this.showTotals()
  }

  /**
   * 
   */
  showTotals() {
    //const infectious2 = this.chart.chart.data.datasets[0].data
    const infectious1 = this.chart.chart.data.datasets[1].data
    const infectious1Val = infectious1[infectious1.length-1]

    const susceptible = this.chart.chart.data.datasets[2].data
    const susceptibleVal = susceptible[susceptible.length-1]
    const nSusceptible = susceptibleVal-infectious1Val

    const removed = this.chart.chart.data.datasets[3].data
    const removedVal = removed[removed.length-1]
    const nRemoved = removedVal-susceptibleVal

    const dead = this.chart.chart.data.datasets[4].data
    const deadVal = dead[dead.length-1]
    const nDead = deadVal-removedVal

    let hospitalDeaths = 0
    this.sender.q1.pts.forEach(pt => hospitalDeaths += pt.status==Point.DEAD ? 1 : 0)

    const yDiff = TEXT_SIZE_TOTALS+15

    strokeWeight(0)
    stroke(0)
    fill("#000000dd")
    rect(RECT_X_TOTALS, RECT_Y_TOTALS, RECT_W_TOTALS, RECT_H_TOTALS, RECT_RADIUS_TOTALS)
    textSize(TEXT_SIZE_TOTALS)
    textAlign(LEFT, TOP)
    fill(COLOR_LIGHT_GRAY)
    text(`Simulation Complete!`, TEXT_X_TOTALS+80, TEXT_Y_TOTALS)
    text(`Total Unaffected: ${nSusceptible}`, TEXT_X_TOTALS, TEXT_Y_TOTALS+yDiff)
    text(`Total Infected: ${dead[dead.length-1]-nSusceptible}`, TEXT_X_TOTALS, TEXT_Y_TOTALS+yDiff*2)
    text(`Total Recovered: ${nRemoved}`, TEXT_X_TOTALS, TEXT_Y_TOTALS+yDiff*3)
    text(`Total Dead: ${nDead}`, TEXT_X_TOTALS, TEXT_Y_TOTALS+yDiff*4)
    text(`Deaths due hospital overcrowding: ${hospitalDeaths}`, TEXT_X_TOTALS, TEXT_Y_TOTALS+yDiff*5)
    this.drawResetArrow()
  }

  /**
   * Arrow that points at the reset button
   */
  drawResetArrow() {
    stroke(COLOR_DIM_YELLOW)
    fill(COLOR_DIM_YELLOW)
    strokeWeight(3)
    line((RESET_BTN_W)/2+FIELD_MARGIN, RESET_BTN_H, TEXT_X_TOTALS, TEXT_Y_TOTALS)
    triangle((RESET_BTN_W)/2+FIELD_MARGIN, RESET_BTN_H, 50, 40, 60, 35)
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