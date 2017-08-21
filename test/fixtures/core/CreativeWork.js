'use strict'

const SCHEMA = require('../../../src/util').SCHEMA
const Base = require('../../../src/base')

const {
  CreativeWork,
  Party,
  Thing
} = require('../../../src/core')

module.exports = {
  context: SCHEMA,
  type: 'CreativeWork',
  instance: new CreativeWork(),
  parents: [
    Base,
    Thing
  ],
  add: {
    producer: new Party(),
    publisher: new Party()
  },
  set: {
    genre: 'slimecore',
    name: 'creativeWork'
  }
}
