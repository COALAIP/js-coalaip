'use strict'

const Base = require('../../src/base')
const expect = require('chai').expect
const it = require('mocha').it

const context = '<context placeholder>'
const type = '<type placeholder>'
const path = '<instance* path>'

const numInstances = 10
const instances = []

exports.configureInstances = () => {
  it('configures instances', () => {
    let i, instance, j
    for (i = 0; i < numInstances; i++) {
      instance = new Base(context, type)
      instance.path = `<instance${i} path>`
      instances.push(instance)
    }
    for (i = numInstances-1; i >= 0; i--) {
      for (j = i-1; j >= 0; j--) {
        instances[i].add('subInstancesArr', instances[j])
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
        path: `<instance${i} path>`,
        subInstancesArr: []
      }
      for (j = i-1; j >= 0; j--) {
        expected.subInstancesArr.push(instances[j].data())
      }
      expect(actual).to.deep.equal(expected)
    }
    actual = instances[i].data()
    expected = {
      '@context': context,
      '@type': type,
      path: `<instance${i} path>`
    }
    expect(actual).to.deep.equal(expected)
  })
}

exports.validateParseData = () => {
  it('validates data parsing', () => {
    instances.forEach(instance => {
      const other = new instance.constructor()
      other.withData(instance.data())
      other.set('@context', context)
      other.set('@type', type)
      expect(other.data()).to.deep.equal(instance.data())
    })
  })
}

exports.validateParseIPLD = () => {
  it('validates IPLD parsing', () => {
    instances.forEach(instance => {
      const other = new instance.constructor()
      other.withData(instance.ipld())
      other.set('@context', context)
      other.set('@type', type)
      expect(other.ipld()).to.deep.equal(instance.ipld())
    })
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
        obj.key += '/subInstancesArr'
      })
      expected.push({
        key: '',
        value: instances[i]
      })
      expect(actual).to.deep.equal(expected)
    }
  })
}
