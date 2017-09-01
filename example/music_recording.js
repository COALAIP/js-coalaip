'use strict'

const parse = require('../src/parse')
const Person = require('../src/core').Person

const {
  MusicComposition,
  MusicGroup,
  MusicRecording
} = require('../src/music')

const andy = new Person()
andy.setFamilyName('Dwyer')
andy.setGivenName('Andy')

const band = new MusicGroup()
band.setName('Mouse Rat')
band.addMember(andy)

const composition = new MusicComposition()
composition.setName('November')
composition.addComposer(andy)

let recording = new MusicRecording()
recording.addByArtist(band)
recording.setRecordingOf(composition)

const data = recording.data()

recording = parse(data)
const recordingOf = recording.getRecordingOf()

if (!recordingOf.equals(composition)) {
  throw new Error('Recording is not a recording of the composition')
}

console.log(JSON.stringify(data, null, 2))
