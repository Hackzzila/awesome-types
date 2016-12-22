const type = require('type-detect');

/**
 * A type.
 * A type can be a string for checking against one type,
 * an array of types for checking against multiple types, or falsy for no type checking.
 * A type string is a value supported by [type-detect](https://www.npmjs.com/package/type-detect).
 * @typedef {String|Array<type>} type
 */

/**
 * Watches an object, and when it changes it checks types.
 * @param {Object} - The object to watch.
 * @param {Object<*, type>} - An object where the key is the property name, and the value is a type.
 * @returns {Object} A copy of the object. It watches this value, if you edit the object you passed into
the function, nothing will happen.
 * @example
 * // Watches an empty object.
 * const obj = types.watchObj({}, { name: 'string', age: 'number' });
 * obj.name = 'foo';  // all good
 * obj.age = 'bar';   // throws error
 * obj.height = '12'; // ignored
 * @example
 * // Watches a non-empty object.
 * const obj = types.watchObj({
 *   name: 'foo',  // all good
 *   age: 'bar',   // throws error
 *   height: '12', // ignored
 * }, { name: 'string', age: 'number' });
 */
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

/**
 * Watches an array, and when it changes it checks types.
 * @param {Array} - The array to watch.
 * @param {Array<type>} - An array of types, where the type's index corresponds to the index of the value in the array.
 * @returns {Array} A copy of the array. It watches this value, if you edit the array you passed into
the function, nothing will happen.
 * @example
 * // Watches an empty array.
 * const arr = types.watchArr([], ['string', 'number']);
 * arr.push('foo'); // all good
 * arr.push('bar'); // throws error
 * arr.push('12');  // ignored
 * @example
 * // Watches a non-empty array.
 * const arr = types.watchArr([
 *  'foo', // all good
 *  'bar', // throws error
 *  '12',  // ignored
 * ], ['string', 'number']);
 */
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

/**
 * Watches an function, and when it gets called it checks argument types.
 * @param {Function} - The function to watch.
 * @param {Array<type>} - An array of types, where the type's index corresponds to the index of the argument.
 * @returns {Function} A copy of the function. It watches this value, if you edit the function you passed into
the function, nothing will happen.
 * @example
 * // Watches a function.
 * const func = types.watchFunc((name, age, height) => {
 *   console.log(name, age, height);
 * }, ['string', 'number']);
 * func(
 *   'foo', // all good
 *   'bar', // throws error
 *   '12'   // ignored
 * );
 */
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
