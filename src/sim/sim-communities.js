/**
 * Multiple isolated communities
 */
class SimCommunities extends Simulation {
  constructor(controls, chart, fullReset=false) {
    super(controls, chart, fullReset)
  }

  _reset() {
    this.id = SIM_COMMUNITIES
    Point.radius = COMMUNITIES_POINT_RADIUS

    let fy = FIELD_START_Y
    const fieldSpace = width-2*FIELD_MARGIN
    const fieldSubmargin = 10
    const fieldW = (fieldSpace-fieldSubmargin*4)/4
    let fx0 = FIELD_MARGIN
    let fx1 = fx0 + fieldW + fieldSubmargin
    let fx2 = fx1 + fieldW + fieldSubmargin
    let fx3 = fx2 + fieldW + fieldSubmargin
  
    this.fields = []
    for(let i=0; i<4; i++) {
      fy += i>0 ? (fieldW + fieldSubmargin) : 0
      const field0 = new Field(fx0, fy, fieldW, fieldW, this.controls.comSizeSlider.value(), this.controls.infPopInitSlider.value(), QTREE_DEFAULT_CAPACITY)
      this.fields.push(field0)
      const field1 = new Field(fx1, fy, fieldW, fieldW, this.controls.comSizeSlider.value(), this.controls.infPopInitSlider.value(), QTREE_DEFAULT_CAPACITY)
      this.fields.push(field1)
      const field2 = new Field(fx2, fy, fieldW, fieldW, this.controls.comSizeSlider.value(), this.controls.infPopInitSlider.value(), QTREE_DEFAULT_CAPACITY)
      this.fields.push(field2)
      const field3 = new Field(fx3, fy, fieldW, fieldW, 
        this.fields.length>14 ? 0 : this.controls.comSizeSlider.value(), 
        this.controls.infPopInitSlider.value(), 
        QTREE_DEFAULT_CAPACITY, this.fields.length>14)
      this.fields.push(field3)
    }
  
    this.sender = new CommunitiesSender(this.fields, this.controls)
  }
}