const Base = require('./base')

const {
  COALAIP,
  SCHEMA,
  adder,
  dateToString,
  inherit,
  setter
} = require('./util')

// Thing

function Thing (context, type) {
  context = context || SCHEMA
  type = type || 'Thing'
  Base.call(this, context, type)
}

inherit(Thing, Base)
setter(Thing, new AudioObject(), 'audio')
setter(Thing, new ImageObject(), 'image')
setter(Thing, String(), 'name')
setter(Thing, new VideoObject(), 'video')

// CreativeWork

function CreativeWork (context, type) {
  context = context || SCHEMA
  type = type || 'CreativeWork'
  Thing.call(this, context, type)
}

inherit(CreativeWork, Thing)
setter(CreativeWork, String(), 'genre')
adder(CreativeWork, new Party(), 'producer')
adder(CreativeWork, new Party(), 'publisher')

// Intangible

function Intangible (context, type) {
  context = context || SCHEMA
  type = type || 'Intangible'
  Thing.call(this, context, type)
}

inherit(Intangible, Thing)

// Party

function Party (context, type) {
  context = context || COALAIP
  type = type || 'Party'
  Thing.call(this, context, type)
}

inherit(Party, Thing)
setter(Party, String(), 'email')

// Place

function Place () {
  Thing.call(this, SCHEMA, 'Place')
}

inherit(Place, Thing)

// AbstractWork

function AbstractWork (type) {
  type = type || 'AbstractWork'
  CreativeWork.call(this, COALAIP, type)
}

inherit(AbstractWork, CreativeWork)

// Copyright

function Copyright () {
  Intangible.call(this, COALAIP, 'Copyright')
}

inherit(Copyright, Intangible)
setter(Copyright, new CreativeWork(), 'rightsOf')
setter(Copyright, new Place(), 'territory')
setter(Copyright, new Date(), 'validFrom', dateToString)
setter(Copyright, new Date(), 'validThrough', dateToString)

// Manifestation

// function Manifestation (type) {
//   CreativeWork.call(this, COALAIP, type)
// }

// inherit(Manifestation, CreativeWork)
// setter(Manifestation, AbstractWork, 'manifestationOfWork')

// MediaObject

function MediaObject (type) {
  type = type || 'MediaObject'
  CreativeWork.call(this, SCHEMA, type)
}

inherit(MediaObject, CreativeWork)
setter(MediaObject, String(), 'contentUrl')
setter(MediaObject, String(), 'encodingFormat')

// Organization

function Organization (type) {
  type = type || 'Organization'
  Party.call(this, SCHEMA, type)
}

inherit(Organization, Party)

adder(Organization, new Party(), 'member')

// Person

function Person () {
  Party.call(this, SCHEMA, 'Person')
}

inherit(Person, Party)
setter(Person, String(), 'familyName')
setter(Person, String(), 'givenName')

// Right

function Right () {
  Intangible.call(this, COALAIP, 'Right')
}

inherit(Right, Intangible)
setter(Right, new CreativeWork(), 'license')
setter(Right, Number(), 'percentageShares')
setter(Right, new Copyright(), 'source')
setter(Right, new Place(), 'territory')
setter(Right, new Date(), 'validFrom', dateToString)
setter(Right, new Date(), 'validThrough', dateToString)

// AudioObject

function AudioObject () {
  MediaObject.call(this, 'AudioObject')
}

inherit(AudioObject, MediaObject)
setter(AudioObject, String(), 'duration')

// ImageObject

function ImageObject () {
  MediaObject.call(this, 'ImageObject')
}

inherit(ImageObject, MediaObject)
setter(ImageObject, String(), 'caption')

// VideoObject

function VideoObject () {
  MediaObject.call(this, 'VideoObject')
}

inherit(VideoObject, MediaObject)

module.exports = {
  Thing,
  CreativeWork,
  Intangible,
  Party,
  Place,
  AbstractWork,
  Copyright,
  MediaObject,
  Organization,
  Person,
  Right,
  AudioObject,
  ImageObject,
  VideoObject
}
