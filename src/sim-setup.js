/**
 * Higher order function that returns a function that:
 * Resets all variables related to all simulations and call setup for a specific one.
 * @param {Function} callback Simulation specific setup
 */
function startSim(callback) {
  return () => {
    globalUpdateCount=0
    lastRUpdate=0
    RMax = 0
    fields = []
    btns.forEach(b => b.state = false)
  
    callback()

    resetControls()
    updateR()
    resetChart()
  }
}

/**
 * Basic Random Walk Sim
 */
function setBasicSim() {
  simNum = SIM_BASIC
  
  Point.radius = POINT_RADIUS_DEFAULT
  const field = new Field(FIELD_MARGIN, FIELD_START_Y, width-2*FIELD_MARGIN, width-2*FIELD_MARGIN, 
    500, 0.01, 
    QTREE_DEFAULT_CAPACITY)
  fields.push(field)

  sender = new Sender()
  simpleBtn.state = true
}

/**
 * Random Walk with a Central Location
 */
function setCentralLocSim() {
  simNum = SIM_CENTRAL

  Point.radius = CENTRAL_LOC_POINT_RADIUS
  const field = new Field(FIELD_MARGIN, FIELD_START_Y, width-2*FIELD_MARGIN, width-2*FIELD_MARGIN, 500, 0.01,
    QTREE_DEFAULT_CAPACITY)
  field.addRepulsionZone(new Circle(field.x+field.w/2, field.y+field.h/2, 32))
  fields.push(field)

  const central = new Field(field.x+field.w/2-CENTRAL_LOC_SIZE/2, field.y+field.h/2-CENTRAL_LOC_SIZE/2, CENTRAL_LOC_SIZE, CENTRAL_LOC_SIZE, 
    0, 0, 
    50, false)
  fields.push(central)

  sender = new CentralLocSender(fields)
  centralLocBtn.state = true
}

/**
 * Multiple isolated communities
 */
function setCommunitiesSim() {
  simNum = SIM_COMMUNITIES

  Point.radius = COMMUNITIES_POINT_RADIUS
  let fy = FIELD_START_Y
  const fieldSpace = width-2*FIELD_MARGIN
  const fieldSubmargin = 10
  const fieldW = (fieldSpace-fieldSubmargin*4)/4
  let fx0 = FIELD_MARGIN
  let fx1 = fx0 + fieldW + fieldSubmargin
  let fx2 = fx1 + fieldW + fieldSubmargin
  let fx3 = fx2 + fieldW + fieldSubmargin

  for(let i=0; i<4; i++) {
    fy += i>0 ? (fieldW + fieldSubmargin) : 0
    const field0 = new Field(fx0, fy, fieldW, fieldW, 50, 0.01, QTREE_DEFAULT_CAPACITY)
    fields.push(field0)
    const field1 = new Field(fx1, fy, fieldW, fieldW, 50, 0.01, QTREE_DEFAULT_CAPACITY)
    fields.push(field1)
    const field2 = new Field(fx2, fy, fieldW, fieldW, 50, 0.01, QTREE_DEFAULT_CAPACITY)
    fields.push(field2)
    const field3 = new Field(fx3, fy, fieldW, fieldW, 50, 0.01, QTREE_DEFAULT_CAPACITY)
    fields.push(field3)
  }

  sender = new CommunitiesSender(fields)
  commuBtn.state = true
}