class Controls {
  constructor() {
    // Destructuring directly into variable is unstable and causes some objects to be undefined
    let [slider0, label0] = this.makeSliderGroup(
      "Social Distancing Factor: ", 
      "sdistancingTxt",
      "sdistancingInp",
      SOCIAL_DISTANCE_FACTOR_MIN,
      SOCIAL_DISTANCE_FACTOR_MAX,
      SOCIAL_DISTANCE_FACTOR_DEFAULT,
      SOCIAL_DISTANCE_FACTOR_STEP)
    this.sDistSlider = slider0
    this.sDistLabel = label0
  
    let [slider1, label1] = this.makeSliderGroup(
      "% Ignores Social Distancing: ", 
      "isdistancingTxt",
      "isdistancingInp",
      SOCIAL_DISTANCE_IGNORE_MIN,
      SOCIAL_DISTANCE_IGNORE_MAX,
      SOCIAL_DISTANCE_IGNORE_DEFAULT,
      SOCIAL_DISTANCE_IGNORE_STEP)
    this.igSDistSlider = slider1
    this.igSDistLabel = label1
  
    let [slider2, label2] = this.makeSliderGroup(
      "Infection Radius: ", 
      "infectionRadiusTxt",
      "infectionRadiusInp",
      INFECTION_RADIUS_MIN,
      INFECTION_RADIUS_MAX,
      INFECTION_RADIUS_DEFAULT,
      INFECTION_RADIUS_STEP)
    this.infRadSlider = slider2
    this.infRadLabel = label2
  
    let [slider3, label3] = this.makeSliderGroup(
      "Daily Infection Chance: ", 
      "infectionChanceTxt",
      "infectionChanceInp",
      INFECTION_CHANCE_MIN,
      INFECTION_CHANCE_MAX,
      INFECTION_CHANCE_DEFAULT,
      INFECTION_CHANCE_STEP)
    this.infChanceSlider = slider3
    this.infChanceLabel = label3

    let [slider4, label4] = this.makeSliderGroup(
      "Initial Infection Chance (applies on RESET): ", 
      "initialPopInfTxt",
      "initialPopInfInp",
      INFECTION_INITIAL_PROPORTION_MIN,
      INFECTION_INITIAL_PROPORTION_MAX,
      INFECTION_INITIAL_PROPORTION_DEFAULT,
      INFECTION_INITIAL_PROPORTION_STEP)
    this.infPopInitSlider = slider4
    this.infPopInitLabel = label4

    let [slider5, label5] = this.makeSliderGroup(
      "Infectious, No Symptoms Duration (Days): ", 
      "inf1DurationTxt",
      "inf1DurationInp",
      INFECTIOUS1_DURATION_MIN,
      INFECTIOUS1_DURATION_MAX,
      INFECTIOUS1_DURATION_DEFAULT,
      INFECTIOUS1_DURATION_STEP)
    this.inf1DurationSlider = slider5
    this.inf1DurationLabel = label5

    let [slider6, label6] = this.makeSliderGroup(
      "Infectious With Symptoms Duration (Days): ", 
      "inf2DurationTxt",
      "inf2DurationInp",
      INFECTIOUS2_DURATION_MIN,
      INFECTIOUS2_DURATION_MAX,
      INFECTIOUS2_DURATION_DEFAULT,
      INFECTIOUS2_DURATION_STEP)
    this.inf2DurationSlider = slider6
    this.inf2DurationLabel = label6
  }

  /**
   * 
   * @param {Integer} sNum Simulation Number
   */
  reset(sNum) {
    this.sDistSlider.value(SOCIAL_DISTANCE_FACTOR_DEFAULT)
    this.sDistCallback()
  
    this.igSDistSlider.value(SOCIAL_DISTANCE_IGNORE_DEFAULT)
    this.igSDistCallback()
  
    if (sNum==SIM_COMMUNITIES) this.infRadSlider.value(COMMUNITIES_INFECTION_RADIUS)
    else if (sNum==SIM_CENTRAL) this.infRadSlider.value(CENTRAL_LOC_INFECTION_RADIUS)
    else this.infRadSlider.value(INFECTION_RADIUS_DEFAULT)
    this.infRadCallback()
  
    this.infChanceSlider.value(INFECTION_CHANCE_DEFAULT)
    this.infChanceCallback()

    this.infPopInitSlider.value(INFECTION_INITIAL_PROPORTION_DEFAULT)
    this.infPopInitCallback()

    this.inf1DurationSlider.value(INFECTIOUS1_DURATION_DEFAULT)
    this.inf1DurationCallback()

    this.inf2DurationSlider.value(INFECTIOUS2_DURATION_DEFAULT)
    this.inf2DurationCallback()
  }

