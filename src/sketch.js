let sender, fields, simType;
let simpleBtn, centralLocBtn;

const CANVAS_W = 600
const CANVAS_H = 700
const TEXT_SIZE = 25
const TEXT_COLOR = "#DCDCDC"
const TEXT_Y = 10 + TEXT_SIZE/2
const BTN_Y = TEXT_Y + 25
const BTN_HORIZONTAL_SPACING = 2
const BTN_W_SPACE = CANVAS_W/6
const BTN_W = BTN_W_SPACE - 2*BTN_HORIZONTAL_SPACING
const BTN_H = 50
const FIELD_MARGIN = 10
const FIELD_START_Y = BTN_Y + BTN_H + FIELD_MARGIN

let btns = []
let blockBtns = false

let dayLength = 1000
const SIM_COMPLETE_THRESH = 3
let simComplete = 0
let lastChartUpdate = 0

function setup() {
  const canvas = createCanvas(CANVAS_W, CANVAS_H)
  canvas.parent("#cv")
  Chart.defaults.global.defaultFontColor = TEXT_COLOR
  infectionChart = new Chart(document.getElementById('chartcv1').getContext('2d'), getNewChartData())

  const btnW = width/6
  simpleBtn = new Button(2*BTN_W_SPACE, BTN_Y, BTN_W, 50, "SIMPLE", setBasicSim)
  btns.push(simpleBtn)
  centralLocBtn = new Button(3*BTN_W_SPACE, BTN_Y, BTN_W, 50, "CENTRAL LOCATION", setCentralLocSim)
  btns.push(centralLocBtn)

  setBasicSim()
}

function draw() {
  background(0)

  sender.auto()

  fields.forEach(f => f.update())
  sender.update()

  stroke(0)
  fill(TEXT_COLOR)
  textAlign(CENTER, CENTER)
  textSize(TEXT_SIZE)
  text("Choose a Simulation", width/2, TEXT_Y)
  btns.forEach(b => b.draw())
  fields.forEach(f => f.draw())
  sender.draw()

  updateChart()
}

function mousePressed() {
  btns.forEach(b => {
    if (!blockBtns && b.inBounds(mouseX, mouseY)) {
      b.action()
    }
  }) 
}

function mouseReleased() {
  blockBtns = false
}

function setBasicSim() {
  simType = 0
  fields = []
  btns.forEach(b => b.state = false)

  const field = new Field(FIELD_MARGIN, FIELD_START_Y, width-2*FIELD_MARGIN, width-2*FIELD_MARGIN, 500, 0.01)
  fields.push(field)

  simpleBtn.state = true
  sender = new Sender()
  resetChart()
}

function setCentralLocSim() {
  simType = 1
  fields = []
  btns.forEach(b => b.state = false)

  const field = new Field(FIELD_MARGIN, FIELD_START_Y, width-2*FIELD_MARGIN, width-2*FIELD_MARGIN, 500, 0.01)
  field.addRepulsionZone(new Circle(field.x+field.w/2, field.y+field.h/2, 32))
  fields.push(field)

  const centralSize = 16
  const central = new Field(field.x+field.w/2-centralSize/2, field.y+field.h/2-centralSize/2, centralSize, centralSize, 0, 0, 50)
  fields.push(central)

  centralLocBtn.state = true
  sender = new CentralLocSender(fields)
  resetChart()
}
