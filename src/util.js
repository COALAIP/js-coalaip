'use strict'

exports.COALAIP = 'http://coalaip.org'
exports.SCHEMA = 'http://schema.org'

// adapted from https://toddmotto.com/understanding-javascript-types-and-reliable-type-checking/

const getType = (x) => {
  if (x && x.constructor) {
    return x.constructor.name
  }
  return Object.prototype.toString.call(x).slice(8, -1)
}

const errUnexpectedType = (actual, expected) => {
  return TypeError(`expected type="${getType(expected)}", got "${getType(actual)}"`)
}

const isSameType = (x, y) => {
  return getType(x) === getType(y)
}

const hasSameType = (x, y) => {
  if (!x || !y) {
    return false
  }
  return (x['@type'] && y['@type'] && (x['@type'] === y['@type']));
};

const isCoalaObjectAndComparingToBase = (x, y) => {
  const dataInY = y
  const undefinedTypeAndContextInY = (y && typeof y['@type'] === 'undefined' && typeof y['@context'] === 'undefined')
  const undefinedTypeAndContextInX = (x && typeof x['@type'] === 'undefined' && typeof x['@context'] === 'undefined')
  if (!x || !dataInY || undefinedTypeAndContextInX || (!undefinedTypeAndContextInY && undefinedTypeAndContextInX)) {
    return false;
  }
  return ('@type' in x && '@context' in x)
};

exports.capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

exports.inherit = (child, parent) => {
  child.prototype = Object.create(parent.prototype)
  child.prototype.constructor = child
}

exports.isSubType = (child, parent) => {
  return (typeof parent === 'object' && child instanceof parent.constructor) || isSameType(child, parent) || hasSameType(child, parent) || isCoalaObjectAndComparingToBase(child, parent)
}

exports.order = x => {
    return JSON.parse(exports.orderStringify(x))
}

exports.orderStringify = (x, space) => {
    const keys = []
    JSON.stringify(x, (k, v) => {
        keys.push(k)
        if (v instanceof Array) {
            v.sort(exports.sort)
        }
        return v
    })
    return JSON.stringify(x, keys.sort(), space)
}

exports.propArray = (cls, expected, key) => {
  const capitalized = exports.capitalize(key)
  cls.prototype['get' + capitalized] = function () {
    return this[key]
  }
  cls.prototype['has' + capitalized] = function (actual) {
    const instances = this[key]
    for (let i = 0; i < instances.length; i++) {
      if (instances[i].equals(actual)) {
        return true
      }
    }
    return false
  }
  cls.prototype['add' + capitalized] = function (actual) {
    if (!exports.isSubType(actual, expected)) {
      throw errUnexpectedType(actual, expected)
    }
    const data = this
    if (!data[key]) {
      data[key] = []
    }
    data[key].push(actual)
  }
  cls.prototype['type' + capitalized] = expected.constructor
}

exports.propValue = (cls, expected, key) => {
  const capitalized = exports.capitalize(key)
  cls.prototype['get' + capitalized] = function () {
    return this[key]
  }
  cls.prototype['set' + capitalized] = function (actual) {
    if (!exports.isSubType(actual, expected)) {
      throw errUnexpectedType(actual, expected)
    }
    this[key] = actual
  }
  cls.prototype['type' + capitalized] = expected.constructor
}

exports.sort = (x, y) => {
  let i
  if (x instanceof Array && y instanceof Array) {
    x.sort(exports.sort)
    y.sort(exports.sort)
    let result
    for (i = 0; i < x.length && i < y.length; i++) {
      result = exports.sort(x[i], y[i])
      if (result) {
        return result
      }
    }
    return 0
  }
  if (x.constructor === Object && y.constructor === Object) {
      const xkeys = Object.keys(x).sort()
      const ykeys = Object.keys(y).sort()
      for (i = 0; i < xkeys.length && i < ykeys.length; i++) {
          if (xkeys[i] < ykeys[i]) {
            return -1
          }
          if (xkeys[i] > ykeys[i]) {
            return 1
          }
      }
      if (xkeys.length < ykeys.length) {
        return -1
      }
      if (xkeys.length > ykeys.length) {
        return 1
      }
      for (i = 0; i < xkeys.length && i < ykeys.length; i++) {
          if (x[xkeys[i]] < y[ykeys[i]]) {
            return -1
          }
          if (x[xkeys[i]] > y[ykeys[i]]) {
            return 1
          }
      }
      return 0
  }
  if (x < y) {
    return -1
  }
  if (x > y) {
    return 1
  }
  return 0
}
