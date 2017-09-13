'use strict'

const describe = require('mocha').describe
const core = require('./fixtures/core')
const test = require('./fixtures/test')

const types = Object.keys(core)

describe('Core', () => {
  types.forEach(type => {
    test(core[type])
  })
})
