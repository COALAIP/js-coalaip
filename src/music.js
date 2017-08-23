'use strict'

const {
  AbstractWork,
  CreativeWork,
  Organization,
  Party
} = require('./core')

const {
  SCHEMA,
  adder,
  inherit,
  setter
} = require('./util')

// MusicComposition

function MusicComposition () {
  AbstractWork.call(this, 'MusicComposition')
}

inherit(MusicComposition, AbstractWork)
adder(MusicComposition, new Party(), 'composer')
setter(MusicComposition, String(), 'iswcCode')
adder(MusicComposition, new Party(), 'lyricist')

// MusicGroup

function MusicGroup () {
  Organization.call(this, 'MusicGroup')
}

inherit(MusicGroup, Organization)
setter(MusicGroup, String(), 'genre')

// MusicPlaylist

function MusicPlaylist (type) {
  type = type || 'MusicPlaylist'
  CreativeWork.call(this, SCHEMA, type)
}

inherit(MusicPlaylist, CreativeWork)
adder(MusicPlaylist, new MusicRecording(), 'track')

// MusicRecording

function MusicRecording () {
  CreativeWork.call(this, SCHEMA, 'MusicRecording')
}

inherit(MusicRecording, CreativeWork)
adder(MusicRecording, new MusicGroup(), 'byArtist')
setter(MusicRecording, String(), 'isrcCode')
setter(MusicRecording, new MusicComposition(), 'recordingOf')

// MusicAlbum

function MusicAlbum () {
  MusicPlaylist.call(this, 'MusicAlbum')
}

inherit(MusicAlbum, MusicPlaylist)
setter(MusicAlbum, String(), 'albumProductionType')
adder(MusicAlbum, new Party(), 'byArtist')

// MusicRelease

function MusicRelease () {
  MusicPlaylist.call(this, 'MusicRelease')
}

inherit(MusicRelease, MusicPlaylist)
setter(MusicRelease, String(), 'catalogNumber')
setter(MusicRelease, String(), 'musicReleaseFormat')
adder(MusicRelease, new Party(), 'recordLabel')
setter(MusicRelease, new MusicAlbum(), 'releaseOf')

module.exports = {
  MusicAlbum,
  MusicComposition,
  MusicGroup,
  MusicPlaylist,
  MusicRecording,
  MusicRelease
}
