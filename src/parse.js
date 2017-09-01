'use strict'

const Core = require('./core')
const Music = require('./music')
const capitalize = require('./util').capitalize

const Registry = Object.assign({}, Core, Music)

function parse (data, subInstances) {
  // data['@context']
  const cls = Registry[data['@type']]
  const instance = new cls()
  const keys = Object.keys(data)
  let i, j, key, method
  for (i = 0; i < keys.length; i++) {
    key = keys[i]
    if (key === '@context' || key === '@type') {
      continue
    }
    const capitalized = capitalize(key)
    if (instance[method = 'add' + capitalized]) {
      if (data[key] instanceof Array) {
        for (j = 0; j < data[key].length; j++) {
          if (data[key][j].constructor === Object) {
            parseSubInstance(data[key][j], instance, method, subInstances)
          } else {
            instance[method](data[key][j])
          }
        }
      } else {
        if (data[key].constructor === Object) {
            parseSubInstance(data[key], instance, method, subInstances)
        } else {
          instance[method](data[key])
        }
      }
    } else if (instance[method = 'set' + capitalized]) {
      if (data[key].constructor === Object) {
        parseSubInstance(data[key], instance, method, subInstances)
      } else {
        instance[method](data[key])
      }
    } else {
      throw new Error(`no "add${capitalized}" or "set${capitalized}" method`)
    }
  }
  return instance
}

function parseSubInstance (data, instance, method, subInstances) {
  const parsed = parse(data, subInstances)
  for (let i = 0; i < subInstances.length; i++) {
    if (subInstances[i].equals(parsed)) {
      instance[method](subInstances[i])
      return
    }
  }
  instance[method](parsed)
  subInstances.push(parsed)
}

module.exports = data => {
  return parse(data, [])
}
