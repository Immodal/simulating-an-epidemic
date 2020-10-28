
let sim, infectionChart, controls, resetBtn;
let globalUpdateCount = 0

function setup() {
  frameRate(30)
  const canvas = createCanvas(CANVAS_W, CANVAS_H)
  canvas.parent("#cv")

  controls = new Controls(
    () => sim = new SimBasic(controls, infectionChart, !controls.dontOverrideSettingsCb.checked()),
    () => sim = new SimCentral(controls, infectionChart, !controls.dontOverrideSettingsCb.checked()),
    () => sim = new SimCommunities(controls, infectionChart, !controls.dontOverrideSettingsCb.checked()),
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
      controls.simBtnCallback(()=>sim = new SimCommunities(controls, infectionChart, true), controls.simCommunityBtn, controls.simBtns)()
      controls.comCrossIntSlider.value(PRESET_COM_CROSS_RESTRICTED)
      controls.syncSimWithSettings()
    },
    () => {
      controls.simBtnCallback(()=>sim = new SimCommunities(controls, infectionChart, true), controls.simCommunityBtn, controls.simBtns)()
      controls.comCrossIntSlider.value(PRESET_COM_CROSS_UNRESTRICTED)
      controls.syncSimWithSettings()
    },
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

function makePresetCallback(callback) {
  return () => {
    sim.reset(true)
    callback()
    controls.syncSimWithSettings()
  }
}