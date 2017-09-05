'use strict'

const Base = require('../../src/base')
const expect = require('chai').expect

const context = '<context placeholder>'
const type = '<type placeholder>'

const numInstances = 10
const instances = []

exports.configureInstances = () => {
  let i, j
  for (i = 0; i < numInstances; i++) {
    instances.push(new Base(context, type))
  }
  for (i = numInstances-1; i >= 0; i--) {
    for (j = i-1; j >= 0; j--) {
      instances[i].add('subInstances', instances[j])
    }
  }
}

exports.validateSubInstances = () => {
  let actual, expected
  for (let i = numInstances-1; i >= 0; i--) {
    actual = instances[i].subInstances()
    expected = instances.slice(0, i+1)
    expect(actual).to.deep.equal(expected)
  }
}
