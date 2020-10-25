let sender, fields, simType, simComplete, lastChartUpdate;
let simpleBtn, centralLocBtn;
let globalUpdateCount = 0

let btns = []
let blockBtns = false

function setup() {
  frameRate(30)
  const canvas = createCanvas(CANVAS_W, CANVAS_H)
  canvas.parent("#cv")
  Chart.defaults.global.defaultFontColor = COLOR_LIGHT_GRAY
  infectionChart = new Chart(document.getElementById('chartcv1').getContext('2d'), getNewChartData())

  const btnW = width/6
  simpleBtn = new Button(2*BTN_W_SPACE, BTN_Y, BTN_W, BTN_H, "SIMPLE", setBasicSim)
  btns.push(simpleBtn)
  centralLocBtn = new Button(3*BTN_W_SPACE, BTN_Y, BTN_W, BTN_H, "CENTRAL LOCATION", setCentralLocSim)
  btns.push(centralLocBtn)

  setBasicSim()
}

function draw() {
  background(0)

  for(let i=0; i<SIM_SPEED_DEFAULT; i++) {
    globalUpdateCount += 1
    updateChart()
    sender.auto()
    fields.forEach(f => f.update())
    sender.update()
  }

  stroke(0)
  fill(COLOR_LIGHT_GRAY)
  textAlign(CENTER, CENTER)
  textSize(TEXT_SIZE)
  text("Choose a Simulation", width/2, TEXT_Y)
  btns.forEach(b => b.draw())
  fields.forEach(f => f.draw())
  sender.draw()

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
  globalUpdateCount=0
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
  globalUpdateCount=0
  simType = 1
  fields = []
  btns.forEach(b => b.state = false)

  const field = new Field(FIELD_MARGIN, FIELD_START_Y, width-2*FIELD_MARGIN, width-2*FIELD_MARGIN, 500, 0.01)
  field.addRepulsionZone(new Circle(field.x+field.w/2, field.y+field.h/2, 32))
  fields.push(field)

  const central = new Field(field.x+field.w/2-CENTRAL_LOC_SIZE/2, field.y+field.h/2-CENTRAL_LOC_SIZE/2, CENTRAL_LOC_SIZE, CENTRAL_LOC_SIZE, 0, 0, 50)
  fields.push(central)

  centralLocBtn.state = true
  sender = new CentralLocSender(fields)
  resetChart()
}
