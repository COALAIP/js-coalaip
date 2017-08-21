'use strict'

const Core = require('./core')
const Music = require('./music')
const capitalize = require('./util').capitalize

const Registry = Object.assign({}, Core, Music)

function handleData(data, instance, method) {
  if (data.constructor === Object) {
    instance[method](parse(data))
  } else {
    instance[method](data)
  }
}

function parse (data) {
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
          handleData(data[key][j], instance, method)
        }
      } else {
        handleData(data[key], instance, method)
      }
    } else if (instance[method = 'set' + capitalized]) {
      handleData(data[key], instance, method)
    } else {
      throw new Error(`no "add${capitalized}" or "set${capitalized}" method`)
    }
  }
  return instance
}

module.exports = parse
