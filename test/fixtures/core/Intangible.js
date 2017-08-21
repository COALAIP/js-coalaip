'use strict'

const SCHEMA = require('../../../src/util').SCHEMA
const Base = require('../../../src/base')

const {
  Intangible,
  Thing
} = require('../../../src/core')

module.exports = {
  context: SCHEMA,
  type: 'Intangible',
  instance: new Intangible(),
  parents: [
    Base,
    Thing
  ],
  set: {
    name: 'intangible'
  }
}
