'use strict'

const Base = require('../../src/base')
const core = require('../../src/core')
const newPath = require('./new-path')

const {
  COALAIP,
  SCHEMA
} = require('../../src/util')

const thing = new core.Thing()
thing.path = newPath('thing')

const action = new core.Action()
action.path = newPath('action')

const creativeWork = new core.CreativeWork()
creativeWork.path = newPath('creativeWork')

const intangible = new core.Intangible()
intangible.path = newPath('intangible')

const party = new core.Party()
party.path = newPath('party')

const place = new core.Place()
place.path = newPath('place')

const abstractWork = new core.AbstractWork()
abstractWork.path = newPath('abstractWork')

const assessAction = new core.AssessAction()
assessAction.path = newPath('assessAction')

const copyright = new core.Copyright()
copyright.path = newPath('copyright')

const manifestation = new core.Manifestation()
manifestation.path = newPath('manifestation')

const organization = new core.Organization()
organization.path = newPath('organization')

const person = new core.Person()
person.path = newPath('person')

const right = new core.Right()
right.path = newPath('right')

const mediaObject = new core.MediaObject()
mediaObject.path = newPath('mediaObject')

const reviewAction = new core.ReviewAction()
reviewAction.path = newPath('reviewAction')

const transferAction = new core.TransferAction()
transferAction.path = newPath('transferAction')

const rightsTransferAction = new core.RightsTransferAction()
rightsTransferAction.path = newPath('rightsTransferAction')

const audioObject = new core.AudioObject()
audioObject.path = newPath('audioObject')

const imageObject = new core.ImageObject()
imageObject.path = newPath('imageObject')

const videoObject = new core.VideoObject()
videoObject.path = newPath('videoObject')


exports.Thing = {
  context: SCHEMA,
  type: 'Thing',
  instance: thing,
  parents: [
    Base
  ],
  add: {
    audio: audioObject,
    image: imageObject,
    video: videoObject
  },
  set: {
    description: 'descriptive',
    name: 'thing'
  }
}

exports.Action = {
  context: SCHEMA,
  type: 'Action',
  instance: action,
  parents: [
    Base,
    core.Thing
  ],
  set: {
    error: 'erroneous',
    name: 'action'
  }
}

exports.CreativeWork = {
  context: SCHEMA,
  type: 'CreativeWork',
  instance: creativeWork,
  parents: [
    Base,
    core.Thing
  ],
  add: {
    genre: 'slimecore',
    producer: party,
    publisher: party
  },
  set: {
    name: 'creativeWork'
  }
}

exports.Intangible = {
  context: SCHEMA,
  type: 'Intangible',
  instance: intangible,
  parents: [
    Base,
    core.Thing
  ],
  set: {
    name: 'intangible'
  }
}

exports.Party = {
  context: COALAIP,
  type: 'Party',
  instance: party,
  parents: [
    Base,
    core.Thing
  ],
  set: {
    email: 'me@example.org',
    name: 'party'
  }
}

exports.Place = {
  context: SCHEMA,
  type: 'Place',
  instance: place,
  parents: [
    Base,
    core.Thing
  ],
  set: {
    name: 'place'
  }
}

exports.AbstractWork = {
  context: COALAIP,
  type: 'AbstractWork',
  instance: abstractWork,
  parents: [
    Base,
    core.Thing,
    core.CreativeWork
  ],
  add: {
    genre: 'slimecore',
    producer: party,
    publisher: party
  },
  set: {
    name: 'abstractWork'
  }
}

exports.AssessAction = {
  context: SCHEMA,
  type: 'AssessAction',
  instance: assessAction,
  parents: [
    Base,
    core.Thing,
    core.Action
  ],
  set: {
    error: 'erroneous',
    name: 'assessAction'
  }
}

exports.Copyright = {
  context: COALAIP,
  type: 'Copyright',
  instance: copyright,
  parents: [
    Base,
    core.Thing,
    core.Intangible
  ],
  set: {
    name: 'copyright',
    rightsOf: creativeWork,
    territory: place,
    validFrom: '2018-01-01',
    validThrough: '2088-01-01'
  }
}

