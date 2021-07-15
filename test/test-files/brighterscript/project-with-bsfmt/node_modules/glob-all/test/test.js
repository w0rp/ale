var test = require('tape');
var glob = require('../');

process.chdir('example/');

test('basic', function (t) {
  //set total
  t.plan(2);
  //1
  glob([
    'files/**',
    '!files/x/**',
    'files/x/z.txt'
  ], {
    mark: true
  }, function(err, files) {
    t.deepEqual(files, [ 'files/',
      'files/a.txt',
      'files/b.txt',
      'files/c.txt',
      'files/x/z.txt'
    ]);
  });
  //2
  var files = glob.sync([
    'files/**',
    '!files/x/**',
    'files/x/z.txt'
  ]);
  t.deepEqual(files, [
    'files',
    'files/a.txt',
    'files/b.txt',
    'files/c.txt',
    'files/x/z.txt'
  ]);
});
