# JS COALA IP Implementation

## COALA IP

[COALA IP](https://www.coalaip.org) is a blockchain-ready, community-driven protocol for
intellectual property licensing.

[This presentation](presentations/COALA%20IP%20-%20short.pdf) gives a quick summary. [Here's](presentations/COALA%20IP%20-%20long.pdf)
an extended version.

[This academic paper](https://github.com/COALAIP/specs/blob/master/presentations/COALA%20IP%20Report%20-%20May%202016.pdf)
is about how blockchains can support, complement, or supplement IP, authored by the COALA IP working
group.

[This repo](https://github.com/COALAIP/specs) has plenty more information.


## Linked Data

This project is an opinionated service for structuring metadata. By utilising the foundations of schemas and pairing that with the flexibility to set periphery values, JS COALA IP assists in the creation of [Linked Data](https://ipld.io/) by prepping the data for storage in decentralized data stores.


## Getting Started
Some code to get started structuring data. In order to upload to a decentralized storage service, consider using [Constellate](https://github.com/zbo14/constellate).

#### Create a Person
```js
const man = new Person();
man.setGivenName('John');
man.setFamilyName('Smith');
man.setEmail('jsmith@email.com');

// or if the object is already structured
const woman = {
	givenName: 'Jane',
	familyName: 'Smith',
	email: 'janesmith@email.com',
}

const person = new Person();
person.withData(woman);
```

#### Log a Person
```js
console.log(JSON.stringify(man, null, 2))
{
  "_data": {
    "@context": "http://schema.org",
    "@type": "Person",
    "givenName": "John",
    "familyName": "Smith",
    "email": "jsmith@email.com"
  }
}
```

#### Adding Instance to Another
```js
// member property is an Array
const group = new MusicGroup();
group.setName('Beatles');
group.set('description', 'descriptive');
group.addMember(man);


const composition = new MusicComposition();
// composer property is a Person
composition.addComposer(man);

const recording = new MusicRecording();
// byArtist property is an Array of MusicGroups
recording.addByArtist(group);
// recordingOf property is a single MusicComposition
recording.setRecordingOf(comp);

console.log(recording);
{
  "_data": {
    "@context": "http://coalaip.org",
    "@type": "MusicRecording",
    "byArtist": [
      {
        "_data": {
          "@context": "http://schema.org",
          "@type": "MusicGroup",
          "name": "Beatles",
          "description": "descriptive",
          "member": [
            {
              "_data": {
                "@context": "http://schema.org",
                "@type": "Person",
                "givenName": "John",
                "familyName": "Smith",
                "email": "jsmith@email.com"
              }
            }
          ]
        }
      }
    ],
    "recordingOf": {
      "_data": {
        "@context": "http://coalaip.org",
        "@type": "MusicComposition",
        "composer": [
          {
            "_data": {
              "@context": "http://schema.org",
              "@type": "Person",
              "givenName": "John",
              "familyName": "Smith",
              "email": "jsmith@email.com"
            }
          }
        ]
      }
    }
  }
}
```


#### Logging subInstances
Logging subInstances provides a full list of any and all nested objects within the requested resource. They are presented in order of hierarchy to aid in the importing of the metadata to other services or data stores.
```js
const metadata = recording.subInstances();
console.log(metadata);
[
  {
    "_data": {
      "@context": "http://schema.org",
      "@type": "Person",
      "givenName": "John",
      "familyName": "Smith",
      "email": "jsmith@email.com"
    }
  },
  {
    "_data": {
      "@context": "http://schema.org",
      "@type": "MusicGroup",
      "name": "Beatles",
      "description": "descriptive",
      "member": [
        {
          "_data": {
            "@context": "http://schema.org",
            "@type": "Person",
            "givenName": "John",
            "familyName": "Smith",
            "email": "jsmith@email.com"
          }
        }
      ]
    }
  },
  {
    "_data": {
      "@context": "http://coalaip.org",
      "@type": "MusicComposition",
      "composer": [
        {
          "_data": {
            "@context": "http://schema.org",
            "@type": "Person",
            "givenName": "John",
            "familyName": "Smith",
            "email": "jsmith@email.com"
          }
        }
      ]
    }
  },
  {
    "_data": {
      "@context": "http://coalaip.org",
      "@type": "MusicRecording",
      "byArtist": [
        {
          "_data": {
            "@context": "http://schema.org",
            "@type": "MusicGroup",
            "name": "Beatles",
            "description": "descriptive",
            "member": [
              {
                "_data": {
                  "@context": "http://schema.org",
                  "@type": "Person",
                  "givenName": "John",
                  "familyName": "Smith",
                  "email": "jsmith@email.com"
                }
              }
            ]
          }
        }
      ],
      "recordingOf": {
        "_data": {
          "@context": "http://coalaip.org",
          "@type": "MusicComposition",
          "composer": [
            {
              "_data": {
                "@context": "http://schema.org",
                "@type": "Person",
                "givenName": "John",
                "familyName": "Smith",
                "email": "jsmith@email.com"
              }
            }
          ]
        }
      }
    }
  }
]
```