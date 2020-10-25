let sender, fields, simType, simComplete, lastChartUpdate;
let simpleBtn, centralLocBtn, commuBtn;
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
  simpleBtn = new Button(1*BTN_W_SPACE, BTN_Y, BTN_W, BTN_H, "SIMPLE", setBasicSim)
  btns.push(simpleBtn)
  centralLocBtn = new Button(2*BTN_W_SPACE, BTN_Y, BTN_W, BTN_H, "CENTRAL LOCATION", setCentralLocSim)
  btns.push(centralLocBtn)
  commuBtn = new Button(3*BTN_W_SPACE, BTN_Y, BTN_W, BTN_H, "COMMUNITIES", setCommunitiesSim)
  btns.push(commuBtn)

  setCommunitiesSim()
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

  Point.radius = POINT_RADIUS_DEFAULT
  Point.infectionRadius = INFECTION_RADIUS_DEFAULT

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

  Point.radius = CENTRAL_LOC_POINT_RADIUS
  Point.infectionRadius = CENTRAL_LOC_INFECTION_RADIUS

  const field = new Field(FIELD_MARGIN, FIELD_START_Y, width-2*FIELD_MARGIN, width-2*FIELD_MARGIN, 500, 0.01)
  field.addRepulsionZone(new Circle(field.x+field.w/2, field.y+field.h/2, 32))
  fields.push(field)

  const central = new Field(field.x+field.w/2-CENTRAL_LOC_SIZE/2, field.y+field.h/2-CENTRAL_LOC_SIZE/2, CENTRAL_LOC_SIZE, CENTRAL_LOC_SIZE, 0, 0, 50)
  fields.push(central)

  centralLocBtn.state = true
  sender = new CentralLocSender(fields)
  resetChart()
}

function setCommunitiesSim() {
  globalUpdateCount=0
  simType = 2
  fields = []
  btns.forEach(b => b.state = false)

  Point.radius = COMMUNITIES_POINT_RADIUS
  Point.infectionRadius = COMMUNITIES_INFECTION_RADIUS

  let fy = FIELD_START_Y
  const fieldSpace = width-2*FIELD_MARGIN
  const fieldSubmargin = 10
  const fieldW = (fieldSpace-fieldSubmargin*4)/4
  let fx0 = FIELD_MARGIN
  let fx1 = fx0 + fieldW + fieldSubmargin
  let fx2 = fx1 + fieldW + fieldSubmargin
  let fx3 = fx2 + fieldW + fieldSubmargin

  for(let i=0; i<4; i++) {
    fy += i>0 ? (fieldW + fieldSubmargin) : 0
    const field0 = new Field(fx0, fy, fieldW, fieldW, 50, 0.01)
    fields.push(field0)
    const field1 = new Field(fx1, fy, fieldW, fieldW, 50, 0.01)
    fields.push(field1)
    const field2 = new Field(fx2, fy, fieldW, fieldW, 50, 0.01)
    fields.push(field2)
    const field3 = new Field(fx3, fy, fieldW, fieldW, 50, 0.01)
    fields.push(field3)
  }

  commuBtn.state = true
  sender = new CommunitiesSender(fields)
  resetChart()
}