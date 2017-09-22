'use strict'

const Base = require('../../src/base')
const core = require('../../src/core')
const newPath = require('./new-path')

const {
  COALAIP,
  SCHEMA
} = require('../../src/util')

const {
  MusicAlbum,
  MusicComposition,
  MusicGroup,
  MusicPlaylist,
  MusicRecording,
  MusicRelease
} = require('../../src/music')

const party = new core.Party()
party.path = newPath('party')

const musicComposition = new MusicComposition()
musicComposition.path = newPath('musicComposition')

const musicGroup = new MusicGroup()
musicGroup.path = newPath('musicGroup')

const musicRecording = new MusicRecording()
musicRecording.path = newPath('musicRecording')

const musicPlaylist = new MusicPlaylist()
musicPlaylist.path = newPath('musicPlaylist')

const musicAlbum = new MusicAlbum()
musicAlbum.path = newPath('musicAlbum')

const musicRelease = new MusicRelease()
musicRelease.path = newPath('musicRelease')

exports.MusicComposition = {
  context: COALAIP,
  type: 'MusicComposition',
  instance: musicComposition,
  parents: [
    Base,
    core.Thing,
    core.CreativeWork
  ],
  add: {
    composer: party,
    genre: 'slimecore',
    lyricist: party,
    producer: party,
    publisher: party
  },
  set: {
    iswcCode: 'T-123.456.789-Z',
    name: 'musicComposition'
  }
}

exports.MusicGroup = {
  context: COALAIP,
  type: 'MusicGroup',
  instance: musicGroup,
  parents: [
    Base,
    core.Thing,
    core.Party,
    core.Organization
  ],
  add: {
    genre: 'ska',
    member: party
  },
  set: {
    email: 'me@example.org',
    name: 'musicGroup'
  }
}

exports.MusicRecording = {
  context: COALAIP,
  type: 'MusicRecording',
  instance: musicRecording,
  parents: [
    Base,
    core.Thing,
    core.CreativeWork,
    core.Manifestation
  ],
  add: {
    byArtist: musicGroup,
    genre: 'slimecore',
    producer: party,
    publisher: party
  },
  set: {
    isrcCode: '',
    name: 'musicRecording',
    recordingOf: musicComposition
  }
}

exports.MusicPlaylist = {
  context: SCHEMA,
  type: 'MusicPlaylist',
  instance: musicPlaylist,
  parents: [
    Base,
    core.Thing,
    core.CreativeWork
  ],
  add: {
    genre: 'slimecore',
    producer: party,
    publisher: party,
    track: musicRecording
  },
  set: {
    name: 'musicPlaylist'
  }
}

exports.MusicAlbum = {
  context: SCHEMA,
  type: 'MusicAlbum',
  instance: musicAlbum,
  parents: [
    Base,
    core.Thing,
    core.CreativeWork,
    MusicPlaylist
  ],
  add: {
    byArtist: musicGroup,
    genre: 'slimecore',
    producer: party,
    publisher: party,
    track: musicRecording
  },
  set: {
    albumProductionType: 'DemoAlbum',
    name: 'musicAlbum'
  }
}

exports.MusicRelease = {
  context: SCHEMA,
  type: 'MusicRelease',
  instance: musicRelease,
  parents: [
    Base,
    core.Thing,
    core.CreativeWork,
    MusicPlaylist
  ],
  add: {
    genre: 'slimecore',
    producer: party,
    publisher: party,
    recordLabel: party,
    track: musicRecording
  },
  set: {
    catalogNumber: '12345',
    musicReleaseFormat: 'vinyl',
    name: 'musicRelease',
    releaseOf: musicAlbum
  }
}
