'use strict';

var Base = require('./base');

var _require = require('./util'),
    COALAIP = _require.COALAIP,
    SCHEMA = _require.SCHEMA,
    inherit = _require.inherit,
    propArray = _require.propArray,
    propValue = _require.propValue;

// Thing

function Thing() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SCHEMA;
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Thing';

  Base.call(this, context, type);
}

inherit(Thing, Base);
propArray(Thing, new AudioObject(), 'audio');
propValue(Thing, String(), 'description');
propArray(Thing, new ImageObject(), 'image');
propValue(Thing, String(), 'name');
propArray(Thing, new VideoObject(), 'video');

// Action

function Action() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SCHEMA;
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Action';

  Thing.call(this, context, type);
}

inherit(Action, Thing);
propValue(Action, String(), 'error');

// CreativeWork

function CreativeWork() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SCHEMA;
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'CreativeWork';

  Thing.call(this, context, type);
}

inherit(CreativeWork, Thing);
propArray(CreativeWork, String(), 'genre');
propArray(CreativeWork, new Party(), 'producer');
propArray(CreativeWork, new Party(), 'publisher');

// Intangible

function Intangible() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SCHEMA;
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Intangible';

  Thing.call(this, context, type);
}

inherit(Intangible, Thing);

// Party

function Party() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Party';

  Thing.call(this, COALAIP, type);
}

inherit(Party, Thing);
propValue(Party, String(), 'email');

// Place

function Place() {
  Thing.call(this, SCHEMA, 'Place');
}

inherit(Place, Thing);

// AbstractWork

function AbstractWork() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'AbstractWork';

  CreativeWork.call(this, COALAIP, type);
}

inherit(AbstractWork, CreativeWork);

// AssessAction

function AssessAction() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SCHEMA;
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'AssessAction';

  Action.call(this, context, type);
}

inherit(AssessAction, Action);

// Copyright

function Copyright() {
  Intangible.call(this, COALAIP, 'Copyright');
}

inherit(Copyright, Intangible);
propValue(Copyright, new CreativeWork(), 'rightsOf');
propValue(Copyright, new Place(), 'territory');
propValue(Copyright, String(), 'validFrom');
propValue(Copyright, String(), 'validThrough');

// Manifestation

function Manifestation() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Manifestation';

  CreativeWork.call(this, COALAIP, type);
}

inherit(Manifestation, CreativeWork);
propValue(Manifestation, new AbstractWork(), 'manifestationOf');

// MediaObject

function MediaObject() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'MediaObject';

  CreativeWork.call(this, SCHEMA, type);
}

inherit(MediaObject, CreativeWork);
propValue(MediaObject, String(), 'contentUrl');
propValue(MediaObject, String(), 'encodingFormat');

// Organization

function Organization() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Organization';

  Party.call(this, type);
}

inherit(Organization, Party);

propArray(Organization, new Party(), 'member');

// Person

function Person() {
  Party.call(this, 'Person');
}

inherit(Person, Party);
propValue(Person, String(), 'familyName');
propValue(Person, String(), 'givenName');

// Right

function Right() {
  Intangible.call(this, COALAIP, 'Right');
}

inherit(Right, Intangible);
propValue(Right, new CreativeWork(), 'license');
propValue(Right, Number(), 'percentageShares');
propValue(Right, new Copyright(), 'source');
propValue(Right, new Place(), 'territory');
propValue(Right, String(), 'validFrom');
propValue(Right, String(), 'validThrough');

// TransferAction

function TransferAction() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SCHEMA;
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'TransferAction';

  Action.call(this, context, type);
}

inherit(TransferAction, Action);

// AudioObject

function AudioObject() {
  MediaObject.call(this, 'AudioObject');
}

inherit(AudioObject, MediaObject);
propValue(AudioObject, String(), 'duration');

// ImageObject

function ImageObject() {
  MediaObject.call(this, 'ImageObject');
}

inherit(ImageObject, MediaObject);
propValue(ImageObject, String(), 'caption');

// ReviewAction

function ReviewAction() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SCHEMA;
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ReviewAction';

  AssessAction.call(this, context, type);
}

inherit(ReviewAction, AssessAction);
propValue(ReviewAction, new Party(), 'asserter');
propValue(ReviewAction, Boolean(), 'assertionTruth');
propValue(ReviewAction, new Thing(), 'assertionSubject');
propValue(ReviewAction, String(), 'validFrom');
propValue(ReviewAction, String(), 'validThrough');

// RightsTransferAction

function RightsTransferAction() {
  TransferAction.call(this, COALAIP, 'RightsTransferAction');
}

inherit(RightsTransferAction, TransferAction);
propValue(RightsTransferAction, new CreativeWork(), 'transferContract');

// VideoObject

function VideoObject() {
  MediaObject.call(this, 'VideoObject');
}

inherit(VideoObject, MediaObject);

module.exports = {
  Thing: Thing,
  Action: Action,
  CreativeWork: CreativeWork,
  Intangible: Intangible,
  Party: Party,
  Place: Place,
  AbstractWork: AbstractWork,
  AssessAction: AssessAction,
  Copyright: Copyright,
  Manifestation: Manifestation,
  MediaObject: MediaObject,
  Organization: Organization,
  Person: Person,
  Right: Right,
  TransferAction: TransferAction,
  AudioObject: AudioObject,
  ImageObject: ImageObject,
  ReviewAction: ReviewAction,
  RightsTransferAction: RightsTransferAction,
  VideoObject: VideoObject
};