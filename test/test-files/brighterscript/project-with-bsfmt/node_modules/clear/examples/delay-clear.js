#!/usr/bin/env node
var clear = require('..'),
    delay = 4; // seconds

console.log('Screen will clear in %d seconds', delay);
setTimeout(function() {
  clear();
}, delay * 1000);
