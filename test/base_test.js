'use strict'

const expect = require('chai').expect
const Base = require('../src/base')
const sort = require('../src/util').sort

const {
  describe,
  it
} = require('mocha')

const {
  configureInstances,
  validateSubInstances
} = require('./fixtures/base')

describe('Base', () => {
  it('configures instances', () => {
    configureInstances()
  })
  it('validates sub-instances', () => {
    validateSubInstances()
  })
  it('validates tree', () => {
    // ...
  })
  it('validates data', () => {
    // ...
  })
  it('checks comparisons', () => {
    // ...
  })
})
