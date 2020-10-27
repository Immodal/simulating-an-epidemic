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
    const field = new Field(FIELD_MARGIN, FIELD_START_Y, width-2*FIELD_MARGIN, width-2*FIELD_MARGIN, 
      this.controls.popSizeSlider.value(), this.controls.infPopInitSlider.value(),
      QTREE_DEFAULT_CAPACITY)
    field.addRepulsionZone(new Circle(field.x+field.w/2, field.y+field.h/2, 32))
    this.fields.push(field)
  
    const central = new Field(field.x+field.w/2-CENTRAL_LOC_SIZE/2, field.y+field.h/2-CENTRAL_LOC_SIZE/2, CENTRAL_LOC_SIZE, CENTRAL_LOC_SIZE, 
      0, 0, 
      QTREE_DEFAULT_CAPACITY)
    this.fields.push(central)

    field.addRepulsionZone(new Circle(field.x+field.w, field.y+field.h, QUARANTINE_SIZE*2))
    const quarantine = new Field(field.x+field.w-QUARANTINE_SIZE, field.y+field.h-QUARANTINE_SIZE, QUARANTINE_SIZE, QUARANTINE_SIZE, 
      0, 0, 
      QTREE_DEFAULT_CAPACITY)
    this.fields.push(quarantine)
  
    this.sender = new CentralLocSender(this.fields, this.controls)
  }
}