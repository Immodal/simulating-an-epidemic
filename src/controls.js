
function initControls() {
  let [slider1, label1] = makeControlsSliderGroup(
    "Social Distancing Factor: ", 
    "sdistancingTxt",
    "sdistancingInp",
    SOCIAL_DISTANCE_FACTOR_MIN,
    SOCIAL_DISTANCE_FACTOR_MAX,
    SOCIAL_DISTANCE_FACTOR_DEFAULT,
    SOCIAL_DISTANCE_FACTOR_STEP,
    socialDistancingUpdatedCallback)
  socialDistancingSlider = slider1
  socialDistancingLabel = label1

  // Destructuring directly into variable seems to be broken in some cases
  let [slider2, label2] = makeControlsSliderGroup(
    "% Ignores Social Distancing: ", 
    "isdistancingTxt",
    "isdistancingInp",
    SOCIAL_DISTANCE_IGNORE_MIN,
    SOCIAL_DISTANCE_IGNORE_MAX,
    SOCIAL_DISTANCE_IGNORE_DEFAULT,
    SOCIAL_DISTANCE_IGNORE_STEP,
    ignoreSocialDistancingUpdatedCallback)
  ignoreSocialDistancingSlider = slider2
  ignoreSocialDistancingLabel = label2

  let [slider3, label3] = makeControlsSliderGroup(
    "Infection Radius: ", 
    "infectionRadiusTxt",
    "infectionRadiusInp",
    INFECTION_RADIUS_MIN,
    INFECTION_RADIUS_MAX,
    INFECTION_RADIUS_DEFAULT,
    INFECTION_RADIUS_STEP,
    infectionRadiusUpdatedCallback)
  infectionRadiusSlider = slider3
  infectionRadiusLabel = label3

  let [slider4, label4] = makeControlsSliderGroup(
    "Daily Infection Chance: ", 
    "infectionChanceTxt",
    "infectionChanceInp",
    INFECTION_CHANCE_MIN,
    INFECTION_CHANCE_MAX,
    INFECTION_CHANCE_DEFAULT,
    INFECTION_CHANCE_STEP,
    infectionChanceUpdatedCallback)
  infectionChanceSlider = slider4
  infectionChanceLabel = label4
}

function resetControls() {
  socialDistancingSlider.value(SOCIAL_DISTANCE_FACTOR_DEFAULT)
  socialDistancingLabel.html(socialDistancingSlider.value())
  socialDistancingUpdatedCallback()

  ignoreSocialDistancingSlider.value(SOCIAL_DISTANCE_IGNORE_DEFAULT)
  ignoreSocialDistancingLabel.html(ignoreSocialDistancingSlider.value())
  ignoreSocialDistancingUpdatedCallback()

  if (simNum==SIM_COMMUNITIES) infectionRadiusSlider.value(COMMUNITIES_INFECTION_RADIUS)
  else if (simNum==SIM_CENTRAL) infectionRadiusSlider.value(CENTRAL_LOC_INFECTION_RADIUS)
  else infectionRadiusSlider.value(INFECTION_RADIUS_DEFAULT)
  infectionRadiusLabel.html(infectionRadiusSlider.value())
  infectionRadiusUpdatedCallback()

  infectionChanceSlider.value(INFECTION_CHANCE_DEFAULT)
  infectionChanceLabel.html(infectionChanceSlider.value())
  infectionChanceUpdatedCallback()
}

function socialDistancingUpdatedCallback() {
  Point.socialDistanceFactor = socialDistancingSlider.value()
}

function ignoreSocialDistancingUpdatedCallback() {
  fields.forEach(f => f.pts.forEach(pt => {
    pt.ignoreSocialDistancing = random()<ignoreSocialDistancingSlider.value()/100 ? true : false
  }))
  sender.objs.forEach(o => {
    o.point.ignoreSocialDistancing = random()<ignoreSocialDistancingSlider.value()/100 ? true : false
  })
}

function infectionRadiusUpdatedCallback() {
  Point.infectionRadius = infectionRadiusSlider.value()
}

function infectionChanceUpdatedCallback() {
  Point.infectionChance = infectionChanceSlider.value()
}

function makeControlsSliderGroup(title, titleParent, sliderParent, sliderMin, sliderMax, sliderStart, sliderStep, sliderCallback=()=>{}) {
  const titleObj = createP(title)
  titleObj.parent(titleParent)
  const slider = createSlider(sliderMin, sliderMax, sliderStart, sliderStep)
  slider.parent(sliderParent)
  const label = createSpan(`${slider.value()}`)
  label.parent(titleObj)
  slider.changed(() => {
    label.html(slider.value())
    sliderCallback()
  })
  return [slider, label]
}

function makeCheckbox(parent, title, callback=()=>{}, value=false) {
  cb = createCheckbox(title, value)
  cb.style("color", COLOR_LIGHT_GRAY)
  cb.parent(parent)
  cb.changed(callback)
  return cb
}