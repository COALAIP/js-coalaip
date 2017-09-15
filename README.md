## js-coalaip

Javascript implementation for [COALA IP](https://github.com/COALAIP/specs).

### Linked Metadata

This project provides opinionated tools for structuring metadata, using schema definitions with the ability to set arbitrary properties on type instances. Metadata is translatable to linked-data formats (e.g. ipld) for persistence to different databases/storage layers.

### Module Overview

#### Core

This module contains the types outlined in the specification. Additional types have been included because types in the specification inherit from them or certain properties expect other types.

#### Music

This module extends the `core` module with the following music-related types: `MusicAlbum`, `MusicComposition`, `MusicGroup`, `MusicPlaylist`, `MusicRecording`, and `MusicRelease`.


### Getting Started
Some code to get started structuring metadata. In order to persist to a storage layer, consider using [Constellate](https://github.com/zbo14/constellate).

#### Create a `Person`
```js
const Person = require('./src/core').Person

const man = new Person()
man.setGivenName('John')
man.setFamilyName('Smith')
man.setEmail('jsmith@email.com')
man.set('arbitrary', 'value')

// or if the object is already structured
const woman = {
	givenName: 'Jane',
	familyName: 'Smith',
	email: 'janesmith@email.com',
	arbitrary: 'value'
}

const person = new Person()
person.withData(woman)
```

#### Access the `Person`'s data
```js
console.log(man.data())

{
	"@context": "http://schema.org",
	"@type": "Person",
	"givenName": "John",
	"familyName": "Smith",
	"email": "jsmith@email.com",
	"arbitrary": "value"
}

// or if you want the data canonically ordered...

console.log(man.dataOrdered())

{
	"@context": "http://schema.org",
	"@type": "Person",
	"arbitrary": "value",
	"email": "jsmith@email.com",
	"familyName": "Smith",
	"givenName": "John"
}
```

#### Add/Set sub-instances

`addProperty` for property that expects an array

`setProperty` for property that expects a single value

```js
const {
	MusicComposition,
	MusicGroup,
	MusicRecording
} = require('./src/music')

// member property is an Array
const group = new MusicGroup()
group.setDescription('descriptive')
group.setName('Beatles')
group.addMember(man)
group.path = '<placeholder group path>'


const composition = new MusicComposition()
// 'composer' expects a Party
composition.addComposer(man)
composition.path = '<placeholder composition path>'

const recording = new MusicRecording()
// 'byArtist' expects an array of MusicGroups
recording.addByArtist(group)
// 'recordingOf' expects a MusicComposition
recording.setRecordingOf(comp)

console.log(recording.data())

{  
  "@context": "http://coalaip.org",
  "@type": "MusicRecording",
  "byArtist": [  
    {  
      "@context": "http://schema.org",
      "@type": "MusicGroup",
      "name": "Beatles",
      "description": "descriptive",
      "member": [  
        {  
          "@context": "http://schema.org",
          "@type": "Person",
          "givenName": "John",
          "familyName": "Smith",
          "email": "jsmith@email.com"
        }
      ]
    }
  ],
  "recordingOf": {  
    "@context": "http://coalaip.org",
    "@type": "MusicComposition",
    "composer": [  
      {  
        "@context": "http://schema.org",
        "@type": "Person",
        "givenName": "John",
        "familyName": "Smith",
        "email": "jsmith@email.com"
      }
    ]
  }
}

// and the ipld...

console.log(recording.ipld())

{  
  "@context": "http://coalaip.org",
  "@type": "MusicRecording",
  "byArtist": [  
    {  
      "/": "<placeholder group path>"
    }
  ],
  "recordingOf": {  
    "/": "<placeholder composition path>"
  }
}
```

#### Access sub-instances
`instance.subInstances()` returns a flattened array of unique instances that are nested within `instance`. They are ordered hierarchically to ease handling of metadata in other programs.
```js
const metadata = recording.subInstances()
console.log(metadata)

[man, group, composition, recording]
```
