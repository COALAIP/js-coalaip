'use strict'

const parse = require('./parse')

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

Base.prototype.add = function (key, val) {
  const data = this._data
  if (!data[key]) {
    data[key] = []
  }
  data[key].push(val)
}

Base.prototype.compare = function (other) {
  return sort(this.data(), other.data())
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
    } else if (data[key] instanceof Array && isSubType(data[key][0], new Base())) {
      result[key] = new Array(data[key].length)
      for (j = 0; j < data[key].length; j++) {
        result[key][j] = fn(data[key][j])
      }
    }
  }
  return result
}

Base.prototype.equals = function (other) {
  return !this.compare(other)
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

Base.prototype.set = function (key, val) {
  this._data[key] = val
}

Base.prototype.subInstances = function () {
  const tree = this.tree()
  let i, j
  for (i = 0; i < tree.length; i++) {
    tree[i] = tree[i].value
    for (j = i+1; j < tree.length; ) {
      if (tree[i].equals(tree[j].value)) {
        tree.splice(j, 1)
      } else {
        j++
      }
    }
  }
  return tree
}

Base.prototype.tree = function (key = '') {
  const arr = []
  const data = this._data
  const keys = Object.keys(data)
  let i, j, sub
  for (i = 0; i < keys.length; i++) {
    if (isSubType(data[keys[i]], new Base())) {
      arr.push(...data[keys[i]].tree(key + '/' + keys[i]))
    }
    if (data[keys[i]] instanceof Array) {
      for (j = 0; j < data[keys[i]].length; j++) {
        if (isSubType(data[keys[i]][j], new Base())) {
          arr.push(...data[keys[i]][j].tree(key + '/' + keys[i]))
        }
      }
    }
  }
  arr.push({
    key,
    value: this
  })
  return arr
}

Base.prototype.withData = function (data, ...modules) {
  const registry = Object.assign({}, ...modules)
  delete data['@context']
  delete data['@type']
  parse(data, registry, [], this)
}

module.exports = Base
