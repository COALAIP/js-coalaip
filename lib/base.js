'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var parse = require('./parse');

var _require = require('./util'),
    isSubType = _require.isSubType,
    order = _require.order,
    sort = _require.sort;

function Base(context, type) {
  this['@context'] = context;
  this['@type'] = type;
}

Base.prototype.add = function (key, val) {
  if (!this[key]) {
    this[key] = [];
  }
  this[key].push(val);
};

Base.prototype.compare = function (other) {
  return sort(this.data(), other.data());
};

var transform = function transform(data, fn) {
  var keys = Object.keys(data);
  var result = Object.assign({}, data);
  var j = void 0,
      key = void 0;
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    if (isSubType(data[key], new Base())) {
      result[key] = fn(data[key]);
    } else if (data[key] instanceof Array && isSubType(data[key][0], new Base())) {
      result[key] = new Array(data[key].length);
      for (j = 0; j < data[key].length; j++) {
        result[key][j] = fn(data[key][j]);
      }
    }
  }
  return result;
};

Base.prototype.data = function (id) {
  var data = void 0;
  if (id) {
    data = Object.assign(_defineProperty({}, id, this.path), this);
  } else {
    data = this;
  }
  return transform(data, function (instance) {
    return instance.data(id);
  });
};

Base.prototype.dataOrdered = function (id) {
  return order(this.data(id));
};

Base.prototype.ipld = function () {
  return transform(this, function (instance) {
    return {
      '/': instance.path
    };
  });
};

Base.prototype.ipldOrdered = function () {
  return order(this.ipld());
};

Base.prototype.equals = function (other) {
  return !this.compare(other);
};

Base.prototype.rm = function (key, idx) {
  if (!this[key]) {
    throw new Error('could not find key="' + key + '"');
  }
  if (this[key] instanceof Array && typeof idx === 'number') {
    this[key].splice(idx, 1);
  } else {
    delete this[key];
  }
};

Base.prototype.set = function (key, val) {
  this[key] = val;
};

Base.prototype.subInstances = function () {
  var tree = this.tree();
  var i = void 0,
      j = void 0;
  for (i = 0; i < tree.length; i++) {
    tree[i] = tree[i].value;
    for (j = i + 1; j < tree.length;) {
      if (tree[i].equals(tree[j].value)) {
        tree.splice(j, 1);
      } else {
        j++;
      }
    }
  }
  return tree;
};

Base.prototype.tree = function () {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var arr = [];
  var keys = Object.keys(this);
  var i = void 0,
      j = void 0;
  for (i = 0; i < keys.length; i++) {
    if (isSubType(this[keys[i]], new Base())) {
      arr.push.apply(arr, _toConsumableArray(this[keys[i]].tree(key + '/' + keys[i])));
    }
    if (this[keys[i]] instanceof Array) {
      for (j = 0; j < this[keys[i]].length; j++) {
        if (isSubType(this[keys[i]][j], new Base())) {
          arr.push.apply(arr, _toConsumableArray(this[keys[i]][j].tree(key + '/' + keys[i])));
        }
      }
    }
  }
  arr.push({
    key: key,
    value: this
  });
  return arr;
};

Base.prototype.withData = function (data) {
  delete data['@context'];
  delete data['@type'];
  parse(data, this);
};

module.exports = Base;