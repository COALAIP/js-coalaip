'use strict'

const Base = require('../../src/base')
const expect = require('chai').expect
const it = require('mocha').it

const context = '<context placeholder>'
const type = '<type placeholder>'

const numInstances = 10
const instances = []

exports.configureInstances = () => {
  it('configures instances', () => {
    let i, j
    for (i = 0; i < numInstances; i++) {
      instances.push(new Base(context, type))
    }
    for (i = numInstances-1; i >= 0; i--) {
      for (j = i-1; j >= 0; j--) {
        instances[i].add('subInstances', instances[j])
      }
    }
  })
}

exports.doComparisons = () => {
  it('does comparisons', () => {
    let i, j
    for (i = numInstances-1; i > 0; i--) {
      for (j = i-1; j >= 0; j--) {
        expect(instances[i].compare(instances[j])).to.equal(1)
      }
    }
  })
}

exports.validateData = () => {
  it('validates data', () => {
    let actual, expected, i, j
    for (i = numInstances-1; i > 0; i--) {
      actual = instances[i].data()
      expected = {
        '@context': context,
        '@type': type,
        subInstances: []
      }
      for (j = i-1; j >= 0; j--) {
        expected.subInstances.push(instances[j].data())
      }
      expect(actual).to.deep.equal(expected)
    }
    actual = instances[i].data()
    expected = {
      '@context': context,
      '@type': type
    }
    expect(actual).to.deep.equal(expected)
  })
}

exports.validateSubInstances = () => {
  it('validates sub-instances', () => {
    let actual, expected
    for (let i = numInstances-1; i >= 0; i--) {
      actual = instances[i].subInstances()
      expected = instances.slice(0, i+1)
      expect(actual).to.deep.equal(expected)
    }
  })
}

exports.validateTree = () => {
  it('validates tree', () => {
    let actual, expected
    for (let i = numInstances-1; i >= 0; i--) {
      actual = instances[i].tree()
      expected = instances[i].subInstances().slice(0, -1).reduce((result, instance) => {
        return instance.tree().concat(result)
      }, [])
      expected.forEach(obj => {
        obj.key += '/subInstances'
      })
      expected.push({
        key: '',
        value: instances[i]
      })
      expect(actual).to.deep.equal(expected)
    }
  })
}
