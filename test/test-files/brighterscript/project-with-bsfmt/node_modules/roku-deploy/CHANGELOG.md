# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).



## [3.3.0] - 2021-02-05
### Added
 - support for `timeout` option to fail deploys after a certain amount of time



## [3.2.4] - 2021-01-08
### Fixed
 - don't fail deployment when home press command returns 202 http status code



## [3.2.3] - 2020-08-14
### Changed
 - throw exception during `copyToStaging` when rootDir does not exist
 - throw exception during `zipPackage` when `${stagingFolder}/manifest` does not exist


## [3.2.2] - 2020-07-14
### Fixed
 - bug when loading `stagingFolderPath` from `rokudeploy.json` or `bsconfig.json` that would cause an exception.



## [3.2.1] - 2020-07-07
### Changed
 - `rokudeploy.json` now supports jsonc (json with comments)
### Fixed
 - loading `bsconfig.json` file with comments would fail the entire roku-deploy process.



## [3.2.0] - 2020-07-06
### Added
 - support for loading `bsconfig.json` files.



## [3.1.1] - 2020-05-08
### Added
 - export `DefaultFilesArray` so other tools can use that as their defaults as well.



## [3.1.0] - 2020-05-08
### Added
 - config setting `retainDeploymentArchive` which specifies if the zip should be deleted after a publish.



## [3.0.2] - 2020-04-10
### Fixed
 - issue where `prepublishToStaging` wasn't recognizing nested files inside a symlinked folder.



## [3.0.1] - 2020-04-03
### Changed
 - coerce `rootDir` to an absolute path in `rokuDeploy.getDestPath` and `rokuDeploy.getFilePaths`.



## [3.0.0] - 2020-03-23
### Added
 - all changes from v3.0.0-beta1-v3.0.0-beta.8



## [3.0.0-beta.8] - 2020-03-06
### Added
 - all changes from 2.7.0



