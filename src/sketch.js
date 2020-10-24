let field;

let dayLength = 1000
let simComplete = 0
let lastChartUpdate = 0

function setup() {
  const canvas = createCanvas(600, 600)
  canvas.parent("#cv")
  field = new Field(0, 0, 600, 600, 500, 0.01)
  field.fill(500, 0.01)

  infectionChart = initChart()
  updateChart()
}

function draw() {
  field.update()
  field.draw()

  updateChart()
}

function updateChart() {
  const currentTime = millis()
  if (simComplete<3 && (lastChartUpdate==0 || currentTime - lastChartUpdate >= dayLength)) {
    field.updateStats()

    const days = infectionChart.data.labels
    const infectious1 = infectionChart.data.datasets[1].data
    const infectious2 = infectionChart.data.datasets[0].data
    const susceptible = infectionChart.data.datasets[2].data
    const removed = infectionChart.data.datasets[3].data

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

    infectionChart.update()
    lastChartUpdate = currentTime
  }
}

function initChart() {
  Chart.defaults.global.defaultFontColor = "#DCDCDC"
  return new Chart(
    document.getElementById('chartcv1').getContext('2d'), 
    {
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
            scaleLabel: {
              display: true,
              labelString: 'Population Count'
            }
          }],
          xAxes: [{
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
  )
}