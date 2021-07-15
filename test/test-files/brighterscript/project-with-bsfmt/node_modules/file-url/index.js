'use strict';
const path = require('path');

module.exports = (filePath, options) => {
	if (typeof filePath !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof filePath}`);
	}

	options = {
		resolve: true,
		...options
	};

	let pathName = filePath;

	if (options.resolve) {
		pathName = path.resolve(filePath);
	}

	pathName = pathName.replace(/\\/g, '/');

	// Windows drive letter must be prefixed with a slash
	if (pathName[0] !== '/') {
		pathName = `/${pathName}`;
	}

	// Escape required characters for path components
	// See: https://tools.ietf.org/html/rfc3986#section-3.3
	return encodeURI(`file://${pathName}`).replace(/[?#]/g, encodeURIComponent);
};
