declare namespace fileUrl {
	interface Options {
		/**
		Passing `false` will make it not call `path.resolve()` on the path.

		@default true
		*/
		readonly resolve?: boolean;
	}
}

/**
Convert a file path to a file URL.

@param filePath - File path to convert.
@returns The `filePath` converted to a file URL.

@example
```
import fileUrl = require('file-url');

fileUrl('unicorn.jpg');
//=> 'file:///Users/sindresorhus/dev/file-url/unicorn.jpg'

fileUrl('/Users/pony/pics/unicorn.jpg');
//=> 'file:///Users/pony/pics/unicorn.jpg'

fileUrl('unicorn.jpg', {resolve: false});
//=> 'file:///unicorn.jpg'
```
*/
declare function fileUrl(filePath: string, options?: fileUrl.Options): string;

export = fileUrl;
