# p-reflect [![Build Status](https://travis-ci.org/sindresorhus/p-reflect.svg?branch=master)](https://travis-ci.org/sindresorhus/p-reflect)

> Make a promise always fulfill with its actual fulfillment value or rejection reason

Useful when you want a promise to fulfill no matter what and would rather handle the actual state afterwards.


## Install

```
$ npm install --save p-reflect
```


## Usage

Here, `Promise.all` would normally fail early because one of the promises rejects, but by using `p-reflect`, we can ignore the rejection and handle it later on.

```js
const pReflect = require('p-reflect');

const promises = [
	getPromise(),
	getPromiseThatRejects(),
	getPromise()
];

Promise.all(promises.map(reflect)).then(result => {
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
		reason: [Error: 👹]
	},
	{
		isFulfilled: true,
		isRejected: false,
		value: '🐴'
	}]
	*/

	const ret = f.filter(x => x.isFulfilled).map(x => x.value).join('');
	console.log(ret);
	//=> '🦄🐴'
});
```

The above is just an example. Use [`p-settle`](https://github.com/sindresorhus/p-settle) if you need this.


## API

### pReflect(input)

Returns a fulfilled `Promise`.

The fulfilled value is an object with the following properties:

- `isFulfilled`
- `isRejected`
- `value` or `reason` *(Depending on whether the promise fulfilled or rejected)*

#### input

Type: `Promise`


## Related

- [p-settle](https://github.com/sindresorhus/p-settle) - Settle promises concurrently and get their fulfillment value or rejection reason
- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
