'use strict'

const Base = require('../../src/base')
const core = require('../../src/core')

const {
  COALAIP,
  SCHEMA
} = require('../../src/util')

exports.Thing = {
  context: SCHEMA,
  type: 'Thing',
  instance: new core.Thing(),
  parents: [
    Base
  ],
  add: {
    audio: new core.AudioObject(),
    image: new core.ImageObject(),
    video: new core.VideoObject()
  },
  set: {
    description: 'descriptive',
    name: 'thing'
  }
}

exports.Action = {
  context: SCHEMA,
  type: 'Action',
  instance: new core.Action(),
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
  instance: new core.CreativeWork(),
  parents: [
    Base,
    core.Thing
  ],
  add: {
    genre: 'slimecore',
    producer: new core.Party(),
    publisher: new core.Party()
  },
  set: {
    name: 'creativeWork'
  }
}

exports.Intangible = {
  context: SCHEMA,
  type: 'Intangible',
  instance: new core.Intangible(),
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
  instance: new core.Party(),
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
  instance: new core.Place(),
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
  instance: new core.AbstractWork(),
  parents: [
    Base,
    core.Thing,
    core.CreativeWork
  ],
  add: {
    genre: 'slimecore',
    producer: new core.Party(),
    publisher: new core.Party()
  },
  set: {
    name: 'abstractWork'
  }
}

exports.AssessAction = {
  context: SCHEMA,
  type: 'AssessAction',
  instance: new core.AssessAction(),
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
  instance: new core.Copyright(),
  parents: [
    Base,
    core.Thing,
    core.Intangible
  ],
  set: {
    name: 'copyright',
    rightsOf: new core.CreativeWork(),
    territory: new core.Place(),
    validFrom: '2018-01-01',
    validThrough: '2088-01-01'
  }
}

exports.Manifestation = {
  context: COALAIP,
  type: 'Manifestation',
  instance: new core.Manifestation,
  parents: [
    Base,
    core.Thing,
    core.CreativeWork
  ],
  set: {
    manifestationOf: new core.AbstractWork(),
    name: 'manifestation'
  }
}

exports.MediaObject = {
  context: SCHEMA,
  type: 'MediaObject',
  instance: new core.MediaObject(),
  parents: [
    Base,
    core.Thing,
    core.CreativeWork
  ],
  add: {
    genre: 'slimecore',
    producer: new core.Party(),
    publisher: new core.Party()
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
  instance: new core.Organization(),
  parents: [
    Base,
    core.Thing,
    core.Party
  ],
  add: {
    member: new core.Party()
  },
  set: {
    email: 'me@example.org',
    name: 'organization'
  }
}

exports.Person = {
  context: SCHEMA,
  type: 'Person',
  instance: new core.Person(),
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
  instance: new core.Right(),
  parents: [
    Base,
    core.Thing,
    core.Intangible
  ],
  set: {
    license: new core.CreativeWork(),
    name: 'right',
    percentageShares: Number(),
    source: new core.Copyright(),
    territory: new core.Place(),
    validFrom: '2018-01-01',
    validThrough: '2088-01-01'
  }
}

exports.TransferAction = {
  context: SCHEMA,
  type: 'TransferAction',
  instance: new core.TransferAction(),
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
  instance: new core.AudioObject(),
  parents: [
    Base,
    core.Thing,
    core.CreativeWork,
    core.MediaObject
  ],
  add: {
    genre: 'slimecore',
    producer: new core.Party(),
    publisher: new core.Party()
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
  instance: new core.ImageObject(),
  parents: [
    Base,
    core.Thing,
    core.CreativeWork,
    core.MediaObject
  ],
  add: {
    genre: 'Baroque',
    producer: new core.Party(),
    publisher: new core.Party()
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
  instance: new core.ReviewAction(),
  parents: [
    Base,
    core.Thing,
    core.Action,
    core.AssessAction
  ],
  set: {
    asserter: new core.Party(),
    assertionSubject: new core.Thing(),
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
  instance: new core.RightsTransferAction(),
  parents: [
    Base,
    core.Thing,
    core.Action,
    core.TransferAction
  ],
  set: {
    error: 'erroneous',
    name: 'rightsTransferAction',
    transferContract: new core.CreativeWork()
  }
}

exports.VideoObject = {
  context: SCHEMA,
  type: 'VideoObject',
  instance: new core.VideoObject(),
  parents: [
    Base,
    core.Thing,
    core.CreativeWork,
    core.MediaObject
  ],
  add: {
    genre: 'horror',
    producer: new core.Party(),
    publisher: new core.Party()
  },
  set: {
    contentUrl: 'http://my-media.com',
    encodingFormat: 'video/mp4',
    name: 'videoObject'
  }
}
