class CommunitiesSender extends Sender {
  constructor(fields) {
    super()
    
    this.lastAuto = globalUpdateCount
    this.fs = fields
    this.order = []
  }

  auto() {
    if (globalUpdateCount - this.lastAuto > COMMUNITIES_SENDER_INTERVAL) {
      if (this.order.length==0) {
        this.order = this.fs.slice()
        Utils.shuffle(this.order)
        this.order.sort((a,b) => a.pts.length>b.pts.length ? -1 : a.pts.length<b.pts.length ? 1 : 0)
      } 
      const from = this.order[0]
      let to = this.order[this.order.length-1]
      if (from.pts.length>0) this.launch(from, to, createVector(to.x+to.w/2, to.y+to.h/2))
      this.lastAuto = globalUpdateCount
      this.order.pop()
      this.order.shift()
    }
  }
}