class Controls {
  constructor(simBasicCallback, simCentralCallback, simCommunityCallback,
      lessInteractionPresetCallback, moreInteractionPresetCallback,
      betterHygienePresetCallback, worseHygienePresetCallback,
      shorterInfDurPresetCallback, longerInfDurPresetCallback,
      higherTestPropPresetCallback, lowerTestPropPresetCallback,
      fullSocDistPresetCallback, someSocDistPresetCallback,
      restrictComCrossPresetCallBack, unrestrictComCrossPresetCallBack,
      smallSpaceLessPeoplePresetCallback, smallSpaceMorePeoplePresetCallback) {

    this.simBasicBtn = this.makeSimBtn("Simple", "chooseASimInp")
    this.simCentralBtn = this.makeSimBtn("Central Location", "chooseASimInp")
    this.simCommunityBtn = this.makeSimBtn("Communities", "chooseASimInp")
    this.simBtns = [this.simBasicBtn, this.simCentralBtn, this.simCommunityBtn]
    this.simBasicBtn.mousePressed(this.simBtnCallback(simBasicCallback, this.simBasicBtn, this.simBtns))
    this.simCentralBtn.mousePressed(this.simBtnCallback(simCentralCallback, this.simCentralBtn, this.simBtns))
    this.simCommunityBtn.mousePressed(this.simBtnCallback(simCommunityCallback, this.simCommunityBtn, this.simBtns))

    this.presetLessInteractionBtn = this.makePresetBtn("Less Interactions", "dailyInteractionsPreset")
    this.presetLessInteractionBtn.mousePressed(lessInteractionPresetCallback)
    this.presetMoreInteractionBtn = this.makePresetBtn("More Interactions", "dailyInteractionsPreset")
    this.presetMoreInteractionBtn.mousePressed(moreInteractionPresetCallback)

    this.presetBetterHygieneBtn = this.makePresetBtn("Better Hygiene", "hygienePreset")
    this.presetBetterHygieneBtn.mousePressed(betterHygienePresetCallback)
    this.presetWorseHygieneBtn = this.makePresetBtn("Worse Hygiene", "hygienePreset")
    this.presetWorseHygieneBtn.mousePressed(worseHygienePresetCallback)

    this.presetShorterInfDurBtn = this.makePresetBtn("Shorter Illness", "illnessDurationPreset")
    this.presetShorterInfDurBtn.mousePressed(shorterInfDurPresetCallback)
    this.presetLongerInfDurBtn = this.makePresetBtn("Longer Illness", "illnessDurationPreset")
    this.presetLongerInfDurBtn.mousePressed(longerInfDurPresetCallback)

    this.presetHigherTestPropBtn = this.makePresetBtn("More Testing", "testCoveragePreset")
    this.presetHigherTestPropBtn.mousePressed(higherTestPropPresetCallback)
    this.presetLowerTestPropBtn = this.makePresetBtn("Less Testing", "testCoveragePreset")
    this.presetLowerTestPropBtn.mousePressed(lowerTestPropPresetCallback)

    this.fullSocDistBtn = this.makePresetBtn("Full Social Distancing", "socialDistancingPreset")
    this.fullSocDistBtn.mousePressed(fullSocDistPresetCallback)
    this.someSocDistBtn = this.makePresetBtn("Some People Ignore Social Distancing", "socialDistancingPreset")
    this.someSocDistBtn.mousePressed(someSocDistPresetCallback)

    this.resComCrossBtn = this.makePresetBtn("Restricted Intercommunity Transit", "limitedTransitPreset")
    this.resComCrossBtn.mousePressed(restrictComCrossPresetCallBack)
    this.unresComCrossBtn = this.makePresetBtn("Unrestricted Intercommunity Transit", "limitedTransitPreset")
    this.unresComCrossBtn.mousePressed(unrestrictComCrossPresetCallBack)

    this.smlSpcLessPplBtn = this.makePresetBtn("Small Space, Less People", "smallSpacePreset")
    this.smlSpcLessPplBtn.mousePressed(smallSpaceLessPeoplePresetCallback)
    this.smlSpcMorePplBtn = this.makePresetBtn("Small Space, More People", "smallSpacePreset")
    this.smlSpcMorePplBtn.mousePressed(smallSpaceMorePeoplePresetCallback)

    this.dontOverrideSettingsCb = this.makeCheckbox("Don't reset settings when changing simulation", "dontOverrideSettingsCb", false)

    // Destructuring directly into variable is unstable and causes some objects to be undefined
    let group = this.makeSliderGroup(
      "Number of People: ", "(Applies on RESET, doesn't affect COMMUNITIES)",
      "popSizeTxt",
      "popSizeInp",
      POPULATION_SIZE_MIN,
      POPULATION_SIZE_MAX,
      POPULATION_SIZE_DEFAULT,
      POPULATION_SIZE_STEP)
    this.popSizeSlider = group[0]
    this.popSizeLabel = group[1]

    group = this.makeSliderGroup(
      "Number of People Per Community: ", "(Applies on RESET)",
      "comSizeTxt",
      "comSizeInp",
      COMMUNITY_SIZE_MIN,
      COMMUNITY_SIZE_MAX,
      COMMUNITY_SIZE_DEFAULT,
      COMMUNITY_SIZE_STEP)
    this.comSizeSlider = group[0]
    this.comSizeLabel = group[1]

    group = this.makeSliderGroup(
      "Social Distancing Factor: ", "(How strongly people stay away from each other)",
      "sdistancingTxt",
      "sdistancingInp",
      SOCIAL_DISTANCE_FACTOR_MIN,
      SOCIAL_DISTANCE_FACTOR_MAX,
      SOCIAL_DISTANCE_FACTOR_DEFAULT,
      SOCIAL_DISTANCE_FACTOR_STEP)
    this.sDistSlider = group[0]
    this.sDistLabel = group[1]
  
    group = this.makeSliderGroup(
      "% of People Ignoring Social Distancing: ", null,
      "isdistancingTxt",
      "isdistancingInp",
      SOCIAL_DISTANCE_IGNORE_MIN,
      SOCIAL_DISTANCE_IGNORE_MAX,
      SOCIAL_DISTANCE_IGNORE_DEFAULT,
      SOCIAL_DISTANCE_IGNORE_STEP)
    this.igSDistSlider = group[0]
    this.igSDistLabel = group[1]
  
    group = this.makeSliderGroup(
      "Infection Radius: ",  "(Lower means less interaction with other people)",
      "infectionRadiusTxt",
      "infectionRadiusInp",
      INFECTION_RADIUS_MIN,
      INFECTION_RADIUS_MAX,
      INFECTION_RADIUS_DEFAULT,
      INFECTION_RADIUS_STEP)
    this.infRadSlider = group[0]
    this.infRadLabel = group[1]
  
    group = this.makeSliderGroup(
      "Daily Infection Chance: ", "(Lower means better hygiene, e.g. frequent hand washing, masks)",
      "infectionChanceTxt",
      "infectionChanceInp",
      INFECTION_CHANCE_MIN,
      INFECTION_CHANCE_MAX,
      INFECTION_CHANCE_DEFAULT,
      INFECTION_CHANCE_STEP)
    this.infChanceSlider = group[0]
    this.infChanceLabel = group[1]

    group = this.makeSliderGroup(
      "Initial Infection Chance: ", "(Applies on RESET)",
      "initialPopInfTxt",
      "initialPopInfInp",
      INFECTION_INITIAL_PROPORTION_MIN,
      INFECTION_INITIAL_PROPORTION_MAX,
      INFECTION_INITIAL_PROPORTION_DEFAULT,
      INFECTION_INITIAL_PROPORTION_STEP)
    this.infPopInitSlider = group[0]
    this.infPopInitLabel = group[1]

    group = this.makeSliderGroup(
      "Infectious, No Symptoms Duration: ", "(Days)",
      "inf1DurationTxt",
      "inf1DurationInp",
      INFECTIOUS1_DURATION_MIN,
      INFECTIOUS1_DURATION_MAX,
      INFECTIOUS1_DURATION_DEFAULT,
      INFECTIOUS1_DURATION_STEP)
    this.inf1DurationSlider = group[0]
    this.inf1DurationLabel = group[1]

    group = this.makeSliderGroup(
      "Infectious With Symptoms Duration: ", "(Days)",
      "inf2DurationTxt",
      "inf2DurationInp",
      INFECTIOUS2_DURATION_MIN,
      INFECTIOUS2_DURATION_MAX,
      INFECTIOUS2_DURATION_DEFAULT,
      INFECTIOUS2_DURATION_STEP)
    this.inf2DurationSlider = group[0]
    this.inf2DurationLabel = group[1]

    group = this.makeSliderGroup(
      `Central Location Visit Interval: `, `(Length of time between people visiting, max ${CENTRAL_LOC_CAPACITY} people)`,
      "cenVisitIntTxt",
      "cenVisitIntInp",
      CENTRAL_LOC_VISIT_INTERVAL_MIN,
      CENTRAL_LOC_VISIT_INTERVAL_MAX,
      CENTRAL_LOC_VISIT_INTERVAL_DEFAULT,
      CENTRAL_LOC_VISIT_INTERVAL_STEP)
    this.cenVisitIntSlider = group[0]
    this.cenVisitIntLabel = group[1]

    group = this.makeSliderGroup(
      "Central Location Leave Interval: ", "(Length of time between people leaving)",
      "cenLeaveIntTxt",
      "cenLeaveIntInp",
      CENTRAL_LOC_LEAVE_INTERVAL_MIN,
      CENTRAL_LOC_LEAVE_INTERVAL_MAX,
      CENTRAL_LOC_LEAVE_INTERVAL_DEFAULT,
      CENTRAL_LOC_LEAVE_INTERVAL_STEP)
    this.cenLeaveIntSlider = group[0]
    this.cenLeaveIntLabel = group[1]

    group = this.makeSliderGroup(
      "Communities Crossing Interval: ", "(Length of time between people crossing communities)",
      "comCrossIntTxt",
      "comCrossIntInp",
      COMMUNITIES_CROSSING_INTERVAL_MIN,
      COMMUNITIES_CROSSING_INTERVAL_MAX,
      COMMUNITIES_CROSSING_INTERVAL_DEFAULT,
      COMMUNITIES_CROSSING_INTERVAL_STEP)
    this.comCrossIntSlider = group[0]
    this.comCrossIntLabel = group[1]

    this.quarantineSymptomsCb = this.makeCheckbox("Quarantine When Showing Symptoms", "quarantineWithSymptomsCb", QUARANTINE_WITH_SYMPTOMS_DEFAULT)

    group = this.makeSliderGroup(
      "Quarantine Delay After Showing Symptoms: ", "(Days)",
      "quarantineWithSymptomsDelayTxt",
      "quarantineWithSymptomsDelayInp",
      QUARANTINE_WITH_SYMPTOMS_DELAY_MIN,
      QUARANTINE_WITH_SYMPTOMS_DELAY_MAX,
      QUARANTINE_WITH_SYMPTOMS_DELAY_DEFAULT,
      QUARANTINE_WITH_SYMPTOMS_DELAY_STEP)
    this.qwsDelaySlider = group[0]
    this.qwsDelayLabel = group[1]

    group = this.makeSliderGroup(
      "% of People Randomly Tested Daily: ",  "(Those that test positive are immediately quarantined)",
      "testPropTxt",
      "testPropInp",
      TEST_PROP_MIN,
      TEST_PROP_MAX,
      TEST_PROP_DEFAULT,
      TEST_PROP_STEP)
    this.testPropSlider = group[0]
    this.testPropLabel = group[1]

    group = this.makeSliderGroup(
      "Simulation Speed: ",  null,
      "simSpeedTxt",
      "simSpeedInp",
      SIM_SPEED_MIN,
      SIM_SPEED_MAX,
      SIM_SPEED_DEFAULT,
      SIM_SPEED_STEP)
    this.simSpeedSlider = group[0]
    this.simSpeedLabel = group[1]

    group = this.makeSliderGroup(
      "Hospital Resources: ",  "(Number of people that can be treated at the same time)",
      "hospResTxt",
      "hospResInp",
      HOSPITAL_RESOURCES_MIN,
      HOSPITAL_RESOURCES_MAX,
      HOSPITAL_RESOURCES_DEFAULT,
      HOSPITAL_RESOURCES_STEP)
    this.hospResSlider = group[0]
    this.hospResLabel = group[1]

    group = this.makeSliderGroup(
      "Daily Chance of Death if Untreated: ",  "(Treatment only available in quarantine)",
      "deathChanceTxt",
      "deathChanceInp",
      INFECTION_UNTREATED_DEATH_RATE_MIN,
      INFECTION_UNTREATED_DEATH_RATE_MAX,
      INFECTION_UNTREATED_DEATH_RATE_DEFAULT,
      INFECTION_UNTREATED_DEATH_RATE_STEP)
    this.deathChanceSlider = group[0]
    this.deathChanceLabel = group[1]
  }

