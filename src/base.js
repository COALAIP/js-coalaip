'use strict'

const parse = require('./parse')

const {
  isSubType,
  order,
  sort
} = require('./util')

function Base (context, type) {
  this['@context'] = context;
  this['@type'] = type;
}

Base.prototype.add = function (key, val) {
  if (!this[key]) {
    this[key] = []
  }
  this[key].push(val)
}

Base.prototype.compare = function (other) {
  return sort(this.data(), other.data())
}

const transform = function (data, fn) {
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

Base.prototype.data = function (id) {
  let data
  if (id) {
    data = Object.assign({
      [id]: this.path
    }, this)
  } else {
    data = this
  }
  return transform(data, instance => {
    return instance.data(id)
  })
}

Base.prototype.dataOrdered = function (id) {
  return order(this.data(id))
}

Base.prototype.ipld = function () {
  return transform(this, instance => {
    return {
      '/': instance.path
    }
  })
}

Base.prototype.ipldOrdered = function () {
  return order(this.ipld())
}

Base.prototype.equals = function (other) {
  return !this.compare(other)
}

Base.prototype.rm = function (key, idx) {
  if (!this[key]) {
    throw new Error(`could not find key="${key}"`)
  }
  if (this[key] instanceof Array && typeof idx === 'number') {
    this[key].splice(idx, 1)
  } else {
    delete this[key]
  }
}

Base.prototype.set = function (key, val) {
  this[key] = val
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
  const keys = Object.keys(this)
  let i, j
  for (i = 0; i < keys.length; i++) {
    if (isSubType(this[keys[i]], new Base())) {
      arr.push(...this[keys[i]].tree(key + '/' + keys[i]))
    }
    if (this[keys[i]] instanceof Array) {
      for (j = 0; j < this[keys[i]].length; j++) {
        if (isSubType(this[keys[i]][j], new Base())) {
          arr.push(...this[keys[i]][j].tree(key + '/' + keys[i]))
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

Base.prototype.withData = function (data) {
  delete data['@context']
  delete data['@type']
  parse(data, this)
}

module.exports = Base
