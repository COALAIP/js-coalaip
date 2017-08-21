'use strict'

const expect = require('chai').expect
const core = require('./fixtures/core')

const Thing = require('./fixtures/core/Thing')
const CreativeWork = require('./fixtures/core/CreativeWork')
const Intangible = require('./fixtures/core/Intangible')
const Party = require('./fixtures/core/Party')
const Place = require('./fixtures/core/Place')

const {
  describe,
  it
} = require('mocha')

describe('Thing', () => {
  core.checkContextAndType(Thing)
  core.checkInheritance(Thing)
  core.setValues(Thing)
})

describe('CreativeWork', () => {
  core.checkContextAndType(CreativeWork)
  core.checkInheritance(CreativeWork)
  core.addValues(CreativeWork)
  core.setValues(CreativeWork)
})

describe('Intangible', () => {
  core.checkContextAndType(Intangible)
  core.checkInheritance(Intangible)
  core.setValues(Intangible)
})

describe('Party', () => {
  core.checkContextAndType(Party)
  core.checkInheritance(Party)
  core.setValues(Party)
})

describe('Place', () => {
  core.checkContextAndType(Place)
  core.checkInheritance(Place)
  core.setValues(Place)
})

// ...
