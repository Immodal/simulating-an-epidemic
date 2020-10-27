const COLOR_LIGHT_GRAY = "#DCDCDC"
const COLOR_MED_GRAY = "#606060"
const COLOR_TEAL = "#008080"
const COLOR_DIM_YELLOW = "#ffc40c"
const COLOR_ORANGE_RED = "#FF4500"

const CANVAS_W = 600
const CANVAS_H = 750

const SIM_BASIC = 0
const SIM_CENTRAL = 1
const SIM_COMMUNITIES = 2

const QTREE_DEFAULT_CAPACITY = 10

const TEXT_SIZE_CHOOSE_A_SIM = 25
const TEXT_Y_CHOOSE_A_SIM = 10 + TEXT_SIZE_CHOOSE_A_SIM/2
const BTN_Y = TEXT_Y_CHOOSE_A_SIM + 25
const BTN_HORIZONTAL_SPACING = 2
const BTN_W_SPACE = CANVAS_W/5
const BTN_W = BTN_W_SPACE - 2*BTN_HORIZONTAL_SPACING
const BTN_H = 50

const TEXT_SIZE_R = 15
const TEXT_Y_R = BTN_Y + BTN_H + 10 + TEXT_SIZE_R/2

const FIELD_MARGIN = 10
const FIELD_START_Y = TEXT_Y_R + TEXT_SIZE_R/2 + FIELD_MARGIN

const SIM_COMPLETE_THRESH = 3
const SIM_SPEED_DEFAULT = 1
const DAY_LENGTH = 30

const POPULATION_SIZE_MIN = 50
const POPULATION_SIZE_DEFAULT = 500
const POPULATION_SIZE_MAX = 1000
const POPULATION_SIZE_STEP = 50

const SOCIAL_DISTANCE_STRENGTH_DEFAULT = 5
const SOCIAL_DISTANCE_FACTOR_MIN = 0
const SOCIAL_DISTANCE_FACTOR_DEFAULT = 0
const SOCIAL_DISTANCE_FACTOR_MAX = 1
const SOCIAL_DISTANCE_FACTOR_STEP = 0.01

const SOCIAL_DISTANCE_IGNORE_MIN = 0
const SOCIAL_DISTANCE_IGNORE_DEFAULT = 0
const SOCIAL_DISTANCE_IGNORE_MAX = 100
const SOCIAL_DISTANCE_IGNORE_STEP = 5

const INFECTION_INTERVAL_DEFAULT = DAY_LENGTH
const INFECTION_CHANCE_MIN = 0
const INFECTION_CHANCE_MAX = 1
const INFECTION_CHANCE_DEFAULT = 0.2
const INFECTION_CHANCE_STEP = 0.01

const POINT_RADIUS_DEFAULT = 4
const INFECTION_RADIUS_MIN = POINT_RADIUS_DEFAULT
const INFECTION_RADIUS_DEFAULT = 16
const INFECTION_RADIUS_MAX = 40
const INFECTION_RADIUS_STEP = 1

const INFECTION_INITIAL_PROPORTION_MIN = 0
const INFECTION_INITIAL_PROPORTION_DEFAULT = 0.02
const INFECTION_INITIAL_PROPORTION_MAX = 1
const INFECTION_INITIAL_PROPORTION_STEP = 0.01

const INFECTIOUS1_DURATION_MIN = 0
const INFECTIOUS1_DURATION_DEFAULT = 4
const INFECTIOUS1_DURATION_MAX = 30
const INFECTIOUS1_DURATION_STEP = 1

const INFECTIOUS2_DURATION_MIN = 0
const INFECTIOUS2_DURATION_DEFAULT = 10
const INFECTIOUS2_DURATION_MAX = 30
const INFECTIOUS2_DURATION_STEP = 1

// Simple
const SIMPLE_MORE_INTERACTIONS_INFECTION_RADIUS = INFECTION_RADIUS_DEFAULT*2

// Central Location
const CENTRAL_LOC_SIZE = 16
const CENTRAL_LOC_CAPACITY = 40
const CENTRAL_LOC_POINT_RADIUS = POINT_RADIUS_DEFAULT
const CENTRAL_LOC_INFECTION_RADIUS = INFECTION_RADIUS_DEFAULT

const CENTRAL_LOC_LEAVE_INTERVAL_MIN = 0
const CENTRAL_LOC_LEAVE_INTERVAL_DEFAULT = 1
const CENTRAL_LOC_LEAVE_INTERVAL_MAX = 51
const CENTRAL_LOC_LEAVE_INTERVAL_STEP = 1

const CENTRAL_LOC_VISIT_INTERVAL_MIN = 0
const CENTRAL_LOC_VISIT_INTERVAL_DEFAULT = 1
const CENTRAL_LOC_VISIT_INTERVAL_MAX = 51
const CENTRAL_LOC_VISIT_INTERVAL_STEP = 1

// Communities
const COMMUNITIES_POINT_RADIUS = 3
const COMMUNITIES_INFECTION_RADIUS = 12

const COMMUNITY_SIZE_MIN = 10
const COMMUNITY_SIZE_DEFAULT = 50
const COMMUNITY_SIZE_MAX = 100
const COMMUNITY_SIZE_STEP = 10

const COMMUNITIES_CROSSING_INTERVAL_MIN = 0
const COMMUNITIES_CROSSING_INTERVAL_DEFAULT = 1
const COMMUNITIES_CROSSING_INTERVAL_MAX = 51
const COMMUNITIES_CROSSING_INTERVAL_STEP = 1
