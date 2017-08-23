'use strict'

const Core = require('./core')
const Music = require('./music')
const capitalize = require('./util').capitalize

const Registry = Object.assign({}, Core, Music)

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
          if (data[key][j].constructor === Object) {
            instance[method](parse(data[key][j]))
          } else {
            instance[method](data[key][j])
          }
        }
      } else {
        if (data[key].constructor === Object) {
          instance[method](parse(data[key]))
        } else {
          instance[method](data[key])
        }
      }
    } else if (instance[method = 'set' + capitalized]) {
      if (data[key].constructor === Object) {
        instance[method](parse(data[key]))
      } else {
        instance[method](data[key])
      }
    } else {
      throw new Error(`no "add${capitalized}" or "set${capitalized}" method`)
    }
  }
  return instance
}

module.exports = parse
