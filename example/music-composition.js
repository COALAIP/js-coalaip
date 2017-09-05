'use strict'

const MusicComposition = require('../src/music').MusicComposition
const person = require('./person')

const composition = new MusicComposition()
composition.setName('November')
composition.addComposer(person)

// const composition = new MusicComposition()
// composition.withData({
//   name: 'November',
//   ...
// })
// composition.addComposer(person)

module.exports = composition
