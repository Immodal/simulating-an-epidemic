class CentralLocSender extends Sender {
  constructor(fields, controls) {
    super(fields, controls)
    
    this.lastVisit = globalUpdateCount
    this.lastLeave = globalUpdateCount
    this.f0 = this.fields[0]
    this.f0TargetsCounter = 0
    this.f0Targets = [
      createVector(this.f0.x+this.f0.w/2, this.f0.y+this.f0.h/5), // North
      createVector(this.f0.x+this.f0.w/4, this.f0.y+this.f0.h/4),
      createVector(this.f0.x+this.f0.w/5, this.f0.y+this.f0.h/2), // West
      createVector(this.f0.x+this.f0.w/4, this.f0.y+3*this.f0.h/4),
      createVector(this.f0.x+this.f0.w/2, this.f0.y+4*this.f0.h/5), // South
      createVector(this.f0.x+3*this.f0.w/4, this.f0.y+3*this.f0.h/4),
      createVector(this.f0.x+4*this.f0.w/5, this.f0.y+this.f0.h/2), // East
      createVector(this.f0.x+3*this.f0.w/4, this.f0.y+this.f0.h/4), 
    ]
    this.f1 = this.fields[1]
    this.f1Target = createVector(this.f1.x+this.f1.w/2, this.f1.y+this.f1.h/2)

    this.controls = controls
    this.lastTest = globalUpdateCount
    this.q1 = this.fields[2]
    this.q1Target = createVector(this.q1.x+this.q1.w/2, this.q1.y+this.q1.h/2)
  }

  auto() {
    if (this.controls.quarantineSymptomsCb.checked()) {
      this.quarantineSymptomatic(this.f0, this.q1, this.q1Target)
      this.quarantineSymptomatic(this.f1, this.q1, this.q1Target)
    }

    if (this.controls.testPropSlider.value()>0 && globalUpdateCount - this.lastTest > DAY_LENGTH) {
      if (this.f0.pts.length + this.f1.pts.length>0) {
        const nToTest = ceil(this.controls.popSizeSlider.value() * this.controls.testPropSlider.value()/100)
        this.testAndQuarantine(nToTest, this.f1, this.q1, this.q1Target)
        
        const remToTest = nToTest-this.f1.pts.length
        if (remToTest>0) this.testAndQuarantine(remToTest, this.f0, this.q1, this.q1Target)
      }
      this.lastTest = globalUpdateCount
    }

    if (CentralLocSender.visitInterval!=CENTRAL_LOC_VISIT_INTERVAL_MAX 
        && globalUpdateCount - this.lastVisit > CentralLocSender.visitInterval
        && this.f1.qtree.count() < CENTRAL_LOC_CAPACITY) {
      if (this.f0.pts.length>0) this.launchRandom(this.f0, this.f1, this.f1Target)
      this.lastVisit = globalUpdateCount
    }

    if (CentralLocSender.leaveInterval!=CENTRAL_LOC_LEAVE_INTERVAL_MAX && globalUpdateCount - this.lastLeave > CentralLocSender.leaveInterval) {
      if (this.f1.pts.length>0) {
        this.launchRandom(this.f1, this.f0, this.f0Targets[this.f0TargetsCounter])
        this.f0TargetsCounter += 1
        if (this.f0TargetsCounter>=this.f0Targets.length) this.f0TargetsCounter=0
      }
      this.lastLeave = globalUpdateCount
    }
  }
}

CentralLocSender.visitInterval = CENTRAL_LOC_VISIT_INTERVAL_DEFAULT
CentralLocSender.leaveInterval = CENTRAL_LOC_LEAVE_INTERVAL_DEFAULT