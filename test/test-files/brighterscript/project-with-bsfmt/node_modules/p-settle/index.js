'use strict';
const pReflect = require('p-reflect');
const pLimit = require('p-limit');

module.exports = (iterable, opts) => {
	opts = Object.assign({
		concurrency: Infinity
	}, opts);

	if (!(typeof opts.concurrency === 'number' && opts.concurrency >= 1)) {
		throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${opts.concurrency}\` (${typeof opts.concurrency})`);
	}

	const limit = pLimit(opts.concurrency);
	return Promise.all(iterable.map(item => pReflect(limit(() => item))));
};
