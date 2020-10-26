
let sim, infectionChart, controls;

let globalUpdateCount = 0

let btns = []
let simpleBtn, centralLocBtn, commuBtn;

function setup() {
  frameRate(30)
  const canvas = createCanvas(CANVAS_W, CANVAS_H)
  canvas.parent("#cv")

  controls = new Controls()
  infectionChart = new InfectionChart(document.getElementById('chartcv1').getContext('2d'))

  simpleBtn = new Button(1*BTN_W_SPACE, BTN_Y, BTN_W, BTN_H, "SIMPLE",
    () => {
      if (!simpleBtn.state) {
        btns.forEach(b => b.state = false)
        sim = new SimBasic(controls, infectionChart)
        simpleBtn.state = true
      }
    })
  btns.push(simpleBtn)
  centralLocBtn = new Button(2*BTN_W_SPACE, BTN_Y, BTN_W, BTN_H, "CENTRAL LOCATION", 
    () => {
      if (!centralLocBtn.state) {
        btns.forEach(b => b.state = false)
        sim = new SimCentral(controls, infectionChart)
        centralLocBtn.state = true
      }
    })
  btns.push(centralLocBtn)
  commuBtn = new Button(3*BTN_W_SPACE, BTN_Y, BTN_W, BTN_H, "COMMUNITIES", 
    () => {
      if (!commuBtn.state) {
        btns.forEach(b => b.state = false)
        sim = new SimCommunities(controls, infectionChart)
        commuBtn.state = true
      }
    })
  btns.push(commuBtn)
  resetBtn = new Button(width-FIELD_MARGIN-70, BTN_Y+BTN_H+7, 70, 20, "RESET", 
    () => {
      sim.reset()
      resetBtn.state = true
    })

  sim = new SimBasic(controls, infectionChart)
  simpleBtn.state = true
}

function draw() {
  background(0)

  sim.update()

  stroke(0)
  fill(COLOR_LIGHT_GRAY)
  textAlign(CENTER, CENTER)
  textSize(TEXT_SIZE_CHOOSE_A_SIM)
  text("Choose a Simulation", width/2, TEXT_Y_CHOOSE_A_SIM)

  btns.forEach(b => b.draw())
  resetBtn.draw()

  sim.draw()
}

function mousePressed() {
  btns.forEach(b => { if (b.inBounds(mouseX, mouseY)) b.action() }) 
  if (resetBtn.inBounds(mouseX, mouseY)) resetBtn.action()
}

function mouseReleased() {
  resetBtn.state = false
}