  /**
   * Update callbacks to update the correct Objects
   * @param {Simulation} sim The current Simulation
   */
  updateCallbacks(sim) {
    this.sDistCallback = this.sDistCallbackHOF(this.sDistSlider, this.sDistLabel)
    this.sDistSlider.changed(this.sDistCallback)

    this.igSDistCallback = this.igSDistCallbackHOF(this.igSDistSlider, this.igSDistLabel, sim)
    this.igSDistSlider.changed(this.igSDistCallback)

    this.infRadCallback = this.infRadCallbackHOF(this.infRadSlider, this.infRadLabel)
    this.infRadSlider.changed(this.infRadCallback)

    this.infChanceCallback = this.infChanceCallbackHOF(this.infChanceSlider, this.infChanceLabel)
    this.infChanceSlider.changed(this.infChanceCallback)

    this.infPopInitCallback = this.infPopInitCallbackHOF(this.infPopInitSlider, this.infPopInitLabel)
    this.infPopInitSlider.changed(this.infPopInitCallback)

    this.inf1DurationCallback = this.inf1DurationCallbackHOF(this.inf1DurationSlider, this.inf1DurationLabel)
    this.inf1DurationSlider.changed(this.inf1DurationCallback)

    this.inf2DurationCallback = this.inf2DurationCallbackHOF(this.inf2DurationSlider, this.inf2DurationLabel)
    this.inf2DurationSlider.changed(this.inf2DurationCallback)
  }

  /**
   * 
   */
  makeSliderGroup(title, titleParent, sliderParent, sliderMin, sliderMax, sliderStart, sliderStep) {
    const titleObj = createP(title)
    titleObj.parent(titleParent)
    const slider = createSlider(sliderMin, sliderMax, sliderStart, sliderStep)
    slider.parent(sliderParent)
    slider.style("width", "100%")
    slider.style("display", "inline-block")
    slider.style("align-self", "flex-end")
    const label = createSpan(`${slider.value()}`)
    label.parent(titleObj)
    return [slider, label]
  }

  /**
   * Callbacks must be higher order functions because "this" is undefined when that callbacks are called
   * @param {Slider} slider 
   */
  sDistCallbackHOF(slider, label) {
    return () => {
      label.html(slider.value())
      Point.socialDistanceFactor = slider.value()
    }
  }

  igSDistCallbackHOF(slider, label, sim) {
    return () => {
      label.html(slider.value())
      sim.fields.forEach(f => f.pts.forEach(pt => {
        pt.ignoreSocialDistancing = random()<slider.value()/100 ? true : false
      }))
      sim.sender.objs.forEach(o => {
        o.point.ignoreSocialDistancing = random()<slider.value()/100 ? true : false
      })
    }
  }
  
  infRadCallbackHOF(slider, label) {
    return () => {
      label.html(slider.value())
      Point.infectionRadius = slider.value()
    }
  }
  
  infChanceCallbackHOF(slider, label) {
    return () => {
      label.html(slider.value())
      Point.infectionChance = slider.value()
    }
  }

  infPopInitCallbackHOF(slider, label) {
    return () => {
      label.html(slider.value())
    }
  }

  inf1DurationCallbackHOF(slider, label) {
    return () => {
      label.html(slider.value())
      Point.infectious1Interval = slider.value() * DAY_LENGTH
    }
  }

  inf2DurationCallbackHOF(slider, label) {
    return () => {
      label.html(slider.value())
      Point.infectious2Interval = slider.value() * DAY_LENGTH
    }
  }
}