/**
 * Random Walk with a Central Location
 */
class SimCentral extends Simulation {
  constructor(controls, chart) {
    super(controls, chart)
    this.id = SIM_CENTRAL
  }

  _reset() {
    Point.radius = CENTRAL_LOC_POINT_RADIUS

    this.fields = []
    const field = new Field(FIELD_MARGIN, FIELD_START_Y, width-2*FIELD_MARGIN, width-2*FIELD_MARGIN, 500, this.controls.infPopInitSlider.value(),
      QTREE_DEFAULT_CAPACITY)
    field.addRepulsionZone(new Circle(field.x+field.w/2, field.y+field.h/2, 32))
    this.fields.push(field)
  
    const central = new Field(field.x+field.w/2-CENTRAL_LOC_SIZE/2, field.y+field.h/2-CENTRAL_LOC_SIZE/2, CENTRAL_LOC_SIZE, CENTRAL_LOC_SIZE, 
      0, 0, 
      50, false)
    this.fields.push(central)
  
    this.sender = new CentralLocSender(this.fields)
  }
}