'use strict'

const SCHEMA = require('../../../src/util').SCHEMA
const Base = require('../../../src/base')
const Thing = require('../../../src/core').Thing

module.exports = {
  context: SCHEMA,
  type: 'Thing',
  instance: new Thing(),
  parents: [
    Base
  ],
  set: {
    name: 'thing'
  }
}
