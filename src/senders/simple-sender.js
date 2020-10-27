class SimpleSender extends Sender {
  constructor(fields, controls) {
    super()

    this.f0 = fields[0]

    this.controls = controls
    this.lastTest = globalUpdateCount
    this.q1 = fields[1]
    this.q1Target = createVector(this.q1.x+this.q1.w/2, this.q1.y+this.q1.h/2)
  }

  auto() {
    if (this.controls.quarantineCb.checked() && globalUpdateCount - this.lastTest > DAY_LENGTH) {
      if (this.f0.pts.length>0) {
        const nToTest = ceil(this.controls.popSizeSlider.value() * this.controls.testPropSlider.value()/100)
        this.testAndQuarantine(nToTest, this.f0, this.q1, this.q1Target)
      }
      this.lastTest = globalUpdateCount
    }
  }
}
