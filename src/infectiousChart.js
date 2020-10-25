class InfectionChart {
  constructor(canvas) {
    Chart.defaults.global.defaultFontColor = COLOR_LIGHT_GRAY
    this.chart = new Chart(canvas, this.getFreshConfig())
    this.lastUpdate = 0
    this.simComplete = 0
  }

  /**
   * Update the chart with data from the simulation
   */
  update(fs, sndr) {
    if (this.simComplete<SIM_COMPLETE_THRESH && (this.lastUpdate==0 || globalUpdateCount - this.lastUpdate >= DAY_LENGTH)) {
      // Tally population status
      let stats = []
      fs.forEach(f => stats.push(this.getStats(f.pts)))
      stats.push(this.getStats(sndr.objs.map(o => o.point)))

      let nSusceptible = 0
      let nInfectious1 = 0
      let nInfectious2 = 0
      let nRemoved = 0
      stats.forEach(s => {
        nSusceptible += s.nSusceptible
        nInfectious1 += s.nInfectious1
        nInfectious2 += s.nInfectious2
        nRemoved += s.nRemoved
      })

      // Add to Chart data object
      const days = this.chart.data.labels
      const infectious1 = this.chart.data.datasets[1].data
      const infectious2 = this.chart.data.datasets[0].data
      const susceptible = this.chart.data.datasets[2].data
      const removed = this.chart.data.datasets[3].data

      if (infectious1.length>=10) days.push(days[days.length-1]+1)
      let acc = nInfectious2
      infectious2.push(acc)

      acc += nInfectious1
      this.simComplete += acc == 0 ? 1 : 0
      infectious1.push(acc)

      acc += nSusceptible
      susceptible.push(acc)

      acc += nRemoved
      removed.push(acc)

      this.chart.update()
      this.lastUpdate = globalUpdateCount
    }
  }

  /**
   * Reset the chart and all tracking variables
   */
  reset() {
    this.simComplete = 0
    this.lastUpdate = globalUpdateCount
    this.chart.config = this.getFreshConfig()
    this.chart.update()
  }

  /**
   * Get stats for a given array of Points
   * @param {Array} pts
   */
  getStats(pts) {
    const stats = {
      nSusceptible: 0,
      nInfectious1: 0, nInfectious2: 0,
      nRemoved: 0,
    }
    stats.nSusceptible = 0
    stats.nInfectious1 = 0
    stats.nInfectious2 = 0
    stats.nRemoved = 0
    pts.forEach(pt => {
      if (pt.status==Point.SUSCEPTIBLE) stats.nSusceptible += 1
      else if (pt.status==Point.INFECTIOUS1) stats.nInfectious1 += 1
      else if (pt.status==Point.INFECTIOUS2) stats.nInfectious2 += 1
      else if (pt.status==Point.REMOVED) stats.nRemoved += 1
    })
    return stats
  }

  /**
   * Get a fresh instance of the config object
   */
  getFreshConfig() {
    return {
      type: 'line',
      data: {
        labels: Utils.range(10),
        datasets:[
          {
            label: "Infectious with Symptoms",
            data: [],
            borderColor: Point.COLOR_INFECTIOUS2,
            backgroundColor: Point.COLOR_INFECTIOUS2
          },{
            label: "Infectious, No Symptoms",
            data: [],
            borderColor: Point.COLOR_INFECTIOUS1,
            backgroundColor: Point.COLOR_INFECTIOUS1
          },
          {
            label: "Susceptible",
            data: [],
            borderColor: Point.COLOR_SUSCEPTIBLE,
            backgroundColor: Point.COLOR_SUSCEPTIBLE
          },{
            label: "Removed",
            data: [],
            borderColor: Point.COLOR_REMOVED,
            backgroundColor: Point.COLOR_REMOVED
          },
        ],
      },
      options: {
        responsive: false,
        title: {
          display: true,
          text: 'Population Status'
        },
        scales: {
          yAxes: [{
            gridLines: { color: "#555555" },
            scaleLabel: {
              display: true,
              labelString: 'Population Count'
            }
          }],
          xAxes: [{
            gridLines: { color: "#555555" },
            scaleLabel: {
              display: true,
              labelString: 'Day'
            }
          }]
        },
        elements: {
          line:{
            borderWidth: 0 // Hide lines, only use area
          },
          point:{
            radius: 0 // Hide point dots
          }
        }
      }
    }
  }
}