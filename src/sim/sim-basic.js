/**
 * Basic Random Walk Sim
 */
class SimBasic extends Simulation {
  constructor(controls, chart) {
    super(controls, chart)
    this.id = SIM_BASIC
  }

  _reset() {
    Point.radius = POINT_RADIUS_DEFAULT

    this.fields = []
    const field = new Field(FIELD_MARGIN, FIELD_START_Y, width-2*FIELD_MARGIN, width-2*FIELD_MARGIN, 
      500, this.controls.infPopInitSlider.value(), 
      QTREE_DEFAULT_CAPACITY)
    this.fields.push(field)
  
    this.sender = new Sender()
  }
}