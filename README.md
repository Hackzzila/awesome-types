# awesome-types
An awesome library for type checking on the fly.

## Functions

<dl>
<dt><a href="#watchObj">watchObj(obj, types)</a> ⇒ <code>Object</code></dt>
<dd><p>Watches an object, and when it changes it checks types.</p>
</dd>
<dt><a href="#watchArr">watchArr(arr, types)</a> ⇒ <code>Array</code></dt>
<dd><p>Watches an array, and when it changes it checks types.</p>
</dd>
<dt><a href="#watchFunc">watchFunc(func, types)</a> ⇒ <code>function</code></dt>
<dd><p>Watches an function, and when it gets called it checks argument types.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#type">type</a> : <code>String</code> | <code><a href="#type">Array.&lt;type&gt;</a></code></dt>
<dd><p>A type.
A type can be a string for checking against one type,
an array of types for checking against multiple types, or falsy for no type checking.
A type string is a value supported by <a href="https://www.npmjs.com/package/type-detect">type-detect</a>.</p>
</dd>
</dl>

<a name="watchObj"></a>

## watchObj(obj, types) ⇒ <code>Object</code>
Watches an object, and when it changes it checks types.

**Kind**: global function  
**Returns**: <code>Object</code> - A copy of the object. It watches this value, if you edit the object you passed into
the function, nothing will happen.  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The object to watch. |
| types | <code>Object.&lt;\*, type&gt;</code> | An object where the key is the property name, and the value is a type. |

**Example**  
```js
// Watches an empty object.
const obj = types.watchObj({}, { name: 'string', age: 'number' });
obj.name = 'foo';  // all good
obj.age = 'bar';   // throws error
obj.height = '12'; // ignored
```
**Example**  
```js
// Watches a non-empty object.
const obj = types.watchObj({
  name: 'foo',  // all good
  age: 'bar',   // throws error
  height: '12', // ignored
}, { name: 'string', age: 'number' });
```
<a name="watchArr"></a>

## watchArr(arr, types) ⇒ <code>Array</code>
Watches an array, and when it changes it checks types.

**Kind**: global function  
**Returns**: <code>Array</code> - A copy of the array. It watches this value, if you edit the array you passed into
the function, nothing will happen.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | The array to watch. |
| types | <code>[Array.&lt;type&gt;](#type)</code> | An array of types, where the type's index corresponds to the index of the value in the array. |

**Example**  
```js
// Watches an empty array.
const arr = types.watchArr([], ['string', 'number']);
arr.push('foo'); // all good
arr.push('bar'); // throws error
arr.push('12');  // ignored
```
**Example**  
```js
// Watches a non-empty array.
const arr = types.watchArr([
 'foo', // all good
 'bar', // throws error
 '12',  // ignored
], ['string', 'number']);
```
<a name="watchFunc"></a>

## watchFunc(func, types) ⇒ <code>function</code>
Watches an function, and when it gets called it checks argument types.

**Kind**: global function  
**Returns**: <code>function</code> - A copy of the function. It watches this value, if you edit the function you passed into
the function, nothing will happen.  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | The function to watch. |
| types | <code>[Array.&lt;type&gt;](#type)</code> | An array of types, where the type's index corresponds to the index of the argument. |

**Example**  
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
<a name="type"></a>

## type : <code>String</code> &#124; <code>[Array.&lt;type&gt;](#type)</code>
A type.
A type can be a string for checking against one type,
an array of types for checking against multiple types, or falsy for no type checking.
A type string is a value supported by [type-detect](https://www.npmjs.com/package/type-detect).

**Kind**: global typedef  
