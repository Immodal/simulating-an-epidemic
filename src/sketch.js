let sender, fields, simComplete, lastChartUpdate, infectionChart, RMax, RVal;
let simpleBtn, centralLocBtn, commuBtn;

let globalUpdateCount = 0
let lastRUpdate = 0

let btns = []
let blockBtns = false

function setup() {
  frameRate(30)
  const canvas = createCanvas(CANVAS_W, CANVAS_H)
  canvas.parent("#cv")
  Chart.defaults.global.defaultFontColor = COLOR_LIGHT_GRAY
  infectionChart = new Chart(document.getElementById('chartcv1').getContext('2d'), getNewChartData())

  simpleBtn = new Button(1*BTN_W_SPACE, BTN_Y, BTN_W, BTN_H, "SIMPLE", startSim(setBasicSim))
  btns.push(simpleBtn)
  centralLocBtn = new Button(2*BTN_W_SPACE, BTN_Y, BTN_W, BTN_H, "CENTRAL LOCATION", startSim(setCentralLocSim))
  btns.push(centralLocBtn)
  commuBtn = new Button(3*BTN_W_SPACE, BTN_Y, BTN_W, BTN_H, "COMMUNITIES", startSim(setCommunitiesSim))
  btns.push(commuBtn)

  startSim(setCommunitiesSim)()
}

function draw() {
  background(0)

  for(let i=0; i<SIM_SPEED_DEFAULT; i++) {
    globalUpdateCount += 1
    updateR()
    updateChart()
    fields.forEach(f => f.update())
    sender.auto()
    sender.update()
  }

  stroke(0)
  fill(COLOR_LIGHT_GRAY)
  textAlign(CENTER, CENTER)
  textSize(TEXT_SIZE_CHOOSE_A_SIM)
  text("Choose a Simulation", width/2, TEXT_Y_CHOOSE_A_SIM)

  textSize(TEXT_SIZE_R)
  text(`R: ${RVal.toFixed(4)}`, 2*width/5, TEXT_Y_R)
  text(`Rmax: ${RMax.toFixed(4)}`, 3*width/5, TEXT_Y_R)

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

function updateR() {
  if (lastRUpdate==0 || globalUpdateCount - lastRUpdate >= DAY_LENGTH) {
    let pts = fields.map(f => f.pts).reduce((acc, pts) => acc.concat(pts), [])
    pts.push(...sender.objs.map(o => o.point))
  
    let nInfectious = 0
    const val = pts
      .map(pt => {
        if (pt.isInfectious()) {
          nInfectious += 1
          const timeInfectious = globalUpdateCount - pt.lastStatusUpdate + (pt.status == Point.INFECTIOUS2) ? Point.infectious1Interval : 0
          if (timeInfectious>0) {
            //console.log("start")
            //console.log(timeInfectious)
            const timeRemaining = Point.infectious2Interval + Point.infectious1Interval - timeInfectious
            //console.log(timeRemaining)
            //console.log(pt.nInfected)
            return pt.nInfected/timeInfectious*timeRemaining // estimated infections over duration of illness
          } else return 0
        } else return 0
      })
      .reduce((sum, ei) => sum + ei)
  
    if (nInfectious>0) {
      RVal = val/nInfectious
      RMax = RMax < RVal ? RVal : RMax
    } else RVal = 0
    lastRUpdate = globalUpdateCount
  }
}

function startSim(callback) {
  return () => {
    globalUpdateCount=0
    lastRUpdate=0
    RMax = 0
    fields = []
    btns.forEach(b => b.state = false)
  
    callback()
  
    updateR()
    resetChart()
  }
}

function setBasicSim() {
  Point.radius = POINT_RADIUS_DEFAULT
  Point.infectionRadius = INFECTION_RADIUS_DEFAULT

  const field = new Field(FIELD_MARGIN, FIELD_START_Y, width-2*FIELD_MARGIN, width-2*FIELD_MARGIN, 500, 0.01)
  fields.push(field)

  sender = new Sender()
  simpleBtn.state = true
}

function setCentralLocSim() {
  Point.radius = CENTRAL_LOC_POINT_RADIUS
  Point.infectionRadius = CENTRAL_LOC_INFECTION_RADIUS

  const field = new Field(FIELD_MARGIN, FIELD_START_Y, width-2*FIELD_MARGIN, width-2*FIELD_MARGIN, 500, 0.01)
  field.addRepulsionZone(new Circle(field.x+field.w/2, field.y+field.h/2, 32))
  fields.push(field)

  const central = new Field(field.x+field.w/2-CENTRAL_LOC_SIZE/2, field.y+field.h/2-CENTRAL_LOC_SIZE/2, CENTRAL_LOC_SIZE, CENTRAL_LOC_SIZE, 0, 0, 50)
  fields.push(central)

  sender = new CentralLocSender(fields)
  centralLocBtn.state = true
}

function setCommunitiesSim() {
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

  sender = new CommunitiesSender(fields)
  commuBtn.state = true
}