  /**
   * 
   * @param {Integer} sNum Simulation Number
   */
  reset(sNum) {
    this.quarantineSymptomsCb.checked(QUARANTINE_WITH_SYMPTOMS_DEFAULT)

    this.popSizeSlider.value(POPULATION_SIZE_DEFAULT)
    this.comSizeSlider.value(COMMUNITY_SIZE_DEFAULT)
    this.sDistSlider.value(SOCIAL_DISTANCE_FACTOR_DEFAULT)
    this.igSDistSlider.value(SOCIAL_DISTANCE_IGNORE_DEFAULT)
    
    if (sNum==SIM_COMMUNITIES) {
      this.infRadSlider.value(COMMUNITIES_INFECTION_RADIUS)
    }
    else if (sNum==SIM_CENTRAL) this.infRadSlider.value(CENTRAL_LOC_INFECTION_RADIUS)
    else this.infRadSlider.value(INFECTION_RADIUS_DEFAULT)
  
    this.infChanceSlider.value(INFECTION_CHANCE_DEFAULT)
    this.infPopInitSlider.value(INFECTION_INITIAL_PROPORTION_DEFAULT)
    this.inf1DurationSlider.value(INFECTIOUS1_DURATION_DEFAULT)
    this.inf2DurationSlider.value(INFECTIOUS2_DURATION_DEFAULT)
    this.cenVisitIntSlider.value(CENTRAL_LOC_VISIT_INTERVAL_DEFAULT)
    this.cenLeaveIntSlider.value(CENTRAL_LOC_LEAVE_INTERVAL_DEFAULT)
    this.comCrossIntSlider.value(COMMUNITIES_CROSSING_INTERVAL_DEFAULT)
    this.testPropSlider.value(TEST_PROP_DEFAULT)
    this.simSpeedSlider.value(SIM_SPEED_DEFAULT)
    this.hospResSlider.value(HOSPITAL_RESOURCES_DEFAULT)
    this.deathChanceSlider.value(INFECTION_UNTREATED_DEATH_RATE_DEFAULT)
    this.qwsDelaySlider.value(QUARANTINE_WITH_SYMPTOMS_DELAY_DEFAULT)

    this.syncSimWithSettings()
  }

