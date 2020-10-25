/**
 * Update the chart with data from the simulation
 */
function updateChart() {
  if (simComplete<SIM_COMPLETE_THRESH && (lastChartUpdate==0 || globalUpdateCount - lastChartUpdate >= DAY_LENGTH)) {
    // Tally population status
    stats = []
    fields.forEach(f => stats.push(getStats(f.pts)))
    stats.push(getStats(sender.objs.map(o => o.point)))

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
    const days = infectionChart.data.labels
    const infectious1 = infectionChart.data.datasets[1].data
    const infectious2 = infectionChart.data.datasets[0].data
    const susceptible = infectionChart.data.datasets[2].data
    const removed = infectionChart.data.datasets[3].data

    if (infectious1.length>=10) days.push(days[days.length-1]+1)
    let acc = nInfectious2
    infectious2.push(acc)

    acc += nInfectious1
    simComplete += acc == 0 ? 1 : 0
    infectious1.push(acc)

    acc += nSusceptible
    susceptible.push(acc)

    acc += nRemoved
    removed.push(acc)

    infectionChart.update()
    lastChartUpdate = globalUpdateCount
  }
}

/**
 * Get stats for a given array of Points
 * @param {Array} pts
 */
function getStats(pts) {
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
 * Reset the chart and all tracking variables
 */
function resetChart() {
  simComplete = 0
  lastChartUpdate = globalUpdateCount
  infectionChart.config = getNewChartData()
  infectionChart.update()
}

/**
 * Get a fresh instance of empty chart data
 */
function getNewChartData() {
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