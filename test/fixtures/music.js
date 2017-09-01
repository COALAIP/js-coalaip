'use strict'

const Base = require('../../src/base')
const core = require('../../src/core')

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

exports.MusicComposition = {
  context: COALAIP,
  type: 'MusicComposition',
  instance: new MusicComposition(),
  parents: [
    Base,
    core.Thing,
    core.CreativeWork
  ],
  add: {
    composer: new core.Party(),
    genre: 'slimecore',
    lyricist: new core.Party(),
    producer: new core.Party(),
    publisher: new core.Party()
  },
  set: {
    iswcCode: 'T-123.456.789-Z',
    name: 'musicComposition'
  }
}

exports.MusicGroup = {
  context: SCHEMA,
  type: 'MusicGroup',
  instance: new MusicGroup(),
  parents: [
    Base,
    core.Thing,
    core.Party,
    core.Organization
  ],
  add: {
    genre: 'ska',
    member: new core.Party()
  },
  set: {
    email: 'me@example.org',
    name: 'musicGroup'
  }
}

exports.MusicRecording = {
  context: SCHEMA,
  type: 'MusicRecording',
  instance: new MusicRecording(),
  parents: [
    Base,
    core.Thing,
    core.CreativeWork
  ],
  add: {
    byArtist: new MusicGroup(),
    genre: 'slimecore',
    producer: new core.Party(),
    publisher: new core.Party()
  },
  set: {
    isrcCode: '',
    name: 'musicRecording',
    recordingOf: new MusicComposition()
  }
}

exports.MusicPlaylist = {
  context: SCHEMA,
  type: 'MusicPlaylist',
  instance: new MusicPlaylist(),
  parents: [
    Base,
    core.Thing,
    core.CreativeWork
  ],
  add: {
    genre: 'slimecore',
    producer: new core.Party(),
    publisher: new core.Party(),
    track: new MusicRecording()
  },
  set: {
    name: 'musicPlaylist'
  }
}

exports.MusicAlbum = {
  context: SCHEMA,
  type: 'MusicAlbum',
  instance: new MusicAlbum(),
  parents: [
    Base,
    core.Thing,
    core.CreativeWork,
    MusicPlaylist
  ],
  add: {
    byArtist: new MusicGroup(),
    genre: 'slimecore',
    producer: new core.Party(),
    publisher: new core.Party(),
    track: new MusicRecording()
  },
  set: {
    albumProductionType: 'DemoAlbum',
    name: 'musicAlbum'
  }
}

exports.MusicRelease = {
  context: SCHEMA,
  type: 'MusicRelease',
  instance: new MusicRelease(),
  parents: [
    Base,
    core.Thing,
    core.CreativeWork,
    MusicPlaylist
  ],
  add: {
    genre: 'slimecore',
    producer: new core.Party(),
    publisher: new core.Party(),
    recordLabel: new core.Party(),
    track: new MusicRecording()
  },
  set: {
    catalogNumber: '12345',
    musicReleaseFormat: 'vinyl',
    name: 'musicRelease',
    releaseOf: new MusicAlbum()
  }
}
