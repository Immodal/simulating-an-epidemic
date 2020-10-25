let controlsDiv, controlsTextDiv, controlsInpDiv;
let socialDistancingSlider, socialDistancingLabel;
let ignoreSocialDistancingSlider, ignoreSocialDistancingLabel;
let infectionRadiusSlider, infectionRadiusLabel;
let infectionChanceSlider, infectionChanceLabel;

let sender, fields, simNum, simComplete, lastChartUpdate, infectionChart, RMax, RVal;
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

  initControls()
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
            const timeRemaining = Point.infectious2Interval + Point.infectious1Interval - timeInfectious
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
