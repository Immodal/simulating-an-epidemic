
let sim, infectionChart, controls;

let globalUpdateCount = 0

let btns = []
let simpleBtn, centralLocBtn, commuBtn;
let blockBtns = false

function setup() {
  frameRate(30)
  const canvas = createCanvas(CANVAS_W, CANVAS_H)
  canvas.parent("#cv")

  controls = new Controls()
  infectionChart = new InfectionChart(document.getElementById('chartcv1').getContext('2d'))

  simpleBtn = new Button(1*BTN_W_SPACE, BTN_Y, BTN_W, BTN_H, "SIMPLE", () => sim = new SimBasic(controls, infectionChart))
  btns.push(simpleBtn)
  centralLocBtn = new Button(2*BTN_W_SPACE, BTN_Y, BTN_W, BTN_H, "CENTRAL LOCATION", () => sim = new SimCentral(controls, infectionChart))
  btns.push(centralLocBtn)
  commuBtn = new Button(3*BTN_W_SPACE, BTN_Y, BTN_W, BTN_H, "COMMUNITIES", () => sim = new SimCommunities(controls, infectionChart))
  btns.push(commuBtn)

  sim = new SimBasic(controls, infectionChart)
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

  sim.draw()
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