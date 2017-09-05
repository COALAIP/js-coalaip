const Base = require('./base')

const {
  COALAIP,
  SCHEMA,
  inherit,
  propArray,
  propValue
} = require('./util')

// Thing

function Thing (context, type) {
  context = context || SCHEMA
  type = type || 'Thing'
  Base.call(this, context, type)
}

inherit(Thing, Base)
propArray(Thing, new AudioObject(), 'audio')
propValue(Thing, String(), 'description')
propArray(Thing, new ImageObject(), 'image')
propValue(Thing, String(), 'name')
propArray(Thing, new VideoObject(), 'video')

// Action

function Action (context, type) {
  context = context || SCHEMA
  type = type || 'Action'
  Thing.call(this, context, type)
}

inherit(Action, Thing)
propValue(Action, String(), 'error')

// CreativeWork

function CreativeWork (context, type) {
  context = context || SCHEMA
  type = type || 'CreativeWork'
  Thing.call(this, context, type)
}

inherit(CreativeWork, Thing)
propArray(CreativeWork, String(), 'genre')
propArray(CreativeWork, new Party(), 'producer')
propArray(CreativeWork, new Party(), 'publisher')

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
propValue(Party, String(), 'email')

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

// AssessAction

function AssessAction (context, type) {
  context = context || SCHEMA
  type = type || 'AssessAction'
  Action.call(this, context, type)
}

inherit(AssessAction, Action)

// Copyright

function Copyright () {
  Intangible.call(this, COALAIP, 'Copyright')
}

inherit(Copyright, Intangible)
propValue(Copyright, new CreativeWork(), 'rightsOf')
propValue(Copyright, new Place(), 'territory')
propValue(Copyright, String(), 'validFrom')
propValue(Copyright, String(), 'validThrough')

// Manifestation

// function Manifestation (type) {
//   CreativeWork.call(this, COALAIP, type)
// }

// inherit(Manifestation, CreativeWork)
// propValue(Manifestation, AbstractWork, 'manifestationOfWork')

// MediaObject

function MediaObject (type) {
  type = type || 'MediaObject'
  CreativeWork.call(this, SCHEMA, type)
}

inherit(MediaObject, CreativeWork)
propValue(MediaObject, String(), 'contentUrl')
propValue(MediaObject, String(), 'encodingFormat')

// Organization

function Organization (type) {
  type = type || 'Organization'
  Party.call(this, SCHEMA, type)
}

inherit(Organization, Party)

propArray(Organization, new Party(), 'member')

// Person

function Person () {
  Party.call(this, SCHEMA, 'Person')
}

inherit(Person, Party)
propValue(Person, String(), 'familyName')
propValue(Person, String(), 'givenName')

// Right

function Right () {
  Intangible.call(this, COALAIP, 'Right')
}

inherit(Right, Intangible)
propValue(Right, new CreativeWork(), 'license')
propValue(Right, Number(), 'percentageShares')
propValue(Right, new Copyright(), 'source')
propValue(Right, new Place(), 'territory')
propValue(Right, String(), 'validFrom')
propValue(Right, String(), 'validThrough')

// TransferAction

function TransferAction (context, type) {
  context = context || SCHEMA
  type = type || 'TransferAction'
  Action.call(this, context, type)
}

inherit(TransferAction, Action)

// AudioObject

function AudioObject () {
  MediaObject.call(this, 'AudioObject')
}

inherit(AudioObject, MediaObject)
propValue(AudioObject, String(), 'duration')

// ImageObject

function ImageObject () {
  MediaObject.call(this, 'ImageObject')
}

inherit(ImageObject, MediaObject)
propValue(ImageObject, String(), 'caption')

// ReviewAction

function ReviewAction (context, type) {
  context = context || SCHEMA
  type = type || 'ReviewAction'
  AssessAction.call(this, context, type)
}

inherit(ReviewAction, AssessAction)
propValue(ReviewAction, new Party(), 'asserter')
propValue(ReviewAction, Boolean(), 'assertionTruth')
propValue(ReviewAction, new Thing(), 'assertionSubject')
propValue(ReviewAction, String(), 'validFrom')
propValue(ReviewAction, String(), 'validThrough')

// RightsTransferAction

function RightsTransferAction () {
  TransferAction.call(this, COALAIP, 'RightsTransferAction')
}

inherit(RightsTransferAction, TransferAction)
propValue(RightsTransferAction, new CreativeWork(), 'transferContract')

// VideoObject

function VideoObject () {
  MediaObject.call(this, 'VideoObject')
}

inherit(VideoObject, MediaObject)

module.exports = {
  Thing,
  Action,
  CreativeWork,
  Intangible,
  Party,
  Place,
  AbstractWork,
  AssessAction,
  Copyright,
  MediaObject,
  Organization,
  Person,
  Right,
  TransferAction,
  AudioObject,
  ImageObject,
  ReviewAction,
  RightsTransferAction,
  VideoObject
}
