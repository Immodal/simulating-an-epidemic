class CentralLocSender extends Sender {
  constructor(fields) {
    super()
    
    this.lastVisit = globalUpdateCount
    this.lastLeave = globalUpdateCount
    this.f0 = fields[0]
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
    this.f1 = fields[1]
    this.f1Target = createVector(fields[1].x+fields[1].w/2, fields[1].y+fields[1].h/2)
  }

  auto() {
    if (CentralLocSender.visitInterval!=CENTRAL_LOC_VISIT_INTERVAL_MAX 
        && globalUpdateCount - this.lastVisit > CentralLocSender.visitInterval
        && this.f1.qtree.count() < CENTRAL_LOC_CAPACITY) {
      if (this.f0.pts.length>0) this.launch(this.f0, this.f1, this.f1Target)
      this.lastVisit = globalUpdateCount
    }
    if (CentralLocSender.leaveInterval!=CENTRAL_LOC_LEAVE_INTERVAL_MAX && globalUpdateCount - this.lastLeave > CentralLocSender.leaveInterval) {
      if (this.f1.pts.length>0) {
        this.launch(this.f1, this.f0, this.f0Targets[this.f0TargetsCounter])
        this.f0TargetsCounter += 1
        if (this.f0TargetsCounter>=this.f0Targets.length) this.f0TargetsCounter=0
      }
      this.lastLeave = globalUpdateCount
    }
  }
}

CentralLocSender.visitInterval = CENTRAL_LOC_VISIT_INTERVAL_DEFAULT
CentralLocSender.leaveInterval = CENTRAL_LOC_LEAVE_INTERVAL_DEFAULT