'use strict'

const SCHEMA = require('../../../src/util').SCHEMA
const Base = require('../../../src/base')

const {
  Place,
  Thing
} = require('../../../src/core')

module.exports = {
  context: SCHEMA,
  type: 'Place',
  instance: new Place(),
  parents: [
    Base,
    Thing
  ],
  set: {
    name: 'place'
  }
}
