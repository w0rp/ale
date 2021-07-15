var util = require("util");
var Glob = require("glob").Glob;
var EventEmitter = require("events").EventEmitter;

// helper class to store and compare glob results
function File(pattern1, patternId1, path1, fileId1) {
  this.pattern = pattern1;
  this.patternId = patternId1;
  this.path = path1;
  this.fileId = fileId1;
  this.include = true;
  while (this.pattern.charAt(0) === "!") {
    this.include = !this.include;
    this.pattern = this.pattern.substr(1);
  }
}

File.prototype.stars = /((\/\*\*)?\/\*)?\.(\w+)$/;

// strip stars and compare pattern length
// longest length wins
File.prototype.compare = function(other) {
  var p1 = this.pattern.replace(this.stars, "");
  var p2 = other.pattern.replace(this.stars, "");
  if (p1.length > p2.length) {
    return this;
  } else {
    return other;
  }
};

File.prototype.toString = function() {
  return this.path + " (" + this.patternId + ": " + this.fileId + ": " + this.pattern + ")";
};

// using standard node inheritance
util.inherits(GlobAll, EventEmitter);

// allows the use arrays with "node-glob"
// interatively combines the resulting arrays
// api is exactly the same
function GlobAll(sync, patterns, opts, callback) {
  if (opts == null) {
    opts = {};
  }
  EventEmitter.call(this);
  // init array
  if (typeof patterns === "string") {
    patterns = [patterns];
  }
  if (!(patterns instanceof Array)) {
    return (typeof callback === "function") ? callback("Invalid input") : null;
  }
  // use copy of array
  this.patterns = patterns.slice();
  // no opts provided
  if (typeof opts === "function") {
    callback = opts;
    opts = {};
  }
  // allow sync+nocallback or async+callback
  if (sync !== (typeof callback !== "function")) {
    throw new Error("should" + (sync ? " not" : "") + " have callback");
  }
  // all globs share the same stat cache
  this.statCache = opts.statCache = opts.statCache || {};
  opts.sync = sync;
  this.opts = opts;
  this.set = {};
  this.results = null;
  this.globs = [];
  this.callback = callback;
  // bound functions
  this.globbedOne = this.globbedOne.bind(this);
}

GlobAll.prototype.run = function() {
  this.globNext();
  return this.results;
};

GlobAll.prototype.globNext = function() {
  var g, pattern, include = true;
  if (this.patterns.length === 0) {
    return this.globbedAll();
  }
  pattern = this.patterns[0]; // peek!
  // check whether this is an exclude pattern and
  // strip the leading ! if it is
  if (pattern.charAt(0) === "!") {
    include = false;
    pattern = pattern.substr(1);
  }
  // run
  if (this.opts.sync) {
    // sync - callback straight away
    g = new Glob(pattern, this.opts);
    this.globs.push(g);
    this.globbedOne(null, include, g.found);
  } else {
    // async
    var self = this;
    g = new Glob(pattern, this.opts, function(err, files) {
      self.globbedOne(err, include, files);
    });
    this.globs.push(g);
  }
};

// collect results
GlobAll.prototype.globbedOne = function(err, include, files) {
  // handle callback error early
  if (err) {
    if (!this.callback) {
      this.emit("error", err);
    }
    this.removeAllListeners();
    if (this.callback) {
      this.callback(err);
    }
    return;
  }
  var patternId = this.patterns.length;
  var pattern = this.patterns.shift();
  // insert each into the results set
  for (var fileId = 0; fileId < files.length; fileId++) {
    // convert to file instance
    var path = files[fileId];
    var f = new File(pattern, patternId, path, fileId);
    var existing = this.set[path];
    // new item
    if (!existing) {
      if (include) {
        this.set[path] = f;
        this.emit("match", path);
      }
      continue;
    }
    // compare or delete
    if (include) {
      this.set[path] = f.compare(existing);
    } else {
      delete this.set[path];
    }
  }
  // run next
  this.globNext();
};

GlobAll.prototype.globbedAll = function() {
  // map result set into an array
  var files = [];
  for (var k in this.set) {
    files.push(this.set[k]);
  }
  // sort files by index
  files.sort(function(a, b) {
    if (a.patternId < b.patternId) {
      return 1;
    }
    if (a.patternId > b.patternId) {
      return -1;
    }
    if (a.fileId >= b.fileId) {
      return 1;
    } else {
      return -1;
    }
  });
  // finally, convert back into a path string
  this.results = files.map(function(f) {
    return f.path;
  });
  this.emit("end");
  this.removeAllListeners();
  // return string paths
  if (!this.opts.sync) {
    this.callback(null, this.results);
  }
  return this.results;
};

// expose
var globAll = function(array, opts, callback) {
  var g = new GlobAll(false, array, opts, callback);
  g.run(); //async, so results are empty
  return g;
};

// sync is actually the same function :)
globAll.sync = function(array, opts) {
  return new GlobAll(true, array, opts).run();
};

module.exports = globAll;