## [2.7.0] - 2020-03-06
### Added
 - support for `remoteDebug` property which enables the experimental remote debug protocol on newer versions of Roku hardware. See [this](https://developer.roku.com/en-ca/docs/developer-program/debugging/socket-based-debugger.md) for more information.


## [3.0.0-beta.7] - 2020-01-10
### Fixed
 - bug during file copy that was not prepending `stagingFolderPath` to certain file operations.



## [3.0.0-beta.6] - 2020-01-06
### Fixed
 - bug that was not discarding duplicate file entries targeting the same `dest` path.



## [3.0.0-beta.5] - 2019-12-20
### Added
 - all changes from 2.6.1



## [3.0.0-beta.4] - 2019-11-12
### Added
 - all changes from 2.6.0



## [3.0.0-beta.3] - 2019-11-12
### Added
 - `RokuDeploy.getDestPath` function which returns the dest path for a full file path. Useful for figuring out where a file will be placed in the pkg.
### Changed
 - made `RokuDeploy.normalizeFilesArray` public
 - disallow using explicit folder paths in files array. You must use globs for folders.



## [3.0.0-beta.2] - 2019-10-23
### Changed
 - signature of `getFilePaths()` to no longer accept `stagingFolderPath`
 - `getFilePaths()` now returns `dest` file paths relative to pkg instead of absolute file paths. These paths do _not_ include a leading slash



## [3.0.0-beta.1] - 2019-10-16
### Added
 - information in the readme about the `files` array
 - support for file overrides in the `files` array. This supports including the same file from A and B, and letting the final file override previous files.
### Changed
 - the files array is now a bit more strict, and has a more consistent approach.
## [2.6.1] - 2019-12-20
### Fixed
 - Throw better error message during publish when missing the zip file.



## [2.6.0] - 2019-12-04
### Added
 - `remotePort` and `packagePort` for customizing the ports used for network-related roku requests. Mainly useful for emulators or communicating with Rokus behind port-forwards.



## [2.6.0-beta.0] - 2019-11-18
### Added
 - `remotePort` and `packagePort` for customizing the ports used for network-related roku requests. Mainly useful for emulators or communicating with Rokus behind port-forwards.



## [2.5.0] - 2019-10-05
### Added
 - `stagingFolderPath` option to allow overriding the location of the staging folder



## [2.4.1] - 2019-08-27
### Changed
 - updated new repository location (https://github.com/RokuCommunity/roku-deploy)



## [2.4.0] - 2019-08-26
### Added
 - `deleteInstalledChannel` method that will delete the installed channel on the remote Roku
### Changed
 - `deploy` now deletes any installed channel before publishing the new channel



## [2.3.0] - 2019-08-20
### Added
 - support for returning a promise in the `createPackage` `beforeZipCallback` parameter.



## [2.2.1] - 2019-08-07
### Fixed
 - colors starting with # symbol in manifest file that were being treated as comments. This removes the dependency on `ini` in favor of a local function.



## [2.2.0] - 2019-07-05
### Added
 - support for converting to squashfs
### Fixed
 - issue where manifest files with `bs_const` weren't being handled correctly



## [2.1.0] - 2019-05-14
### Added
 - rekeying capability



## [2.1.0-beta1] - 2019-02-15
### Added
 - Support for signed package creation
 - ability to register a callback function before the package is zipped.
 - `incrementBuildNumber` option
### Changed
 - Stop calling home button on deploy
 - `outFile` to be `baseName` so it can be used for both zip and pkg file names



## [2.0.0] - 2019-01-07
### Added
 - support for absolute file paths in the `files` property
 - dereference symlinks on file copy



## [2.0.0-beta5] - 2019-01-18
### Changed
 - Changed `normalizeFilesOption` to be sync instead of async, since it didn't need to be async.



## [2.0.0-beta4] - 2019-01-17
### Fixed
 - bug that wasn't using rootDir for glob matching



## [2.0.0-beta3] - 2019-01-17
### Changed
 - export the `getFilepaths` for use in external libraries



## [2.0.0-beta2] - 2019-01-15
### Changed
 - prevent empty directories from being created
### Fixed
 - bug in `src`/`dest` globs.
 - bug that wasn't copying folders properly



## [2.0.0-beta1] - 2019-01-07
### Changed
 - removed the requirement for manifest to be located at the top of `rootDir`. Instead, it is simply assumed to exist.
### Fixed
 - regression issue that prevented folder names from being used without globs



## [1.0.0] - 2018-12-18
### Added
 - support for negated globs

[1.0.0]:  https://github.com/RokuCommunity/roku-deploy/compare/v0.2.1...v1.0.0
[2.0.0-beta1]:  https://github.com/RokuCommunity/roku-deploy/compare/v1.0.0...v2.0.0-beta1
[2.0.0-beta2]:  https://github.com/RokuCommunity/roku-deploy/compare/v2.0.0-beta1...v2.0.0-beta2
[2.0.0-beta3]:  https://github.com/RokuCommunity/roku-deploy/compare/v2.0.0-beta2...v2.0.0-beta3
[2.0.0-beta4]:  https://github.com/RokuCommunity/roku-deploy/compare/v2.0.0-beta3...v2.0.0-beta4
[2.0.0-beta5]:  https://github.com/RokuCommunity/roku-deploy/compare/v2.0.0-beta4...v2.0.0-beta5
[2.0.0]:  https://github.com/RokuCommunity/roku-deploy/compare/v2.0.0-beta5...v2.0.0
[2.1.0]:  https://github.com/RokuCommunity/roku-deploy/compare/v2.1.0-beta1...v2.1.0
[2.1.0]:  https://github.com/RokuCommunity/roku-deploy/compare/v2.1.0-beta1...v2.1.0
[2.2.0]:  https://github.com/RokuCommunity/roku-deploy/compare/v2.1.0...v2.2.0
[2.2.1]:  https://github.com/RokuCommunity/roku-deploy/compare/v2.2.0...v2.2.1
[2.3.0]:  https://github.com/RokuCommunity/roku-deploy/compare/v2.2.1...v2.3.0
[2.4.0]:  https://github.com/RokuCommunity/roku-deploy/compare/v2.3.0...v2.4.0
[2.4.1]:  https://github.com/RokuCommunity/roku-deploy/compare/v2.4.0...v2.4.1
[2.5.0]:  https://github.com/RokuCommunity/roku-deploy/compare/v2.4.1...v2.5.0
[2.6.0-beta.0]:  https://github.com/RokuCommunity/roku-deploy/compare/v2.5.0...v2.6.0-beta.0
[2.6.0]:  https://github.com/RokuCommunity/roku-deploy/compare/v2.5.0...v2.6.0
[2.6.1]:  https://github.com/RokuCommunity/roku-deploy/compare/v2.6.0...v2.6.1
[2.7.0]:  https://github.com/RokuCommunity/roku-deploy/compare/v2.6.1...v2.7.0
[3.0.0-beta.1]:  https://github.com/RokuCommunity/roku-deploy/compare/v2.5.0...v3.0.0-beta.1
[3.0.0-beta.2]:  https://github.com/RokuCommunity/roku-deploy/compare/v3.0.0-beta.1...v3.0.0-beta.2
[3.0.0-beta.3]:  https://github.com/RokuCommunity/roku-deploy/compare/v3.0.0-beta.2...v3.0.0-beta.3
[3.0.0-beta.4]:  https://github.com/RokuCommunity/roku-deploy/compare/v3.0.0-beta.3...v3.0.0-beta.4
[3.0.0-beta.5]:  https://github.com/RokuCommunity/roku-deploy/compare/v3.0.0-beta.4...v3.0.0-beta.5
[3.0.0-beta.6]:  https://github.com/RokuCommunity/roku-deploy/compare/v3.0.0-beta.5...v3.0.0-beta.6
[3.0.0-beta.7]:  https://github.com/RokuCommunity/roku-deploy/compare/v3.0.0-beta.6...v3.0.0-beta.7
[3.0.0]:  https://github.com/RokuCommunity/roku-deploy/compare/v2.7.0...v3.0.0
[3.0.1]:  https://github.com/RokuCommunity/roku-deploy/compare/v3.0.0...v3.0.1
[3.0.2]:  https://github.com/RokuCommunity/roku-deploy/compare/v3.0.1...v3.0.2
[3.1.0]:  https://github.com/RokuCommunity/roku-deploy/compare/v3.0.2...v3.1.0
[3.1.1]:  https://github.com/RokuCommunity/roku-deploy/compare/v3.1.0...v3.1.1
[3.2.0]:  https://github.com/RokuCommunity/roku-deploy/compare/v3.1.1...v3.2.0
[3.2.1]:  https://github.com/RokuCommunity/roku-deploy/compare/v3.2.0...v3.2.1
[3.2.2]:  https://github.com/RokuCommunity/roku-deploy/compare/v3.2.1...v3.2.2
[3.2.3]:  https://github.com/RokuCommunity/roku-deploy/compare/v3.2.2...v3.2.3
[3.2.4]:  https://github.com/RokuCommunity/roku-deploy/compare/v3.2.3...v3.2.4
[3.3.0]:  https://github.com/RokuCommunity/roku-deploy/compare/v3.2.4...v3.3.0