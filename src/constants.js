const COLOR_LIGHT_GRAY = "#DCDCDC"
const COLOR_MED_GRAY = "#606060"
const COLOR_TEAL = "#008080"
const COLOR_DARK_BLUE = "#33338B"
const COLOR_DIM_YELLOW = "#ffc40c"
const COLOR_ORANGE_RED = "#FF4500"
const COLOR_WHITE = "#ffffff"
const COLOR_BLACK = "#000000"

const SIM_BTN_STATE_ON_CLASS = "simBtnOn"
const SIM_BTN_STATE_OFF_CLASS = "simBtnOff"

const CANVAS_W = 600
const CANVAS_H = 725

const SIM_BASIC = 0
const SIM_CENTRAL = 1
const SIM_COMMUNITIES = 2

const QTREE_DEFAULT_CAPACITY = 10

const RESET_BTN_H = 20
const RESET_BTN_W = 70

const FIELD_MARGIN = 10
const FIELD_START_Y = RESET_BTN_H + FIELD_MARGIN

const TEXT_SIZE_R = 15
const TEXT_Y_R = FIELD_MARGIN + 2
const TEXT_X_R = FIELD_MARGIN + RESET_BTN_W + 10
const TEXT_X_R_MAX = TEXT_X_R + 75
const TEXT_X_QUARANTINED = TEXT_X_R_MAX + 100

const TEXT_X_TOTALS = FIELD_MARGIN + (CANVAS_W - 2*FIELD_MARGIN)/4 - 20
const TEXT_Y_TOTALS = FIELD_START_Y + CANVAS_H/4
const TEXT_SIZE_TOTALS = 20
const RECT_X_TOTALS = TEXT_X_TOTALS-15
const RECT_Y_TOTALS = TEXT_Y_TOTALS-15
const RECT_W_TOTALS = 375
const RECT_H_TOTALS = 190
const RECT_RADIUS_TOTALS = 15

const SIM_COMPLETE_THRESH = 1
const DAY_LENGTH = 30

const SIM_SPEED_MIN = 1
const SIM_SPEED_DEFAULT = 2
const SIM_SPEED_MAX = 10
const SIM_SPEED_STEP = 1

const POPULATION_SIZE_MIN = 50
const POPULATION_SIZE_DEFAULT = 600
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

const QUARANTINE_SIZE = 32
const QUARANTINE_WITH_SYMPTOMS_DEFAULT = true
const QUARANTINE_WITH_SYMPTOMS_DELAY_MIN = 0
const QUARANTINE_WITH_SYMPTOMS_DELAY_DEFAULT = 3
const QUARANTINE_WITH_SYMPTOMS_DELAY_MAX = 30
const QUARANTINE_WITH_SYMPTOMS_DELAY_STEP = 1

const TEST_PROP_MIN = 0
const TEST_PROP_DEFAULT = 1
const TEST_PROP_MAX = 100
const TEST_PROP_STEP = 1

const HOSPITAL_RESOURCES_MIN = 0
const HOSPITAL_RESOURCES_DEFAULT = 100
const HOSPITAL_RESOURCES_MAX = 1000
const HOSPITAL_RESOURCES_STEP = 10

const INFECTION_UNTREATED_DEATH_RATE_MIN = 0
const INFECTION_UNTREATED_DEATH_RATE_DEFAULT = 0.03
const INFECTION_UNTREATED_DEATH_RATE_MAX = 1
const INFECTION_UNTREATED_DEATH_RATE_STEP = 0.01

const INFECTION_INTERVAL_DEFAULT = DAY_LENGTH
const INFECTION_CHANCE_MIN = 0
const INFECTION_CHANCE_MAX = 1
const INFECTION_CHANCE_DEFAULT = 0.2
const INFECTION_CHANCE_STEP = 0.01

const POINT_RADIUS_DEFAULT = 4
const INFECTION_RADIUS_MIN = POINT_RADIUS_DEFAULT
const INFECTION_RADIUS_DEFAULT = 20
const INFECTION_RADIUS_MAX = 40
const INFECTION_RADIUS_STEP = 1

const INFECTION_INITIAL_PROPORTION_MIN = 0
const INFECTION_INITIAL_PROPORTION_DEFAULT = 0.02
const INFECTION_INITIAL_PROPORTION_MAX = 1
const INFECTION_INITIAL_PROPORTION_STEP = 0.01

const INFECTIOUS1_DURATION_MIN = 0
const INFECTIOUS1_DURATION_DEFAULT = 5
const INFECTIOUS1_DURATION_MAX = 30
const INFECTIOUS1_DURATION_STEP = 1

const INFECTIOUS2_DURATION_MIN = 0
const INFECTIOUS2_DURATION_DEFAULT = 9
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
const CENTRAL_LOC_LEAVE_INTERVAL_DEFAULT = 2
const CENTRAL_LOC_LEAVE_INTERVAL_MAX = 51
const CENTRAL_LOC_LEAVE_INTERVAL_STEP = 1

const CENTRAL_LOC_VISIT_INTERVAL_MIN = 0
const CENTRAL_LOC_VISIT_INTERVAL_DEFAULT = 1
const CENTRAL_LOC_VISIT_INTERVAL_MAX = 51
const CENTRAL_LOC_VISIT_INTERVAL_STEP = 1

// Communities
const COMMUNITIES_POINT_RADIUS = 3
const COMMUNITIES_INFECTION_RADIUS = 16

const COMMUNITY_SIZE_MIN = 10
const COMMUNITY_SIZE_DEFAULT = 50
const COMMUNITY_SIZE_MAX = 100
const COMMUNITY_SIZE_STEP = 10

const COMMUNITIES_CROSSING_INTERVAL_MIN = 0
const COMMUNITIES_CROSSING_INTERVAL_DEFAULT = 1
const COMMUNITIES_CROSSING_INTERVAL_MAX = 51
const COMMUNITIES_CROSSING_INTERVAL_STEP = 1
