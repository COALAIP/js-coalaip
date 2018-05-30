'use strict'

const MusicGroup = require('../lib/music').MusicGroup
const person = require('./person')

const musicGroup = new MusicGroup()
musicGroup.setName('Mouse Rat')
musicGroup.addMember(person)
musicGroup.path = '<musicGroup path>'

// const musicGroup = new MusicGroup()
// musicGroup.withData({
//   name: 'Mouse Rat',
//   ...
// })
// musicGroup.addMember(person)

module.exports = musicGroup
