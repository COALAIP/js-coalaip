'use strict'

const {
  capitalize,
  sort
} = require('./util')

function parse (data, registry, subInstances, instance) {
  if (!instance) {
    const cls = registry[data['@type']]
    instance = new cls()
  }
  const keys = Object.keys(data)
  subInstances = subInstances || []
  let i, j, key, method
  for (i = 0; i < keys.length; i++) {
    key = keys[i]
    const capitalized = capitalize(key)
    if (instance[method = 'add' + capitalized]) {
      if (data[key] instanceof Array) {
        for (j = 0; j < data[key].length; j++) {
          if (data[key][j].constructor === Object) {
            parseSubInstance(data[key][j], instance, method, registry, subInstances)
          } else {
            instance[method](data[key][j])
          }
        }
      } else {
        if (data[key].constructor === Object) {
          parseSubInstance(data[key], instance, method, registry, subInstances)
        } else {
          instance[method](data[key])
        }
      }
    } else if (instance[method = 'set' + capitalized]) {
      if (data[key].constructor === Object) {
        parseSubInstance(data[key], instance, method, registry, subInstances)
      } else {
        instance[method](data[key])
      }
    } else {
      instance._data[key] = data[key]
    }
  }
  return instance
}

function parseSubInstance (data, instance, method, registry, subInstances) {
  for (let i = 0; i < subInstances.length; i++) {
    if (!sort(data, subInstances[i]._data)) {
      instance[method](subInstances[i])
      return
    }
  }
  const parsed = parse(data, registry, subInstances)
  instance[method](parsed)
  subInstances.push(parsed)
}

module.exports = parse
