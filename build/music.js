'use strict';

var _require = require('./core'),
    AbstractWork = _require.AbstractWork,
    CreativeWork = _require.CreativeWork,
    Manifestation = _require.Manifestation,
    Organization = _require.Organization,
    Party = _require.Party;

var _require2 = require('./util'),
    SCHEMA = _require2.SCHEMA,
    inherit = _require2.inherit,
    propArray = _require2.propArray,
    propValue = _require2.propValue;

// MusicComposition

function MusicComposition() {
  AbstractWork.call(this, 'MusicComposition');
}

inherit(MusicComposition, AbstractWork);
propArray(MusicComposition, new Party(), 'composer');
propValue(MusicComposition, String(), 'iswcCode');
propArray(MusicComposition, new Party(), 'lyricist');

// MusicGroup

function MusicGroup() {
  Organization.call(this, 'MusicGroup');
}

inherit(MusicGroup, Organization);
propArray(MusicGroup, String(), 'genre');

// MusicPlaylist

function MusicPlaylist() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'MusicPlaylist';

  CreativeWork.call(this, SCHEMA, type);
}

inherit(MusicPlaylist, CreativeWork);
propArray(MusicPlaylist, new MusicRecording(), 'track');

// MusicRecording

function MusicRecording() {
  Manifestation.call(this, 'MusicRecording');
}

inherit(MusicRecording, Manifestation);
propArray(MusicRecording, new MusicGroup(), 'byArtist');
propValue(MusicRecording, String(), 'isrcCode');
propValue(MusicRecording, new MusicComposition(), 'recordingOf');

// MusicAlbum

function MusicAlbum() {
  MusicPlaylist.call(this, 'MusicAlbum');
}

inherit(MusicAlbum, MusicPlaylist);
propValue(MusicAlbum, String(), 'albumProductionType');
propArray(MusicAlbum, new MusicGroup(), 'byArtist');

// MusicRelease

function MusicRelease() {
  MusicPlaylist.call(this, 'MusicRelease');
}

inherit(MusicRelease, MusicPlaylist);
propValue(MusicRelease, String(), 'catalogNumber');
propValue(MusicRelease, String(), 'musicReleaseFormat');
propArray(MusicRelease, new Party(), 'recordLabel');
propValue(MusicRelease, new MusicAlbum(), 'releaseOf');

module.exports = {
  MusicAlbum: MusicAlbum,
  MusicComposition: MusicComposition,
  MusicGroup: MusicGroup,
  MusicPlaylist: MusicPlaylist,
  MusicRecording: MusicRecording,
  MusicRelease: MusicRelease
};