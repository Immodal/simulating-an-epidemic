let sender, fields, simType;

let dayLength = 1000
let simComplete = 0
let lastChartUpdate = 0

function setup() {
  const canvas = createCanvas(600, 600)
  canvas.parent("#cv")
  Chart.defaults.global.defaultFontColor = "#DCDCDC"
  infectionChart = new Chart(document.getElementById('chartcv1').getContext('2d'), getNewChartData())

  setCentralLocSim()
}

function draw() {
  background(0)

  sender.auto()

  fields.forEach(f => f.update())
  sender.update()

  fields.forEach(f => f.draw())
  sender.draw()

  updateChart()
}

function setBasicSim() {
  senderInterval = 0
  simType = 0
  sender = new Sender()
  fields = []

  const field = new Field(50, 50, 500, 500, 500, 0.01)
  fields.push(field)

  resetChart()
}

function setCentralLocSim() {
  simType = 1
  fields = []

  const field = new Field(50, 50, 500, 500, 500, 0.01)
  field.addRepulsionZone(new Circle(field.x+field.w/2, field.y+field.h/2, 32))
  fields.push(field)

  const centralSize = 16
  const central = new Field(field.x+field.w/2-centralSize/2, field.y+field.h/2-centralSize/2, centralSize, centralSize, 0, 0, 50)
  fields.push(central)

  sender = new CentralLocSender(fields)
  resetChart()
}
