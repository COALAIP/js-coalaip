'use strict'

const expect = require('chai').expect
const it = require('mocha').it
const capitalize = require('../../../src/util').capitalize

exports.checkContextAndType = module => {
  return it('checks context and type', () => {
    const bool = module.instance._data['@context'] === module.context &&
                 module.instance._data['@type'] === module.type
    expect(bool).to.be.true
  })
}

exports.checkInheritance = module => {
  return it('checks inheritance', () => {
    const bool = module.parents.every(parent => module.instance instanceof parent)
    expect(bool).to.be.true
  })
}

exports.addValues = module => {
  return it('adds values', () => {
    const keys = Object.keys(module.add)
    const values = keys.map(key => module.add[key])
    let capitalized, i, j, key, value
    for (i = 0; i < keys.length; i++) {
      key = keys[i]
      value = values[i]
      capitalized = capitalize(key)
      if (value instanceof Array) {
        for (j = 0; j < value.length; j++) {
          module.instance['add' + capitalized](value[j])
        }
      } else {
        module.instance['add' + capitalized](value)
      }
    }
  })
}

exports.setValues = module => {
  return it('sets values', () => {
    const keys = Object.keys(module.set)
    const values = keys.map(key => module.set[key])
    for (let i = 0; i < keys.length; i++) {
      module.instance['set' + capitalize(keys[i])](values[i])
    }
  })
}
