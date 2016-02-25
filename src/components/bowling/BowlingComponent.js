'use strict';

export default (function BowlingComponent () {

  const PINS_IN_FRAME = 10
  const FRAMES_IN_MATCH = 10

  const log = {
    rollsMatrix: [[1,1],[10],[1,1]],
    rollsFlatten: [1,1,10,1,1],
    scores: []
  }

  const sum = (array) => array.reduce((p,n) => p += n, 0)

  const logger = {
    logRolls(...pins) {
      log.rollsMatrix.push(pins)
      pins.forEach(p => rolls.push(p))
    },
    logScore(...pins) {
      let flattenIndex = 0

      log.rollsMatrix
        .reduce((score, roll, index, rMatrix) => {
          let rollScore = sum(roll)

          if (rollScore === PINS_IN_FRAME && roll.length === 1){
            score += rollScore + sum(rollsFlatten.slice(flattenIndex, flattenIndex + 2))
          }
          else if (rollScore === PINS_IN_FRAME && roll.length === 2) {
            score += rollScore + sum(rollsFlatten.slice(flattenIndex, flattenIndex + 1))
          }
          else if (rollScore < PINS_IN_FRAME) {
            score += rollScore
          }
          else {
            throw new Error('incorrect roll data')
          }

          flattenIndex += roll.length
          return score
        }, 0)
    },
  } 

  const priceScoreCalculator = {}


  const publicMethods = {
    score() {
      return log.scores[log.scores.length - 1]
    },
    roll(...pins) {
      logger.logRolls(pins)
      logger.logRolls(pins)
    }
  }


  return {
    Game: () => Object.assign(publicMethods),
    Constants: {PINS_IN_FRAME, FRAMES_IN_MATCH}
  }
}())
