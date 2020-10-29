
let sim, infectionChart, controls, resetBtn;
let globalUpdateCount = 0

/**
 * Setup
 */
function setup() {
  frameRate(30)
  const canvas = createCanvas(CANVAS_W, CANVAS_H)
  canvas.parent("#cv")

  controls = new Controls(
    newBasicSim, newCentralSim, newCommunitySim,
    makePresetCallback(() => controls.infRadSlider.value(PRESET_LESS_INTERACTION_INF_RAD)),
    makePresetCallback(() => controls.infRadSlider.value(PRESET_MORE_INTERACTION_INF_RAD)),
    makePresetCallback(() => controls.infChanceSlider.value(PRESET_BETTER_HYGIENE_INF_RAD)),
    makePresetCallback(() => controls.infChanceSlider.value(PRESET_WORSE_HYGIENE_INF_RAD)),
    makePresetCallback(() => {
      controls.inf1DurationSlider.value(PRESET_SHORTER_INF1_DURATION)
      controls.inf2DurationSlider.value(PRESET_SHORTER_INF2_DURATION)
    }),
    makePresetCallback(() => {
      controls.inf1DurationSlider.value(PRESET_LONGER_INF1_DURATION)
      controls.inf2DurationSlider.value(PRESET_LONGER_INF2_DURATION)
    }),
    makePresetCallback(() => controls.testPropSlider.value(PRESET_HIGHER_TEST_PROP)),
    makePresetCallback(() => controls.testPropSlider.value(PRESET_LOWER_TEST_PROP)),
    makePresetCallback(() => {
      controls.sDistSlider.value(PRESET_SODIST_FACTOR)
      controls.igSDistSlider.value(PRESET_SODIST_NO_IGNORE)
    }),
    makePresetCallback(() => {
      controls.sDistSlider.value(PRESET_SODIST_FACTOR)
      controls.igSDistSlider.value(PRESET_SODIST_SOME_IGNORE)
    }),
    () => {
      controls.simBtnCallback(newCommunitySim, controls.simCommunityBtn, controls.simBtns)()
      controls.comCrossIntSlider.value(PRESET_COM_CROSS_RESTRICTED)
      controls.syncSimWithSettings()
    },
    () => {
      controls.simBtnCallback(newCommunitySim, controls.simCommunityBtn, controls.simBtns)()
      controls.comCrossIntSlider.value(PRESET_COM_CROSS_UNRESTRICTED)
      controls.syncSimWithSettings()
    },
    () => {
      controls.simBtnCallback(newBasicSim, controls.simBasicBtn, controls.simBtns)()
      controls.sDistSlider.value(PRESET_SPC_SODIST_FACTOR)
      controls.popSizeSlider.value(PRESET_SMALL_SPC_POP_SIZE)
      controls.infPopInitSlider.value(PRESET_SMALL_SPC_INF_INIT)
      controls.infRadSlider.value(PRESET_SMALL_SPC_INF_RADIUS)
      sim.reset()
    },
    () => {
      controls.simBtnCallback(newBasicSim, controls.simBasicBtn, controls.simBtns)()
      controls.sDistSlider.value(PRESET_SPC_SODIST_FACTOR)
      controls.popSizeSlider.value(PRESET_LARGE_SPC_POP_SIZE)
      controls.infPopInitSlider.value(PRESET_LARGE_SPC_INF_INIT)
      controls.infRadSlider.value(PRESET_LARGE_SPC_INF_RADIUS)
      sim.reset()
    },
  )

  infectionChart = new InfectionChart(document.getElementById('chartcv1').getContext('2d'))

  resetBtn = new Button(FIELD_MARGIN, 0, RESET_BTN_W, RESET_BTN_H, "RESET", 
    () => {
      sim.reset()
      resetBtn.state = true
    })

  controls.simBtnCallback(newBasicSim, controls.simBasicBtn, controls.simBtns)()
}

/**
 * Draw
 */
function draw() {
  background(0)

  sim.update()

  resetBtn.draw()

  sim.draw()
}

/**
 * Mouse stuff
 */
function mousePressed() {
  if (resetBtn.inBounds(mouseX, mouseY)) resetBtn.action()
}

function mouseReleased() {
  resetBtn.state = false
}

/**
 * Callback Stuff
 */
function newBasicSim() {
  sim = new SimBasic(controls, infectionChart, !controls.dontOverrideSettingsCb.checked())
}

function newCentralSim() {
  sim = new SimCentral(controls, infectionChart, !controls.dontOverrideSettingsCb.checked())
}

function newCommunitySim() {
  sim = new SimCommunities(controls, infectionChart, !controls.dontOverrideSettingsCb.checked())
}

function makePresetCallback(callback) {
  return () => {
    sim.reset(true)
    callback()
    controls.syncSimWithSettings()
  }
}