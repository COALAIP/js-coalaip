'use strict'

const describe = require('mocha').describe
const music = require('./fixtures/music')
const test = require('./fixtures/test')

const types = Object.keys(music)

describe('Music', () => {
  types.forEach(type => {
    test(music[type])
  })
})
