class CommunitiesSender extends Sender {
  constructor(fields, controls) {
    super()
    
    this.lastAuto = globalUpdateCount
    this.fs = fields
    this.order = []

    this.controls = controls
    this.lastTest = globalUpdateCount
    this.q1 = fields[fields.length-1]
    this.q1Target = createVector(this.q1.x+this.q1.w/2, this.q1.y+this.q1.h/2)
  }

  auto() {
    if (this.controls.quarantineSymptomsCb.checked()) {
      this.fs.slice(0, this.fs.length-1).forEach(f => this.quarantineSymptomatic(f, this.q1, this.q1Target))
    }

    if (this.controls.activeTestingCb.checked() && globalUpdateCount - this.lastTest > DAY_LENGTH) {
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
      if (this.order.length==0) {
        this.order = this.fs.slice(0, this.fs.length-1)
        Utils.shuffle(this.order)
        this.order.sort((a,b) => a.pts.length>b.pts.length ? -1 : a.pts.length<b.pts.length ? 1 : 0)
      } 
      const from = this.order[0]
      let to = this.order[this.order.length-1]
      if (from.pts.length>0) this.launchRandom(from, to, createVector(to.x+to.w/2, to.y+to.h/2))
      this.lastAuto = globalUpdateCount
      this.order.pop()
      this.order.shift()
    }
  }
}

CommunitiesSender.interval = COMMUNITIES_CROSSING_INTERVAL_DEFAULT