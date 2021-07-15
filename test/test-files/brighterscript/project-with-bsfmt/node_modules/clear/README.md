clear
=====

Clear the terminal screen if possible

Usage
-----

``` js
var clear = require('clear');
clear();
```

Example
-------

![Node Clear](http://daveeddy.com/static/media/github/node-clear.gif)

### clear([opts])

- `opts` (Object)
- `opts.fullClear` (Boolean) Defaults to `true`, setting this to `false` will
  prevent this module from clearing the screen.  This will not remove anything
  from the screen, but instead move your cursor to position 0,0.  Much like
  printing a `\r` instead of a `\n` to reset the current line of output.

Installation
------------

    npm install clear

ANSI Codes
----------

http://www.inwap.com/pdp10/ansicode.txt

License
-------

MIT
