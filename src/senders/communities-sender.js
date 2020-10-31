class CommunitiesSender extends Sender {
  constructor(fields, controls) {
    super(fields, controls)
    
    this.lastAuto = globalUpdateCount
    this.fs = this.fields
    this.order = []

    this.controls = controls
    this.lastTest = globalUpdateCount
    this.q1 = this.fs[this.fs.length-1]
    this.q1Target = createVector(this.q1.x+this.q1.w/2, this.q1.y+this.q1.h/2)
  }

  auto() {
    // Quarantine when showing symptoms
    if (this.controls.quarantineSymptomsCb.checked()) {
      this.fs.slice(0, this.fs.length-1).forEach(f => this.quarantineSymptomatic(f, this.q1, this.q1Target))
    }

    // Test and Quarantine
    if (this.controls.testPropSlider.value()>0 && globalUpdateCount - this.lastTest > DAY_LENGTH) {
      const testOrder = Utils.shuffle(this.fs.slice(0, this.fs.length-1))
      for(let i=0; i<testOrder.length; i++) {
        if(testOrder[i].pts.length>0) {
          const nToTest = ceil(this.controls.comSizeSlider.value() * this.controls.testPropSlider.value()/100)
          this.testAndQuarantine(nToTest, testOrder[i], this.q1, this.q1Target)
        }
      }
      this.lastTest = globalUpdateCount
    }

    if (CommunitiesSender.interval!=COMMUNITIES_CROSSING_INTERVAL_MAX && globalUpdateCount - this.lastAuto > CommunitiesSender.interval) {
      if (this.order.length<=1) this.order = Utils.shuffle(this.fs.slice(0, this.fs.length-1))
      const f1 = this.order.pop()
      const f2 = this.order.pop()

      if (f1.pts.length>0) this.launchRandom(f1, f2, createVector(f2.x+f2.w/2, f2.y+f2.h/2))
      //else if (f2.pts.length>0) this.launchRandom(f2, f1, createVector(f1.x+f1.w/2, f1.y+f1.h/2))
      this.lastAuto = globalUpdateCount
    }
  }
}

CommunitiesSender.interval = COMMUNITIES_CROSSING_INTERVAL_DEFAULT