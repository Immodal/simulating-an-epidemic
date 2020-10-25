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
    this.sDistCallback = this.sDistCallbackHOF(this.sDistSlider, this.sDistLabel)
    this.sDistSlider.changed(this.sDistCallback)
  
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
    this.igSDistCallback = this.igSDistCallbackHOF(this.igSDistSlider, this.igSDistLabel)
    this.igSDistSlider.changed(this.igSDistCallback)
  
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
    this.infRadCallback = this.infRadCallbackHOF(this.infRadSlider, this.infRadLabel)
    this.infRadSlider.changed(this.infRadCallback)
  
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
    this.infChanceCallback = this.infChanceCallbackHOF(this.infChanceSlider, this.infChanceLabel)
    this.infChanceSlider.changed(this.infChanceCallback)
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
  }

  /**
   * 
   */
  makeSliderGroup(title, titleParent, sliderParent, sliderMin, sliderMax, sliderStart, sliderStep) {
    const titleObj = createP(title)
    titleObj.parent(titleParent)
    const slider = createSlider(sliderMin, sliderMax, sliderStart, sliderStep)
    slider.parent(sliderParent)
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

  igSDistCallbackHOF(slider, label) {
    return () => {
      label.html(slider.value())
      fields.forEach(f => f.pts.forEach(pt => {
        pt.ignoreSocialDistancing = random()<slider.value()/100 ? true : false
      }))
      sender.objs.forEach(o => {
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
}