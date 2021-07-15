# p-settle [![Build Status](https://travis-ci.org/sindresorhus/p-settle.svg?branch=master)](https://travis-ci.org/sindresorhus/p-settle)

> Settle promises concurrently and get their fulfillment value or rejection reason


## Install

```
$ npm install p-settle
```


## Usage

```js
const pSettle = require('p-settle');
const promisify = require('pify');
const fs = promisify(require('fs'));

const files = [
	'a.txt',
	'b.txt' // Doesn't exist
].map(x => fs.readFile(x, 'utf8'));

pSettle(files).then(result => {
	console.log(result);
	/*
	[{
		isFulfilled: true,
		isRejected: false,
		value: '🦄'
	},
	{
		isFulfilled: false,
		isRejected: true,
		reason: [Error: ENOENT: no such file or directory, open 'b.txt']
	}]
	*/
});
```


## API

### pSettle(input, [options])

Returns a `Promise` that is fulfilled when all promises in `input` are settled.

The fulfilled value is an array of objects with the following properties:

- `isFulfilled`
- `isRejected`
- `value` or `reason` *(Depending on whether the promise fulfilled or rejected)*

#### input

Type: `Iterable<Promise|any>`

#### options

Type: `Object`

##### concurrency

Type: `number`<br>
Default: `Infinity`<br>
Minimum: `1`

Number of concurrently pending promises.


## Related

- [p-reflect](https://github.com/sindresorhus/p-reflect) - Make a promise always fulfill with its actual fulfillment value or rejection reason
- [p-map](https://github.com/sindresorhus/p-map) - Map over promises concurrently
- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
