'use strict';

var _require = require('./util'),
    capitalize = _require.capitalize,
    sort = _require.sort;

function parse(data, instance) {
  var subInstances = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var keys = Object.keys(data);
  var i = void 0,
      j = void 0,
      key = void 0,
      method = void 0;
  for (i = 0; i < keys.length; i++) {
    key = keys[i];
    var capitalized = capitalize(key);
    if (instance[method = 'add' + capitalized]) {
      if (data[key] instanceof Array) {
        for (j = 0; j < data[key].length; j++) {
          if (data[key][j].constructor === Object) {
            parseSubInstance(capitalized, data[key][j], instance, method, subInstances);
          } else {
            instance[method](data[key][j]);
          }
        }
      } else {
        if (data[key].constructor === Object) {
          parseSubInstance(capitalized, data[key], instance, method, subInstances);
        } else {
          instance[method](data[key]);
        }
      }
    } else if (instance[method = 'set' + capitalized]) {
      if (data[key].constructor === Object) {
        parseSubInstance(capitalized, data[key], instance, method, subInstances);
      } else {
        instance[method](data[key]);
      }
    } else {
      instance[key] = data[key];
    }
  }
  return instance;
}

function parseSubInstance(capitalized, data, instance, method, subInstances) {
  for (var i = 0; i < subInstances.length; i++) {
    if (!sort(data, subInstances[i])) {
      instance[method](subInstances[i]);
      return;
    }
  }
  var cls = instance['type' + capitalized];
  var result = void 0;
  if (data['/'] && Object.keys(data).length === 1) {
    result = new cls();
    result.path = data['/'];
  } else {
    result = parse(data, new cls(), subInstances);
  }
  instance[method](result);
  subInstances.push(result);
}

module.exports = parse;
