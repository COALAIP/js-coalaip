'use strict'

const {
  isSubType,
  sort
} = require('./util')

function Base (context, type) {
  this._data = {
    '@context': context,
    '@type': type
  }
}

Base.prototype.compare = function (other) {
  return sort(this.data(), other.data())
}

Base.prototype.equals = function (other) {
  return !this.compare(other)
}

Base.prototype.tree = function () {
  const arr = []
  const data = this._data
  const keys = Object.keys(data)
  let i, j, key, sub
  for (i = 0; i < keys.length; i++) {
    key = keys[i]
    if (isSubType(data[key], new Base())) {
      arr.push(...data[key].tree())
    }
    if (data[key] instanceof Array) {
      for (j = 0; j < data[key].length; j++) {
        if (isSubType(data[key][j], new Base())) {
          arr.push(...data[key][j].tree())
        }
      }
    }
  }
  arr.push(this)
  return Array.from(new Set(arr))
}

Base.prototype.data = function (format) {
  let fn
  if (format === 'ipld') {
    fn = instance => {
      return {
        '/': instance.path
      }
    }
  } else if (format === 'jsonld') {
    fn = instance => {
      return {
        '@id': instance.path
      }
    }
  } else if (!format) {
    fn = instance => {
      return instance.data()
    }
  } else {
    throw new Error('unexpected format: ' + format)
  }
  const data = this._data
  const keys = Object.keys(data)
  const result = Object.assign({}, data)
  let j, key
  for (let i = 0; i < keys.length; i++) {
    key = keys[i]
    if (isSubType(data[key], new Base())) {
      result[key] = fn(data[key])
    }
    if (data[key] instanceof Array) {
      result[key] = new Array(data[key].length)
      for (j = 0; j < data[key].length; j++) {
        result[key][j] = fn(data[key][j])
      }
    }
  }
  return result
}

Base.prototype.rm = function (key, idx) {
  const data = this._data
  if (!data[key]) {
    throw new Error(`could not find key="${key}"`)
  }
  if (data[key] instanceof Array && typeof idx === 'number') {
    data[key].splice(idx, 1)
  } else {
    delete data[key]
  }
}

// for testing

Base.prototype.add = function (key, val, fn) {
  const data = this._data
  if (!data[key]) {
    data[key] = []
  }
  if (fn) {
    data[key].push(fn(val))
  } else {
    data[key].push(val)
  }
}

Base.prototype.set = function (key, val, fn) {
  const data = this._data
  if (fn) {
    data[key] = fn(val)
  } else {
    data[key] = val
  }
}

module.exports = Base
