const Utils = {
  /**
   * Returns true if n is a number
   * https://stackoverflow.com/questions/1303646/check-whether-variable-is-number-or-string-in-javascript
   */
  isNumber: n => !isNaN(parseFloat(n)) && !isNaN(n - 0),

  /**
   * Returns an Array of numbers 0 -> (n-1)
   */
  range: n => Array(n).fill().map((_, i) => i),

  /**
   * Get a random int between min (inclusive) and max (exclusive)
   */
  randomInt: (min, max) => floor(random(min, max)),

  /**
   * Get a random element from an array
   */
  pickRandom: arr => arr[Utils.randomInt(0, arr.length)],

  /**
   * Get distance between two points
   */
  dist: (x1, y1, x2, y2) => Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)),
}