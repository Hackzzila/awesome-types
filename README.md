# awesome-types
An awesome library for type checking on the fly.

A `type` is a string supported by [type-detect](https://www.npmjs.com/package/type-detect).
A `type` can also be `false` for no type checking.

awesome-types allows values of all types to also be `null` or `undefined`.

There are three main functions provided.

## watchObj({ obj }, { types })
This function watches an object, and when it changes it checks types.

`types` is an object where the key is the property name, and the value is a type.
It returns a copy of the object. Note: it *only* watches the returned value, if you edit the object you passed into
the function, nothing will happen.

Examples:

```js
// Watches an empty object.
const obj = types.watchObj({}, { name: 'string', age: 'number' });
obj.name = 'foo';  // all good
obj.age = 'bar';   // throws error
obj.height = '12'; // ignored
```

```js
// Watches a non-empty object.
const obj = types.watchObj({
  name: 'foo',  // all good
  age: 'bar',   // throws error
  height: '12', // ignored
}, { name: 'string', age: 'number' });
```

## watchArr([ arr ], [ types ])
This function watches an array, and when it changes it checks types.

`types` is an array of types, where the type's index corresponds to the index of the value in the array.
It returns a copy of the array. Note: it *only* watches the returned value, if you edit the array you passed into
the function, nothing will happen.

Examples:

```js
// Watches an empty array.
const arr = types.watchArr([], ['string', 'number']);
arr.push('foo'); // all good
arr.push('bar'); // throws error
arr.push('12');  // ignored
```

```js
// Watches a non-empty array.
const arr = types.watchArr([
  'foo', // all good
  'bar', // throws error
  '12',  // ignored
], ['string', 'number']);
```

## watchFunc(() => { func }, [ types ])
This function watches an function, and when it gets called it checks argument types.

`types` is an array of types, where the type's index corresponds to the index of the argument.
It returns a copy of the function. Note: it *only* watches the returned value, if you call the function you passed into
the watchFunc, nothing will happen.

Examples:

```js
// Watches a function.
const func = types.watchFunc((name, age, height) => {
  console.log(name, age, height);
}, ['string', 'number']);
func(
  'foo', // all good
  'bar', // throws error
  '12'   // ignored
);
```