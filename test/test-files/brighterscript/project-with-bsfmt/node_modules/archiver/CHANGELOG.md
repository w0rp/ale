## Changelog

**3.1.1** - <small>_August 2, 2019_</small> — [Diff](https://github.com/archiverjs/node-archiver/compare/3.1.0...3.1.1)

- update zip-stream to v2.1.2

**3.1.0** - <small>_August 2, 2019_</small> — [Diff](https://github.com/archiverjs/node-archiver/compare/3.0.3...3.1.0)

- update zip-stream to v2.1.0

**3.0.3** - <small>_July 19, 2019_</small> — [Diff](https://github.com/archiverjs/node-archiver/compare/3.0.2...3.0.3)

- test: now targeting node v12
- other: update zip-stream@2.0.0

**3.0.2** - <small>_July 19, 2019_</small> — [Diff](https://github.com/archiverjs/node-archiver/compare/3.0.1...3.0.2)

- other: update dependencies

**3.0.1** - <small>_July 19, 2019_</small> — [Diff](https://github.com/archiverjs/node-archiver/compare/3.0.0...3.0.1)

- other: update dependencies
- docs: now deployed using netlify

**3.0.0** - <small>_August 22, 2018_</small> — [Diff](https://github.com/archiverjs/node-archiver/compare/2.1.1...3.0.0)

- breaking: follow node LTS, remove support for versions under 6. (#339)
- bugfix: use stats in tar.js and core.js (#326)
- other: update to archiver-utils@2 and zip-stream@2
- other: remove lodash npm module usage (#335, #339)
- other: Avoid using deprecated Buffer constructor (#312)
- other: Remove unnecessary return and fix indentation (#297)
- test: now targeting node v10 (#320)

**2.1.1** — <small>_January 10, 2018_</small> — [Diff](https://github.com/archiverjs/node-archiver/compare/2.1.0...2.1.1)

- bugfix: fix relative symlink paths (#293)
- other: coding style fixes (#294)

**2.1.0** — <small>_October 12, 2017_</small> — [Diff](https://github.com/archiverjs/node-archiver/compare/2.0.3...2.1.0)

- refactor: `directory` now uses glob behind the scenes. should fix some directory recursion issues. (#267, #275)
- docs: more info in quick start. (#284)

**2.0.3** — <small>_August 25, 2017_</small> — [Diff](https://github.com/archiverjs/node-archiver/compare/2.0.2...2.0.3)

- bugfix: revert #261 due to potential issues with editing entryData in special cases.
- bugfix: add var to entryData in glob callback (#273)

**2.0.2** — <small>_August 25, 2017_</small> — [Diff](https://github.com/archiverjs/node-archiver/compare/2.0.1...2.0.2)

- docs: fix changelog date.

**2.0.1** — <small>_August 25, 2017_</small> — [Diff](https://github.com/archiverjs/node-archiver/compare/2.0.0...2.0.1)

- bugfix: add const to entryData in glob callback (#261)
- other: coding style fixes (#263)

**2.0.0** — <small>_July 5, 2017_</small> — [Diff](https://github.com/archiverjs/node-archiver/compare/1.3.0...2.0.0)

- feature: support for symlinks. (#228)
- feature: support for promises on `finalize`. (#248)
- feature: addition of `symlink` method for programmatically creating symlinks within an archive.
- change: emit `warning` instead of `error` when stat fails and the process can still continue.
- change: errors and warnings now contain extended data (where available) and have standardized error codes (#256)
- change: removal of deprecated `bulk` functionality. (#249)
- change: removal of internal  `_entries` property in favor of `progress` event. (#247)
- change: support for node v4.0+ only. node v0.10 and v0.12 support has been dropped. (#241)

**1.3.0** — <small>_December 13, 2016_</small> — [Diff](https://github.com/archiverjs/node-archiver/compare/1.2.0...1.3.0)

- improve `directory` and `glob` methods to use events rather than callbacks. (#203)
- fix bulk warning spam (#208)
- updated mocha (#205)

**1.2.0** — <small>_November 2, 2016_</small> — [Diff](https://github.com/archiverjs/node-archiver/compare/1.1.0...1.2.0)

- Add a `process.emitWarning` for `deprecated` (#202)

**1.1.0** — <small>_August 29, 2016_</small> — [Diff](https://github.com/archiverjs/node-archiver/compare/1.0.1...1.1.0)

- minor doc fixes.
- bump deps to ensure latest versions are used.

**1.0.1** — <small>_July 27, 2016_</small> — [Diff](https://github.com/archiverjs/node-archiver/compare/1.0.0...1.0.1)

- minor doc fixes.
- dependencies upgraded.

**1.0.0** — <small>_April 5, 2016_</small> — [Diff](https://github.com/archiverjs/node-archiver/compare/0.21.0...1.0.0)

- version unification across many archiver packages.
- dependencies upgraded and now using semver caret (^).

**0.21.0** — <small>_December 21, 2015_</small> — [Diff](https://github.com/archiverjs/node-archiver/compare/0.20.0...0.21.0)

- core: add support for `entry.prefix`. update some internals to use it.
- core(glob): when setting `options.cwd` get an absolute path to the file and use the relative path for `entry.name`. #173
- core(bulk): soft-deprecation of `bulk` feature. will remain for time being with no new features or support.
- docs: initial jsdoc for core. http://archiverjs.com/docs
- tests: restructure a bit.

**0.20.0** — <small>_November 30, 2015_</small> — [Diff](https://github.com/archiverjs/node-archiver/compare/0.19.0...0.20.0)

- simpler path normalization as path.join was a bit restrictive. #162
- move utils to separate module to DRY.

[Release Archive](https://github.com/archiverjs/node-archiver/releases)
