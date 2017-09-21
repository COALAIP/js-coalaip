'use strict'

const expect = require('chai').expect
const capitalize = require('../../src/util').capitalize
const parse = require('../../src/parse')

const {
  describe,
  it
} = require('mocha')

const checkContextAndType = module => {
  return it('checks context and type', () => {
    const bool = module.instance._data['@context'] === module.context &&
                 module.instance._data['@type'] === module.type
    expect(bool).to.be.true
  })
}

const checkInheritance = module => {
  return it('checks inheritance', () => {
    const bool = module.parents.every(parent => {
      return module.instance instanceof parent
    })
    expect(bool).to.be.true
  })
}

const addValues = module => {
  return it('adds values', () => {
    const keys = Object.keys(module.add)
    const values = keys.map(key => {
      return module.add[key]
    })
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

const setValues = module => {
  return it('sets values', () => {
    const keys = Object.keys(module.set)
    const values = keys.map(key => {
      return module.set[key]
    })
    for (let i = 0; i < keys.length; i++) {
      module.instance['set' + capitalize(keys[i])](values[i])
    }
  })
}

const parseData = module => {
  return it('parses data', () => {
    const data = module.instance.data()
    const instance = new module.instance.constructor()
    const other = parse(data, instance)
    const bool = module.instance.equals(other)
    expect(bool).to.be.true
  })
}

const parseIPLD = module => {
  return it('parses IPLD', () => {
    const ipld = module.instance.ipld()
    const instance = new module.instance.constructor()
    const other = parse(ipld, instance)
    const bool = module.instance.equals(other)
    expect(bool).to.be.true
  })
}

module.exports = module => {
  describe(module.type, () => {
    checkContextAndType(module)
    checkInheritance(module)
    if (module.add) {
      addValues(module)
    }
    if (module.set) {
      setValues(module)
    }
    parseData(module)
    parseIPLD(module)
  })
}
