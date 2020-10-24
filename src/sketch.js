let fields = []
let simType = 0

let dayLength = 1000
let simComplete = 0
let lastChartUpdate = 0

function setup() {
  const canvas = createCanvas(600, 600)
  canvas.parent("#cv")
  Chart.defaults.global.defaultFontColor = "#DCDCDC"
  infectionChart = new Chart(document.getElementById('chartcv1').getContext('2d'), getNewChartData())

  setBasicSim()
}

function draw() {
  fields.forEach(f => f.update())
  fields.forEach(f => f.draw())

  updateChart()
}

function setBasicSim() {
  simType = 0
  const field = new Field(0, 0, 600, 600, 500, 0.01)
  field.fill(500, 0.01)
  fields.push(field)

  resetChart()
}

function setCentralLocSim() {
  simType = 1
  const field = new Field(0, 0, 600, 600, 500, 0.01)
  field.fill(500, 0.01)
  field.addRepulsionZone(new Circle(field.x+field.w/2, field.y+field.h/2, 32))
  fields.push(field)

  const centralSize = 32
  const central = new Field(field.x+field.w/2-centralSize, field.y+field.h/2-centralSize, centralSize, centralSize, 0, 0, 50)
  fields.push(central)

  resetChart()
}

/**
 * Update the chart with data from the simulation
 */
function updateChart() {
  const currentTime = millis()
  if (simComplete<3 && (lastChartUpdate==0 || currentTime - lastChartUpdate >= dayLength)) {
    fields.forEach(f => f.updateStats())

    const days = infectionChart.data.labels
    const infectious1 = infectionChart.data.datasets[1].data
    const infectious2 = infectionChart.data.datasets[0].data
    const susceptible = infectionChart.data.datasets[2].data
    const removed = infectionChart.data.datasets[3].data

    if(simType==0) {
      const field = fields[0]
      days.push(days.length==0 ? 0 : days[days.length-1]+1)
      let acc = field.stats.nInfectious2[field.stats.nInfectious2.length-1]
      infectious2.push(acc)
      acc += field.stats.nInfectious1[field.stats.nInfectious1.length-1]
      simComplete += acc == 0 ? 1 : 0
      infectious1.push(acc)
      acc += field.stats.nSusceptible[field.stats.nSusceptible.length-1]
      susceptible.push(acc)
      acc += field.stats.nRemoved[field.stats.nRemoved.length-1]
      removed.push(acc)
    }

    infectionChart.update()
    lastChartUpdate = currentTime
  }
}

/**
 * Reset the chart and all tracking variables
 */
function resetChart() {
  simComplete = 0
  lastChartUpdate = 0
  infectionChart.config = getNewChartData()
  updateChart()
}

/**
 * Get a fresh instance of empty chart data
 */
function getNewChartData() {
  return {
    type: 'line',
    data: {
      labels: [],
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