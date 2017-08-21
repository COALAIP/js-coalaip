'use strict'

const COALAIP = require('../../../src/util').COALAIP
const Base = require('../../../src/base')

const {
  Party,
  Thing
} = require('../../../src/core')

module.exports = {
  context: COALAIP,
  type: 'Party',
  instance: new Party(),
  parents: [
    Base,
    Thing
  ],
  set: {
    email: 'me@example.org',
    name: 'party'
  }
}
