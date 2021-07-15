'use strict';

module.exports = promise => Promise.resolve(promise).then(
	value => ({
		isFulfilled: true,
		isRejected: false,
		value
	}),
	reason => ({
		isFulfilled: false,
		isRejected: true,
		reason
	})
);
