
let sim, infectionChart, controls, resetBtn;
let globalUpdateCount = 0

function setup() {
  frameRate(30)
  const canvas = createCanvas(CANVAS_W, CANVAS_H)
  canvas.parent("#cv")

  controls = new Controls(
    () => sim = new SimBasic(controls, infectionChart, !controls.dontOverrideSettingsCb.checked()),
    () => sim = new SimCentral(controls, infectionChart, !controls.dontOverrideSettingsCb.checked()),
    () => sim = new SimCommunities(controls, infectionChart, !controls.dontOverrideSettingsCb.checked())
  )
  infectionChart = new InfectionChart(document.getElementById('chartcv1').getContext('2d'))
  resetBtn = new Button(FIELD_MARGIN, 0, RESET_BTN_W, RESET_BTN_H, "RESET", 
    () => {
      sim.reset()
      resetBtn.state = true
    })

  controls.simBtnCallback(()=>sim = new SimBasic(controls, infectionChart, true), controls.simBasicBtn, controls.simBtns)()
}

function draw() {
  background(0)

  sim.update()

  resetBtn.draw()

  sim.draw()
}

function mousePressed() {
  if (resetBtn.inBounds(mouseX, mouseY)) resetBtn.action()
}

function mouseReleased() {
  resetBtn.state = false
}