exports.Manifestation = {
  context: COALAIP,
  type: 'Manifestation',
  instance: manifestation,
  parents: [
    Base,
    core.Thing,
    core.CreativeWork
  ],
  set: {
    manifestationOf: abstractWork,
    name: 'manifestation'
  }
}

exports.MediaObject = {
  context: SCHEMA,
  type: 'MediaObject',
  instance: mediaObject,
  parents: [
    Base,
    core.Thing,
    core.CreativeWork
  ],
  add: {
    genre: 'slimecore',
    producer: party,
    publisher: party
  },
  set: {
    contentUrl: 'http://my-media.com',
    encodingFormat: 'audio/mp3',
    name: 'mediaObject'
  }
}

exports.Organization = {
  context: SCHEMA,
  type: 'Organization',
  instance: organization,
  parents: [
    Base,
    core.Thing,
    core.Party
  ],
  add: {
    member: party
  },
  set: {
    email: 'me@example.org',
    name: 'organization'
  }
}

exports.Person = {
  context: SCHEMA,
  type: 'Person',
  instance: person,
  parents: [
    Base,
    core.Thing,
    core.Party
  ],
  set: {
    email: 'me@example.org',
    familyName: 'last',
    givenName: 'first',
    name: 'person'
  }
}

exports.Right = {
  context: COALAIP,
  type: 'Right',
  instance: right,
  parents: [
    Base,
    core.Thing,
    core.Intangible
  ],
  set: {
    license: creativeWork,
    name: 'right',
    percentageShares: Number(),
    source: copyright,
    territory: place,
    validFrom: '2018-01-01',
    validThrough: '2088-01-01'
  }
}

exports.TransferAction = {
  context: SCHEMA,
  type: 'TransferAction',
  instance: transferAction,
  parents: [
    Base,
    core.Thing,
    core.Action
  ],
  set: {
    error: 'erroneous',
    name: 'transferAction'
  }
}

exports.AudioObject = {
  context: SCHEMA,
  type: 'AudioObject',
  instance: audioObject,
  parents: [
    Base,
    core.Thing,
    core.CreativeWork,
    core.MediaObject
  ],
  add: {
    genre: 'slimecore',
    producer: party,
    publisher: party
  },
  set: {
    contentUrl: 'http://my-media.com',
    duration: '',
    encodingFormat: 'audio/mp3',
    name: 'audioObject'
  }
}

exports.ImageObject = {
  context: SCHEMA,
  type: 'ImageObject',
  instance: imageObject,
  parents: [
    Base,
    core.Thing,
    core.CreativeWork,
    core.MediaObject
  ],
  add: {
    genre: 'Baroque',
    producer: party,
    publisher: party
  },
  set: {
    caption: 'woah',
    contentUrl: 'http://my-media.com',
    encodingFormat: 'image/png',
    name: 'imageObject'
  }
}

exports.ReviewAction =  {
  context: SCHEMA,
  type: 'ReviewAction',
  instance: reviewAction,
  parents: [
    Base,
    core.Thing,
    core.Action,
    core.AssessAction
  ],
  set: {
    asserter: party,
    assertionSubject: thing,
    assertionTruth: false,
    error: 'erroneous',
    name: 'reviewAction',
    validFrom: '2018-01-01',
    validThrough: '2088-01-01'
  }
}

exports.RightsTransferAction =  {
  context: COALAIP,
  type: 'RightsTransferAction',
  instance: rightsTransferAction,
  parents: [
    Base,
    core.Thing,
    core.Action,
    core.TransferAction
  ],
  set: {
    error: 'erroneous',
    name: 'rightsTransferAction',
    transferContract: creativeWork
  }
}

exports.VideoObject = {
  context: SCHEMA,
  type: 'VideoObject',
  instance: videoObject,
  parents: [
    Base,
    core.Thing,
    core.CreativeWork,
    core.MediaObject
  ],
  add: {
    genre: 'horror',
    producer: party,
    publisher: party
  },
  set: {
    contentUrl: 'http://my-media.com',
    encodingFormat: 'video/mp4',
    name: 'videoObject'
  }
}
