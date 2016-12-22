const type = require('type-detect');

function watchObj(obj, types) {
  if (type(obj) !== 'Object') throw new TypeError(`'${obj}' is not of type 'Object'`);
  if (type(types) !== 'Object') throw new TypeError(`'${types}' is not of type 'Object'`);

  for (const key in types) {
    if (types[key] && obj[key] !== undefined && obj[key] !== null && type(obj[key]) !== types[key]) {
      throw new TypeError(`'${obj[key]}' is not of type '${types[key]}'`);
    }
  }

  return new Proxy(obj, {
    set: (o, prop, value) => {
      if (types[prop] && value !== undefined && value !== null && type(value) !== types[prop]) {
        throw new TypeError(`'${value}' is not of type '${types[prop]}'`);
      }

      o[prop] = value;
      return true;
    },
  });
}

function watchArr(arr, types) {
  if (type(arr) !== 'Array') throw new TypeError(`'${arr}' is not of type 'Array'`);
  if (type(types) !== 'Array') throw new TypeError(`'${types}' is not of type 'Array'`);

  for (const key in types) {
    if (types[key] && arr[key] !== undefined && arr[key] !== null && type(arr[key]) !== types[key]) {
      throw new TypeError(`'${arr[key]}' is not of type '${types[key]}'`);
    }
  }

  return new Proxy(arr, {
    set: (o, prop, value) => {
      if (types[prop] && value !== undefined && value !== null && type(value) !== types[prop]) {
        throw new TypeError(`'${value}' is not of type '${types[prop]}'`);
      }

      o[prop] = value;
      return true;
    },
  });
}

function watchFunc(func, types) {
  if (type(func) !== 'function') throw new TypeError(`'${func}' is not of type 'function'`);
  if (type(types) !== 'Array') throw new TypeError(`'${types}' is not of type 'Array'`);

  return new Proxy(func, {
    apply: (target, thisArg, argumentsList) => {
      for (const i in argumentsList) {
        if (types[i] && argumentsList[i] !== undefined && argumentsList[i] !== null && type(argumentsList[i]) !== types[i]) {
          throw new TypeError(`'${argumentsList[i]}' is not of type '${types[i]}'`);
        }
      }

      return target.apply(thisArg, argumentsList);
    },
  });
}

module.exports = { watchArr, watchFunc, watchObj };