  /**
   * Calls every callback to ensure that all settings have been applied
   */
  syncSimWithSettings() {
    this.popSizeCallback()
    this.comSizeCallback()
    this.sDistCallback()
    this.igSDistCallback()
    this.infRadCallback()
    this.infChanceCallback()
    this.infPopInitCallback()
    this.inf1DurationCallback()
    this.inf2DurationCallback()
    this.cenVisitIntCallback()
    this.cenLeaveIntCallback()
    this.comCrossIntCallback()
    this.testPropCallback()
    this.simSpeedCallback()
    this.hospResCallback()
    this.deathChanceCallback()
    this.qwsDelayCallback()
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

    this.testPropCallback = this.testPropCallbackHOF(this.testPropSlider, this.testPropLabel)
    this.testPropSlider.changed(this.testPropCallback)

    this.simSpeedCallback = this.simSpeedCallbackHOF(this.simSpeedSlider, this.simSpeedLabel)
    this.simSpeedSlider.changed(this.simSpeedCallback)

    this.hospResCallback = this.hospResCallbackHOF(this.hospResSlider, this.hospResLabel)
    this.hospResSlider.changed(this.hospResCallback)

    this.deathChanceCallback = this.deathChanceCallbackHOF(this.deathChanceSlider, this.deathChanceLabel)
    this.deathChanceSlider.changed(this.deathChanceCallback)

    this.qwsDelayCallback = this.qwsDelayCallbackHOF(this.qwsDelaySlider, this.qwsDelayLabel)
    this.qwsDelaySlider.changed(this.qwsDelayCallback)
  }

