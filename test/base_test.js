'use strict'

const base = require('./fixtures/base')
const describe = require('mocha').describe

const tests = Object.keys(base)

describe('Base', () => {
  tests.map(test => {
    base[test]()
  })
})
