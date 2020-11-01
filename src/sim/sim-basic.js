/**
 * Basic Random Walk Sim
 */
class SimBasic extends Simulation {
  constructor(controls, chart, fullReset=false) {
    super(controls, chart, fullReset)
  }

  _reset() {
    this.id = SIM_BASIC
    Point.radius = POINT_RADIUS_DEFAULT

    this.fields = []
    const field = new Field(FIELD_MARGIN, FIELD_START_Y, width-2*FIELD_MARGIN, width-2*FIELD_MARGIN, 
      this.controls.popSizeSlider.value(), this.controls.infPopInitSlider.value(), this.controls.vaccinationSlider.value()/100,
      QTREE_DEFAULT_CAPACITY)
    this.fields.push(field)

    field.addRepulsionZone(new Circle(field.x+field.w, field.y+field.h, QUARANTINE_SIZE*2))
    const quarantine = new Field(field.x+field.w-QUARANTINE_SIZE, field.y+field.h-QUARANTINE_SIZE, QUARANTINE_SIZE, QUARANTINE_SIZE, 
      0, 0, this.controls.vaccinationSlider.value()/100,
      QTREE_DEFAULT_CAPACITY, true)
    this.fields.push(quarantine)

    this.sender = new SimpleSender(this.fields, this.controls)
  }
}