  /**
   * 
   */
  makeSliderGroup(title, info, titleParent, sliderParent, sliderMin, sliderMax, sliderStart, sliderStep) {
    const titleObj = createP(title)
    titleObj.parent(titleParent)
    if(info!=null) {
      const infoObj = createP(info)
      infoObj.parent(titleParent)
      infoObj.addClass("colInfo")
    }
    const slider = createSlider(sliderMin, sliderMax, sliderStart, sliderStep)
    slider.parent(sliderParent)
    slider.addClass("slider")
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
    cb.style('display', "flex")
    cb.style('align-items', "center")
    return cb
  }

  /**
   * 
   */
  makeButton(title, parent) {
    const btn = createButton(title)
    btn.parent(parent)
    return btn
  }

  /**
   * 
   */
  makePresetBtn(title, parent) {
    const btn = this.makeButton(title, parent)
    btn.addClass("presetBtn")
    return btn
  }

  /**
   * 
   */
  makeSimBtn(title, parent) {
    const btn = this.makeButton(title, parent)
    btn.addClass("simBtn")
    return btn
  }

  simBtnCallback(callback, btn, btns) {
    return () => {
      btns.forEach(b => {
        if (b.hasClass(SIM_BTN_STATE_ON_CLASS)) b.removeClass(SIM_BTN_STATE_ON_CLASS)
        if (!b.hasClass(SIM_BTN_STATE_OFF_CLASS)) b.addClass(SIM_BTN_STATE_OFF_CLASS)
      })
      callback()
      if (!btn.hasClass(SIM_BTN_STATE_ON_CLASS)) btn.addClass(SIM_BTN_STATE_ON_CLASS)
      if (btn.hasClass(SIM_BTN_STATE_OFF_CLASS)) btn.removeClass(SIM_BTN_STATE_OFF_CLASS)
    }
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

  testPropCallbackHOF(slider, label) {
    return () => {
      label.html(slider.value())
    }
  }

  simSpeedCallbackHOF(slider, label) {
    return () => {
      label.html(slider.value())
      Simulation.speed = slider.value()
    }
  }

  hospResCallbackHOF(slider, label) {
    return () => {
      label.html(slider.value())
      Simulation.hospitalResources = slider.value()
    }
  }

  deathChanceCallbackHOF(slider, label) {
    return () => {
      label.html(slider.value())
      Point.infectionUntreatedDeathRate = slider.value()
    }
  }

  qwsDelayCallbackHOF(slider, label) {
    return () => {
      label.html(slider.value())
    }
  }
}