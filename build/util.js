'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.COALAIP = 'http://coalaip.org';
exports.SCHEMA = 'http://schema.org';

// adapted from https://toddmotto.com/understanding-javascript-types-and-reliable-type-checking/

var getType = function getType(x) {
  if (x && x.constructor) {
    return x.constructor.name;
  }
  return Object.prototype.toString.call(x).slice(8, -1);
};

var errUnexpectedType = function errUnexpectedType(actual, expected) {
  return TypeError('expected type="' + getType(expected) + '", got "' + getType(actual) + '"');
};

var isSameType = function isSameType(x, y) {
  return getType(x) === getType(y);
};

exports.capitalize = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

exports.inherit = function (child, parent) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
};

exports.isSubType = function (child, parent) {
  return (typeof parent === 'undefined' ? 'undefined' : _typeof(parent)) === 'object' && child instanceof parent.constructor || isSameType(child, parent);
};

exports.order = function (x) {
  return JSON.parse(exports.orderStringify(x));
};

exports.orderStringify = function (x, space) {
  var keys = [];
  JSON.stringify(x, function (k, v) {
    keys.push(k);
    if (v instanceof Array) {
      v.sort(exports.sort);
    }
    return v;
  });
  return JSON.stringify(x, keys.sort(), space);
};

exports.propArray = function (cls, expected, key) {
  var capitalized = exports.capitalize(key);
  cls.prototype['get' + capitalized] = function () {
    return this._data[key];
  };
  cls.prototype['has' + capitalized] = function (actual) {
    var instances = this._data[key];
    for (var i = 0; i < instances.length; i++) {
      if (instances[i].equals(actual)) {
        return true;
      }
    }
    return false;
  };
  cls.prototype['add' + capitalized] = function (actual) {
    if (!exports.isSubType(actual, expected)) {
      throw errUnexpectedType(actual, expected);
    }
    var data = this._data;
    if (!data[key]) {
      data[key] = [];
    }
    data[key].push(actual);
  };
  cls.prototype['type' + capitalized] = expected.constructor;
};

exports.propValue = function (cls, expected, key) {
  var capitalized = exports.capitalize(key);
  cls.prototype['get' + capitalized] = function () {
    return this._data[key];
  };
  cls.prototype['set' + capitalized] = function (actual) {
    if (!exports.isSubType(actual, expected)) {
      throw errUnexpectedType(actual, expected);
    }
    this._data[key] = actual;
  };
  cls.prototype['type' + capitalized] = expected.constructor;
};

exports.sort = function (x, y) {
  var i = void 0;
  if (x instanceof Array && y instanceof Array) {
    x.sort(exports.sort);
    y.sort(exports.sort);
    var result = void 0;
    for (i = 0; i < x.length && i < y.length; i++) {
      result = exports.sort(x[i], y[i]);
      if (result) {
        return result;
      }
    }
    return 0;
  }
  if (x.constructor === Object && y.constructor === Object) {
    var xkeys = Object.keys(x).sort();
    var ykeys = Object.keys(y).sort();
    for (i = 0; i < xkeys.length && i < ykeys.length; i++) {
      if (xkeys[i] < ykeys[i]) {
        return -1;
      }
      if (xkeys[i] > ykeys[i]) {
        return 1;
      }
    }
    if (xkeys.length < ykeys.length) {
      return -1;
    }
    if (xkeys.length > ykeys.length) {
      return 1;
    }
    for (i = 0; i < xkeys.length && i < ykeys.length; i++) {
      if (x[xkeys[i]] < y[ykeys[i]]) {
        return -1;
      }
      if (x[xkeys[i]] > y[ykeys[i]]) {
        return 1;
      }
    }
    return 0;
  }
  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }
  return 0;
};