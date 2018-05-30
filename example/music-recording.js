'use strict'

const MusicRecording = require('../lib/music').MusicRecording
const composition = require('./music-composition')
const musicGroup = require('./music-group')

const recording = new MusicRecording()
recording.addByArtist(musicGroup)
recording.setRecordingOf(composition)
recording.path = '<musicRecording path>'

module.exports = recording
