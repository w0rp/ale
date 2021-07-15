# debounce-promise

[![Build Status](https://travis-ci.org/bjoerge/debounce-promise.svg)](https://travis-ci.org/bjoerge/debounce-promise)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

[![NPM](https://nodei.co/npm/debounce-promise.png)](https://nodei.co/npm/debounce-promise/)

Create a debounced version of a promise returning function

## Install

    npm i -S debounce-promise


## Usage example

```js

var debounce = require('debounce-promise')

function expensiveOperation(value) {
  return Promise.resolve(value)
}

var saveCycles = debounce(expensiveOperation, 100);

[1, 2, 3, 4].forEach(num => {
  return saveCycles('call no #' + num).then(value => {
    console.log(value)
  })
})

// Will only call expensiveOperation once with argument `4` and print:
//=> call no #4
//=> call no #4
//=> call no #4
//=> call no #4
```

### With leading=true

```js
var debounce = require('debounce-promise')

function expensiveOperation(value) {
  return Promise.resolve(value)
}

var saveCycles = debounce(expensiveOperation, 100, {leading: true});

[1, 2, 3, 4].forEach(num => {
  return saveCycles('call no #' + num).then(value => {
    console.log(value)
  })
})

//=> call no #1
//=> call no #4
//=> call no #4
//=> call no #4
```

### With accumulate=true

```js
var debounce = require('debounce-promise')

function squareValues (argTuples) {
  return Promise.all(argTuples.map(args => args[0] * args[0]))
}

var square = debounce(squareValues, 100, {accumulate: true});

[1, 2, 3, 4].forEach(num => {
  return square(num).then(value => {
    console.log(value)
  })
})

//=> 1
//=> 4
//=> 9
//=> 16
```

## Api
`debounce(func, [wait=0], [{leading: true|false, accumulate: true|false})`

Returns a debounced version of `func` that delays invoking until after `wait` milliseconds.

Set `leading: true` if you
want to call `func` and return its promise immediately.

Set `accumulate: true` if you want the debounced function to be called with an array of all the arguments received while waiting.

Supports passing a function as the `wait` parameter, which provides a way to lazily or dynamically define a wait timeout.


## Example timeline illustration

```js
function refresh() {
  return fetch('/my/api/something')
}
const debounced = debounce(refresh, 100)
```

```
time (ms) ->   0 ---  10  ---  50  ---  100 ---
-----------------------------------------------
debounced()    | --- P(1) --- P(1) --- P(1) ---
refresh()      | --------------------- P(1) ---
```

```js
const debounced = debounce(refresh, 100, {leading: true})
```
```
time (ms) ->   0 ---  10  ---  50  ---  100 ---  110 ---
--------------------------------------------------------
debounced()    | --- P(1) --- P(2) --- P(2) --- P(2) ---
refresh()      | --- P(1) --------------------- P(2) ---
```
