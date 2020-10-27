class Controls {
  constructor() {
    this.quarantineCb = this.makeCheckbox("Enable Quarantine", "quarantineCb", QUARANTINE_STATUS_DEFAULT)

    // Destructuring directly into variable is unstable and causes some objects to be undefined
    let group = this.makeSliderGroup(
      "Population Size (applies on RESET, doesn't affect COMMUNITIES): ", 
      "popSizeTxt",
      "popSizeInp",
      POPULATION_SIZE_MIN,
      POPULATION_SIZE_MAX,
      POPULATION_SIZE_DEFAULT,
      POPULATION_SIZE_STEP)
    this.popSizeSlider = group[0]
    this.popSizeLabel = group[1]

    group = this.makeSliderGroup(
      "Community Size (applies on RESET): ", 
      "comSizeTxt",
      "comSizeInp",
      COMMUNITY_SIZE_MIN,
      COMMUNITY_SIZE_MAX,
      COMMUNITY_SIZE_DEFAULT,
      COMMUNITY_SIZE_STEP)
    this.comSizeSlider = group[0]
    this.comSizeLabel = group[1]

    group = this.makeSliderGroup(
      "Social Distancing Factor: ", 
      "sdistancingTxt",
      "sdistancingInp",
      SOCIAL_DISTANCE_FACTOR_MIN,
      SOCIAL_DISTANCE_FACTOR_MAX,
      SOCIAL_DISTANCE_FACTOR_DEFAULT,
      SOCIAL_DISTANCE_FACTOR_STEP)
    this.sDistSlider = group[0]
    this.sDistLabel = group[1]
  
    group = this.makeSliderGroup(
      "% Ignores Social Distancing: ", 
      "isdistancingTxt",
      "isdistancingInp",
      SOCIAL_DISTANCE_IGNORE_MIN,
      SOCIAL_DISTANCE_IGNORE_MAX,
      SOCIAL_DISTANCE_IGNORE_DEFAULT,
      SOCIAL_DISTANCE_IGNORE_STEP)
    this.igSDistSlider = group[0]
    this.igSDistLabel = group[1]
  
    group = this.makeSliderGroup(
      "Infection Radius: ", 
      "infectionRadiusTxt",
      "infectionRadiusInp",
      INFECTION_RADIUS_MIN,
      INFECTION_RADIUS_MAX,
      INFECTION_RADIUS_DEFAULT,
      INFECTION_RADIUS_STEP)
    this.infRadSlider = group[0]
    this.infRadLabel = group[1]
  
    group = this.makeSliderGroup(
      "Daily Infection Chance: ", 
      "infectionChanceTxt",
      "infectionChanceInp",
      INFECTION_CHANCE_MIN,
      INFECTION_CHANCE_MAX,
      INFECTION_CHANCE_DEFAULT,
      INFECTION_CHANCE_STEP)
    this.infChanceSlider = group[0]
    this.infChanceLabel = group[1]

    group = this.makeSliderGroup(
      "Initial Infection Chance (applies on RESET): ", 
      "initialPopInfTxt",
      "initialPopInfInp",
      INFECTION_INITIAL_PROPORTION_MIN,
      INFECTION_INITIAL_PROPORTION_MAX,
      INFECTION_INITIAL_PROPORTION_DEFAULT,
      INFECTION_INITIAL_PROPORTION_STEP)
    this.infPopInitSlider = group[0]
    this.infPopInitLabel = group[1]

    group = this.makeSliderGroup(
      "Infectious, No Symptoms Duration (Days): ", 
      "inf1DurationTxt",
      "inf1DurationInp",
      INFECTIOUS1_DURATION_MIN,
      INFECTIOUS1_DURATION_MAX,
      INFECTIOUS1_DURATION_DEFAULT,
      INFECTIOUS1_DURATION_STEP)
    this.inf1DurationSlider = group[0]
    this.inf1DurationLabel = group[1]

    group = this.makeSliderGroup(
      "Infectious With Symptoms Duration (Days): ", 
      "inf2DurationTxt",
      "inf2DurationInp",
      INFECTIOUS2_DURATION_MIN,
      INFECTIOUS2_DURATION_MAX,
      INFECTIOUS2_DURATION_DEFAULT,
      INFECTIOUS2_DURATION_STEP)
    this.inf2DurationSlider = group[0]
    this.inf2DurationLabel = group[1]

    group = this.makeSliderGroup(
      `Central Location Visit Interval (Up to a max capacity of ${CENTRAL_LOC_CAPACITY}): `, 
      "cenVisitIntTxt",
      "cenVisitIntInp",
      CENTRAL_LOC_VISIT_INTERVAL_MIN,
      CENTRAL_LOC_VISIT_INTERVAL_MAX,
      CENTRAL_LOC_VISIT_INTERVAL_DEFAULT,
      CENTRAL_LOC_VISIT_INTERVAL_STEP)
    this.cenVisitIntSlider = group[0]
    this.cenVisitIntLabel = group[1]

    group = this.makeSliderGroup(
      "Central Location Leave Interval: ", 
      "cenLeaveIntTxt",
      "cenLeaveIntInp",
      CENTRAL_LOC_LEAVE_INTERVAL_MIN,
      CENTRAL_LOC_LEAVE_INTERVAL_MAX,
      CENTRAL_LOC_LEAVE_INTERVAL_DEFAULT,
      CENTRAL_LOC_LEAVE_INTERVAL_STEP)
    this.cenLeaveIntSlider = group[0]
    this.cenLeaveIntLabel = group[1]

    group = this.makeSliderGroup(
      "Communities Crossing Interval: ", 
      "comCrossIntTxt",
      "comCrossIntInp",
      COMMUNITIES_CROSSING_INTERVAL_MIN,
      COMMUNITIES_CROSSING_INTERVAL_MAX,
      COMMUNITIES_CROSSING_INTERVAL_DEFAULT,
      COMMUNITIES_CROSSING_INTERVAL_STEP)
    this.comCrossIntSlider = group[0]
    this.comCrossIntLabel = group[1]
  }

  /**
   * 
   * @param {Integer} sNum Simulation Number
   */
  reset(sNum) {
    this.quarantineCb.checked(QUARANTINE_STATUS_DEFAULT)

    this.popSizeSlider.value(POPULATION_SIZE_DEFAULT)
    this.popSizeCallback()

    this.comSizeSlider.value(COMMUNITY_SIZE_DEFAULT)
    this.comSizeCallback()

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

    this.cenVisitIntSlider.value(CENTRAL_LOC_VISIT_INTERVAL_DEFAULT)
    this.cenVisitIntCallback()

    this.cenLeaveIntSlider.value(CENTRAL_LOC_LEAVE_INTERVAL_DEFAULT)
    this.cenLeaveIntCallback()

    this.comCrossIntSlider.value(COMMUNITIES_CROSSING_INTERVAL_DEFAULT)
    this.comCrossIntCallback()
  }

  /**
   * Update callbacks to update the correct Objects
   * @param {Simulation} sim The current Simulation
   */
  updateCallbacks(sim) {
    this.popSizeCallback = this.popSizeCallbackHOF(this.popSizeSlider, this.popSizeLabel)
    this.popSizeSlider.changed(this.popSizeCallback)

    this.comSizeCallback = this.comSizeCallbackHOF(this.comSizeSlider, this.comSizeLabel)
    this.comSizeSlider.changed(this.comSizeCallback)

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

    this.cenVisitIntCallback = this.cenVisitIntCallbackHOF(this.cenVisitIntSlider, this.cenVisitIntLabel)
    this.cenVisitIntSlider.changed(this.cenVisitIntCallback)

    this.cenLeaveIntCallback = this.cenLeaveIntCallbackHOF(this.cenLeaveIntSlider, this.cenLeaveIntLabel)
    this.cenLeaveIntSlider.changed(this.cenLeaveIntCallback)

    this.comCrossIntCallback = this.comCrossIntCallbackHOF(this.comCrossIntSlider, this.comCrossIntLabel)
    this.comCrossIntSlider.changed(this.comCrossIntCallback)
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
    slider.style("align-self", "center")
    const label = createSpan(`${slider.value()}`)
    label.parent(titleObj)
    return [slider, label]
  }

  /**
   * 
   */
  makeCheckbox(title, parent, state=false) {
    const cb = createCheckbox(title, state)
    cb.parent(parent)
    cb.style('color', COLOR_LIGHT_GRAY)
    return cb
  }

  /**
   * Callbacks must be higher order functions because "this" is undefined when that callbacks are called
   * @param {Slider} slider 
   */
  popSizeCallbackHOF(slider, label) {
    return () => {
      label.html(slider.value())
    }
  }

  comSizeCallbackHOF(slider, label) {
    return () => {
      label.html(slider.value())
    }
  }


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

  cenVisitIntCallbackHOF(slider, label) {
    return () => {
      if (slider.value()==CENTRAL_LOC_VISIT_INTERVAL_MAX) label.html("Off")
      else label.html(slider.value())
      CentralLocSender.visitInterval = slider.value()
    }
  }

  cenLeaveIntCallbackHOF(slider, label) {
    return () => {
      if (slider.value()==CENTRAL_LOC_LEAVE_INTERVAL_MAX) label.html("Off")
      else label.html(slider.value())
      CentralLocSender.leaveInterval = slider.value()
    }
  }

  comCrossIntCallbackHOF(slider, label) {
    return () => {
      if (slider.value()==COMMUNITIES_CROSSING_INTERVAL_MAX) label.html("Off")
      else label.html(slider.value())
      CommunitiesSender.interval = slider.value()
    }
  }
}