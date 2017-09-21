'use strict'

const {
  AbstractWork,
  CreativeWork,
  Manifestation,
  Organization,
  Party
} = require('./core')

const {
  SCHEMA,
  inherit,
  propArray,
  propValue
} = require('./util')

// MusicComposition

function MusicComposition () {
  AbstractWork.call(this, 'MusicComposition')
}

inherit(MusicComposition, AbstractWork)
propArray(MusicComposition, new Party(), 'composer')
propValue(MusicComposition, String(), 'iswcCode')
propArray(MusicComposition, new Party(), 'lyricist')

// MusicGroup

function MusicGroup () {
  Organization.call(this, 'MusicGroup')
}

inherit(MusicGroup, Organization)
propArray(MusicGroup, String(), 'genre')

// MusicPlaylist

function MusicPlaylist (type = 'MusicPlaylist') {
  CreativeWork.call(this, SCHEMA, type)
}

inherit(MusicPlaylist, CreativeWork)
propArray(MusicPlaylist, new MusicRecording(), 'track')

// MusicRecording

function MusicRecording () {
  Manifestation.call(this, 'MusicRecording')
}

inherit(MusicRecording, Manifestation)
propArray(MusicRecording, new MusicGroup(), 'byArtist')
propValue(MusicRecording, String(), 'isrcCode')
propValue(MusicRecording, new MusicComposition(), 'recordingOf')

// MusicAlbum

function MusicAlbum () {
  MusicPlaylist.call(this, 'MusicAlbum')
}

inherit(MusicAlbum, MusicPlaylist)
propValue(MusicAlbum, String(), 'albumProductionType')
propArray(MusicAlbum, new MusicGroup(), 'byArtist')

// MusicRelease

function MusicRelease () {
  MusicPlaylist.call(this, 'MusicRelease')
}

inherit(MusicRelease, MusicPlaylist)
propValue(MusicRelease, String(), 'catalogNumber')
propValue(MusicRelease, String(), 'musicReleaseFormat')
propArray(MusicRelease, new Party(), 'recordLabel')
propValue(MusicRelease, new MusicAlbum(), 'releaseOf')

module.exports = {
  MusicAlbum,
  MusicComposition,
  MusicGroup,
  MusicPlaylist,
  MusicRecording,
  MusicRelease
}
