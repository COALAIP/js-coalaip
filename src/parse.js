'use strict'

const {
  capitalize,
  sort
} = require('./util')

function parse (data, instance) {
  const keys = Object.keys(data)
  let i, j, key, method
  for (i = 0; i < keys.length; i++) {
    key = keys[i]
    const capitalized = capitalize(key)
    if (instance[method = 'add' + capitalized]) {
      if (data[key] instanceof Array) {
        for (j = 0; j < data[key].length; j++) {
          if (data[key][j].constructor === Object) {
            parseSubInstance(capitalized, data[key][j], instance, method)
          } else {
            instance[method](data[key][j])
          }
        }
      } else {
        if (data[key].constructor === Object) {
          parseSubInstance(capitalized, data[key], instance, method)
        } else {
          instance[method](data[key])
        }
      }
    } else if (instance[method = 'set' + capitalized]) {
      if (data[key].constructor === Object) {
        parseSubInstance(capitalized, data[key], instance, method)
      } else {
        instance[method](data[key])
      }
    } else {
      instance[key] = data[key]
    }
  }
  return instance
}

function parseSubInstance (capitalized, data, instance, method) {
  const cls = instance['type' + capitalized]
  let result
  if (data['/'] && Object.keys(data).length === 1) {
    result = new cls()
    result.path = data['/']
  } else {
    result = parse(data, new cls())
  }
  instance[method](result)
}

module.exports = parse
