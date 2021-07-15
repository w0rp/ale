# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).



## [0.22.1] - 2020-12-14
### Fixed
 - small bug introduced by vscode-languageserver causing crashes anytime negative range values are provided.



## [0.22.0] - 2020-11-23
### Added
 - `try/catch` and `throw` syntax support [#218](https://github.com/rokucommunity/brighterscript/issues/218)



## [0.21.0] - 2020-11-19
### Added
 - Catch when local variables and scope functions have the same name as a class. ([#246](https://github.com/rokucommunity/brighterscript/pull/246))
 - Catch when functions use keyword names ([#247](https://github.com/rokucommunity/brighterscript/pull/247))
### Changed
 - many internal changes:
   - remove all the `BrsType` objects leftover from the upstream `brs` project. Things like `ValueKind`, `BrsType`, the `Token.literal` property.
   - rename the brighterscript `BrsType` class to `BscType` for more distinction from the  now deleted from-upstream `BrsType`.
   - Modify the `createToken` function in `astUtils/creators.ts` to accept a range, or use a default negative range.
   - Use the `BscType` objects for basic parser type tracking (this replaces `ValueKind` and `BrsType` from upstream `brs` project).
   - minor AST property changes for `ForStatement` and `FunctionStatement`,
   - any `ValueKind` references in code have been replaced with an instance of a `BscType` (which will be the backbone of future type tracking)
   - Updated `ForStatement` to no longer include synthetic `step 1` tokens when those were not included in the source file.
   - remove eliminated `BrsType` items from `reflection.ts`.


## [0.20.1] - 2020-11-16
### Changed
 - load plugins relatively to the project ([#242](https://github.com/rokucommunity/brighterscript/pull/242))
 - modified reflection utilities so they are compatible with TS strict null checks ([#243](https://github.com/rokucommunity/brighterscript/pull/243))



## [0.20.0] - 2020-11-13
### Added
 - more language server features: onWorkspaceSymbol, onSignatureHelp, onDocumentSymbol, onReferences, improve onDefinition ([#191](https://github.com/rokucommunity/brighterscript/pull/191))



## [0.19.0] - 2020-11-04
### Changed
 - `emitDefinitions` now defaults to `false` (it previously defaulted to `true`)
### Fixed
 - don't transpile `d.bs` files (which would produce `d.brs` files with duplicate information in them)



## [0.18.2] - 2020-11-2
### Fixed
 - support on-demand parse for typedef-shadowed files ([#237](https://github.com/rokucommunity/brighterscript/pull/237))



## [0.18.1] - 2020-10-30
### Fixed
 - exclude bs1100 for typedef files (`Missing "super()" call in class constructor method.`)
 - fix some invalid class field types in typedef files
 - include `override` keyword in class methods in typedef files



## [0.18.0] - 2020-10-30
### Added
 - support for consuming and producing type definitions. ([188](https://github.com/rokucommunity/brighterscript/pull/188))



## [0.17.0] - 2020-10-27
### Added
 - Annotation syntax and AST support ([#234](https://github.com/rokucommunity/brighterscript/pull/234))



## [0.16.12] - 2020-10-21
### Fixed
 - parser bug when there was a trailing colon after `for` or `while` loop statements ([#230](https://github.com/rokucommunity/brighterscript/pull/230))



## [0.16.11] - 2020-10-20
### Fixed
 - bug when using single quotes in an xml script tag
### Changed
 - removed bs1106 (.bs file script tags must use the `type="brighterscript"`) diagnostic because it's unnecessary.



## [0.16.10] - 2020-10-20
### Fixed
 - prevent crash when a callable has the same name as a javascript reserved name ([#226](https://github.com/rokucommunity/brighterscript/pull/226))
 - prevent crash when `import` statement is malformed ([#224](https://github.com/rokucommunity/brighterscript/pull/224))



## [0.16.9] - 2020-10-18
### Fixed
 - reduce language server throttle for validation and parsing now that those have improved performance.
 - massively improve validation performance by refactoring `getFileByPkgPath`
 - micro-optimization of hot parser functions
 - change codebase to use `import type` many places, which reduces the number of files imported at runtime



## [0.16.8] - 2020-10-15
### Fixed
 - bug when printing diagnostics that would crash if the contents were missing (like for in-memory-only files injected by plugins) ([#217](https://github.com/rokucommunity/brighterscript/pull/217))
 - Drop expensive AST walking for collecting property names and instead collect them as part of parsing



## [0.16.7] - 2020-10-13
### Fixed
 - bug when finding `bsconfig.json` that would use the wrong cwd in multi-workspace language server situations.
 - bug when transpiling in-memory-only files. ([#212](https://github.com/rokucommunity/brighterscript/pull/212))



## [0.16.6] - 2020-10-13
### Fixed
 - quirk in the GitHub actions workflow that didn't publish the correct code.



## [0.16.5] - 2020-10-13
### Fixed
 - performance issue during the parse phase. We now defer certain collections until needed. ([#210](https://github.com/rokucommunity/brighterscript/pull/210))



## [0.16.4] - 2020-10-12
### Changed
 - LanguageServer now sends a _diff_ of diagnostics for files, instead of the entire project's diagnostics every time. ([#204](https://github.com/rokucommunity/brighterscript/pull/204))
### Fixed
 - transpile bug for namespaced class constructors that wouldn't properly prepend the namespace in some situations. ([#208](https://github.com/rokucommunity/brighterscript/pull/208))
 - bug in class validation that was causing bogus diagnostics during class construction in namespaces.([#203](https://github.com/rokucommunity/brighterscript/issues/203))



## [0.16.3] - 2020-10-11
### Changed
 - Add generic type parameter for `Program` add functions.
 - Export `BscType` type to simplify `BrsFile | XmlFile` usage everywhere.
### Fixed
 - Prevent bogus diagnostic on all callfunc operations ([#205](https://github.com/rokucommunity/brighterscript/issues/205))



## [0.16.2] - 2020-10-09
### Fixed
 - critical bug in diagnostic printing that would crash the program if a diagnostic was missing a valid range.



## [0.16.1] - 2020-10-03
### Changed
 - rename `isEscapedCharCodeLiteral` to `isEscapedCharCodeLiteralExpression` to match other expression class names
 - rename `FunctionParameter` to `FunctionParameterExpression` to match other expression class names
 - convert `AAMemberExpression` interface into an expression class.
 - convert `isBrsFile` and `isXmlFile` to check for constructor file name rather than file extension.
### Fixed
 - bugs with plugin interoperability with BrighterScript when using `instanceof`. All internal BrighterScript logic now uses the `is` functions from `astutils/reflection`, and plugin authors should do the same.



## [0.16.0] - 2020-10-02
### Added
 - `Expression.walk` and `Statement.walk` functions which provide shallow or deep walking of the AST
 - Many `ast` reflection methods to be used instead of `instanceof`.
 - plugin system (still in alpha) support for re-scanning the AST after modifing the AST by calling `invalidateReferences()`
 - every token has a `leadingWhitespace` property now that contains leading whitespace. Retrieving whitespace tokens from the `Lexer` will be removed in a future update in favor of this appraoch
### Changed
 - all AST nodes now extend either `Statement` or `Expression` instead of simply implementing their interfaces.
### Removed
 - several AST walking functions from `astUtils/` in favor of direct node walking



## [0.15.2] - 2020-10-01
### Fixed
 - Bug in component validation that would throw errors if component name was undefined (generally due to an XML parse error). ([#194](https://github.com/rokucommunity/brighterscript/pull/194))



## [0.15.1] - 2020-09-30
### Fixed
 - improved performance in the lexer and parser
 - potential for accidentally changing `cwd` during bsconfig resolving



## [0.15.0] - 2020-09-18
### Added
 - plugin API to allow visibility into the various compiler phases. This is currently in alpha. ([#170](https://github.com/rokucommunity/brighterscript/pull/170))



## [0.14.0] - 2020-09-04
### Changed
 - Add error diagnostic BS1115 which flags duplicate component names [#186](https://github.com/rokucommunity/brighterscript/pull/186)



## [0.13.2] - 2020-08-31
### Changed
 - Upgraded BS1104 to error (previously a warning) and refined the messaging.



## [0.13.1] - 2020-08-14
### Changed
 - upgraded to [roku-deploy@3.2.3](https://github.com/rokucommunity/roku-deploy/blob/master/CHANGELOG.md#323---2020-08-14)
 - throw exception when copying to staging folder and `rootDir` does not exist in the file system
 - throw exception when zipping package and `${stagingFolder}/manifest` does not exist in the file system



## [0.13.0] - 2020-08-10
### Added
 - ability to mark the `extends` and `project` options in `bsconfig.json`, API and CLI as optional.



## [0.12.4] - 2020-08-06
### Fixed
 - bug in cli that wouldn't properly read bsconfig values. [#167](https://github.com/rokucommunity/brighterscript/issues/167)
 - bug in cli that doesn't use `retain-staging-folder` argument properly. [#168](https://github.com/rokucommunity/brighterscript/issues/168)



## [0.12.3] - 2020-08-03
### Fixed
 - bug in the language server that would provide stale completions due to the file throttling introduced in v0.11.2. Now the language server will wait for the throttled parsing to complete before serving completion results.



## [0.12.2] - 2020-07-16
### Added
 - Expose `ProgramBuilder.transpile()` method to make it easier for tools to transpile programmatically. [#154](https://github.com/rokucommunity/brighterscript/issues/154)
### Fixed
 - bug on Windows when transpiling BrighterScript import statements into xml script tags that would use the wrong path separator sometimes.



## [0.12.1] - 2020-07-15
### Changed
 - upgraded to [roku-deploy@3.2.2](https://github.com/rokucommunity/roku-deploy/blob/master/CHANGELOG.md#322---2020-07-14)
### Fixed
 - bug in roku-deploy when when loading `stagingFolderPath` from `rokudeploy.json` or `bsconfig.json` that would crash the language server



## [0.12.0] - 2020-07-09
### Added
 - `diagnosticLevel` option to limit/control the noise in the console diagnostics
### Changed
 - Move away from `command-line-args` in favor of `yargs` for CLI support
### Fixed
 - Throttle LanguageServer validation to prevent running too many validations in a row.
 - Bug in CLI preventing ability to provide false values to certain flags
 - Do not print `info` and `hint` diagnostics from the CLI by default.



## [0.11.2] - 2020-07-09
### Changed
 - add 350ms debounce in LanguageServer `onDidChangeWatchedFiles` to increase performance by reducing the number of times a file is parsed and validated.
### Fixed
 - bug in the log output that wasn't casting string log levels into their numeric enum versions, causing messages to be lost at certain log levels.
 - load manifest file exactly one time per program rather than every time a file gets parsed.
 - bug in `info` logging that wasn't showing the proper parse times for files on first run.



## [0.11.1] - 2020-07-07
### Added
 - diagnostic for unknown file reference in import statements ([#139](https://github.com/rokucommunity/brighterscript/pull/139))
### Changed
 - upgraded to [roku-deploy@3.2.1](https://www.npmjs.com/package/roku-deploy/v/3.2.1)
 - upgraded to jsonc-parser@2.3.0
 - add begin and end template string literal tokens so we can better format and understand the code downstream. ([#138](https://github.com/rokucommunity/brighterscript/pull/138))
### Fixed
 - roku-deploy bug that would fail to load `bsconfig.json` files with comments in them.
 - bug in parser that would fail to find function calls in certain situations, killing the rest of the parse.



## [0.11.0] - 2020-07-06
### Added
 - [Source literals feature](https://github.com/rokucommunity/brighterscript/blob/master/docs/source-literals.md) which adds new literals such as `SOURCE_FILE_PATH`, `SOURCE_LINE_NUM`, `FUNCTION_NAME`, and more. ([#13](https://github.com/rokucommunity/brighterscript/issues/13))
 - `sourceRoot` config option to fix sourcemap paths for projects that use a temporary staging folder before calling the BrighterScript compiler. ([#134](https://github.com/rokucommunity/brighterscript/commit/e5b73ca37016d5015a389257fb259573c4721e7a))
 - [Template string feature](https://github.com/rokucommunity/brighterscript/blob/master/docs/template-strings.md) which brings template string support to BrighterScript. ([#98](https://github.com/rokucommunity/brighterscript/issues/98))
### Fixed
 - Do not show BS1010 diagnostic `hint`s for the same script imported for parent and child. ([#113](https://github.com/rokucommunity/brighterscript/issues/113))



## [0.10.11] - 2020-07-05
 - Fix bug that would fail to copy files to staging without explicitly specifying `stagingFolderpath`. [#129](https://github.com/rokucommunity/brighterscript/issues/129)



## [0.10.10] - 2020-06-12
### Fixed
 - include the missing `bslib.brs` file in the npm package which was causing errors during transpile.



## [0.10.9] 2020-06-12
### Added
 - bslib.brs gets copied to `pkg:/source` and added as an import to every component on transpile.
 - several timing logs under the `"info"` log level.
### Changed
 - pipe the language server output to the extension's log window
### Fixed
 - bug with global `val` function signature that did not support the second parameter ([#110](https://github.com/rokucommunity/vscode-brightscript-language/issues/110))
 - bug with global 'StrI' function signature that did not support the second parameter.



## [0.10.8] - 2020-06-09
### Fixed
 - Allow leading spcaes for `bs:disable-line` and `bs:disable-next-line` comments ([#108](https://github.com/rokucommunity/brighterscript/pull/108))



## [0.10.7] - 2020-06-08
### Fixed
 - bug in cli that was always returning a nonzero error code



## [0.10.6] - 2020-06-05
### Fixed
 - incorrect definition for global `Left()` function. ([#100](https://github.com/rokucommunity/brighterscript/issues/100))
 - missing definition for global `Tab()` and `Pos()` functions ([#101](https://github.com/rokucommunity/brighterscript/issues/101))



## [0.10.5] - 2020-06-04
### Changed
 - added better logging for certain critical language server crashes



## [0.10.4] - 2020-05-28
### Fixed
 - bug where assigning a namespaced function to a variable wasn't properly transpiling the dots to underscores (fixes [#91](https://github.com/rokucommunity/brighterscript/issues/91))
 - flag parameter with same name as namespace
 - flag variable with same name as namespace
 - `CreateObject("roRegex")` with third parameter caused compile error ([#95](https://github.com/rokucommunity/brighterscript/issues/95))



## [0.10.3] - 2020-05-27
### Changed
 - tokenizing a string with no closing quote will now include all of the text until the end of the line.
 - language server `TranspileFile` command now waits until the program is finished building before trying to transpile.



## [0.10.2] - 2020-05-23
### Added
 - language server command `TranspileFile` which will return the transpiled contents of the requested file.
### Fixed
 - quotemarks in string literals were not being properly escaped during transpile ([#89](https://github.com/rokucommunity/brighterscript/issues/89))
 - Bug that was only validating calls at top level. Now calls found anywhere in a function are validated



## [0.10.1] - 2020-05-22
### Fixed
 - transpile bug for compound assignment statements (such as `+=`, `-=`) ([#87](https://github.com/rokucommunity/brighterscript/issues/87))
 - transpile bug that was inserting function parameter types before default values ([#88](https://github.com/rokucommunity/brighterscript/issues/88))
 - export BsConfig interface from index.ts to make it easier for NodeJS importing.



## [0.10.0] - 2020-05-19
### Added
 - new callfunc operator.



## [0.9.8] - 2020-05-16
### Changed
 - the inner event system handling file changes. This should fix several race conditions causing false negatives during CLI runs.
### Fixed
 - some bugs related to import statements not being properly traced.



## [0.9.7] - 2020-05-14
### Changed
 - TypeScript target to "ES2017" which provides a significant performance boost in lexer (~30%) and parser (~175%)
### Fixed
 - the binary name got accidentally renamed to `bsc2` in release 0.9.6. This release fixes that issue.
 - removed some debug logs that were showing up when not using logLevel=debug
 - false negative diagnostic when using the `new` keyword as a local variable [#79](https://github.com/rokucommunity/brighterscript/issues/79)



## [0.9.6] - 2020-05-11
### Added
 - `logLevel` option from the bsconfig.json and command prompt that allows specifying how much detain the logging should contain.
 - additional messages during cli run
### Changed
 - don't terminate bsc on warning diagnostics
 - removed extraneous log statements from the util module
### Fixed
 - fixed bugs when printing diagnostics to the console that wouldn't show the proper squiggly line location.



## [0.9.5] - 2020-05-06
### Added
 - new config option called `showDiagnosticsInConsole` which disables printing diagnostics to the console
### Fixed
 - bug in lexer that was capturing the carriage return character (`\n`) at the end of comment statements
 - bug in transpiler that wouldn't include a newline after the final comment statement
 - bug in LanguageServer that was printing diagnostics to the console when it shouldn't be.



## [0.9.4] - 2020-05-05
### Added
 - diagnostic for detecting unnecessary script imports when `autoImportComponentScript` is enabled
### Changed
 - filter duplicate dignostics from multiple projects. ([#75](https://github.com/rokucommunity/brighterscript/issues/75))
### Fixed
 - bug that was flagging namespaced functions with the same name as a stdlib function.
 - bug that was not properly transpiling brighterscript script tags in xml components.
 - several performance issues introduced in v0.8.2.
 - Replace `type="text/brighterscript"` with `type="text/brightscript"` in xml script imports during transpile. ([#73](https://github.com/rokucommunity/brighterscript/issues/73))



## [0.9.3] - 2020-05-04
### Changed
 - do not show BRS1013 for standalone files ([#72](https://github.com/rokucommunity/brighterscript/issues/72))
 - BS1011 (same name as global function) is no longer shown for local variables that are not of type `function` ([#70](https://github.com/rokucommunity/brighterscript/issues/70))
### Fixed
 - issue that prevented certain keywords from being used as function parameter names ([#69](https://github.com/rokucommunity/brighterscript/issues/69))



## [0.9.2] - 2020-05-02
### Changed
 - intellisense anywhere other than next to a dot now includes keywords (#67)

### Fixed
 - bug in the lexer that was not treating `constructor` as an identifier (#66)
 - bug when printing diagnostics that would sometimes fail to find the line in question (#68)
 - bug in scopes that were setting isValidated=false at the end of the `validate()` call instead of true



## [0.9.1] - 2020-05-01
### Fixed
 - bug with upper-case two-word conditional compile tokens (`#ELSE IF` and `#END IF`) (#63)



## [0.9.0] - 2020-05-01
### Added
 - new compile flag `autoImportComponentScript` which will automatically import a script for a component with the same name if it exists.



## [0.8.2] - 2020-04-29
### Fixed
 - bugs in namespace transpilation
 - bugs in class transpilation
 - transpiled examples for namespace and class docs
 - bugs in class property initialization



## [0.8.1] - 2020-04-27
### Fixed
 - Bug where class property initializers would cause parse error
 - better parse recovery for incomplete class members



## [0.8.0] - 2020-04-26
### Added
 - new `import` syntax for BrighterScript projects.
 - experimental transpile support for xml files (converts `.bs` extensions to `.brs`, auto-appends the `import` statments to each xml component)
### Changed
 - upgraded to vscode-languageserver@6.1.1


## [0.7.2] - 2020-04-24
### Fixed
 - runtime bug in the language server when validating incomplete class statements



## [0.7.1] - 2020-04-23
### Fixed
 - dependency issue: `glob` is required but was not listed as a dependency



## [0.7.0] - 2020-04-23
### Added
 - basic support for namespaces
 - experimental parser support for import statements (no transpile yet)
### Changed
 - parser produces TokenKind.Library now instead of an identifier token for library.



## [0.6.0] 2020-04-15
### Added
 - ability to filter out diagnostics by using the `diagnosticFilters` option in bsconfig
### Changed
 - deprecated the `ignoreErrorCodes` in favor of `diagnosticFilters`
### Fixed
 - Bug in the language server that wasn't reloading the project when changing the `bsconfig.json`



## [0.5.4] 2020-04-13
### Fixed
 - Syntax bug that wasn't allowing period before indexed get expression (example: `prop.["key"]`) (#58)
 - Syntax bug preventing comments from being used in various locations within a class



## [0.5.3] - 2020-04-12
### Added
 - syntax support for the xml attribute operator (`node@someAttr`) (#34)
 - syntax support for bitshift operators (`<<` and `>>`) (#50)
 - several extra validation checks for class statements
### Fixed
 - syntax bug that was showing parse errors for known global method names (such as `string()`) (#49)



## [0.5.2] - 2020-04-11
### Changed
 - downgrade diagnostic issue 1007 from an error to a warning, and updated the message to "Component is mising "extends" attribute and will automatically extend "Group" by default" (#53)
### Fixed
 - Prevent xml files found outside of the `pkg:/components` folder from being parsed and validated. (#51)
 - allow empty `elseif` and `else` blocks. (#48)



## [0.5.1] - 2020-04-10
### Changed
 - upgraded to [roku-deploy@3.0.2](https://www.npmjs.com/package/roku-debug/v/0.3.4) which fixed a file copy bug in subdirectories of symlinked folders (fixes #41)



## [0.5.0] - 2020-04-10
### Added
 - several new diagnostics for conditional compiles. Some of them allow the parser to recover and continue.
 - experimental class transpile support. There is still no intellisense for classes yet though.
### Changed
   - All errors are now stored as vscode-languageserver `Diagnostic` objects instead of a custom error structure.
   - Token, AST node, and diagnostic locations are now stored as `Range` objects, which use zero-based lines instead of the previous one-based line numbers.
   - All parser diagnostics have been broken out into their own error codes, removing the use of error code 1000 for a generic catch-all. That code still exists and will hold runtime errors from the parser.
### Fixed
 - bug in parser that was flagging the new class keywords (`new`, `class`, `public`, `protected`, `private`, `override`) as parse errors. These are now allowed as both local variables and property names.



## [0.4.4] - 2020-04-04
### Fixed
 - bug in the ProgramBuilder that would terminate the program on first run if an error diagnostic was found, even when in watch mode.



## [0.4.3] - 2020-04-03
### Changed
 - the `bsc` cli now emits a nonzero return code whenever parse errors are encountered, which allows tools to detect compile-time errors. (#43)



## [0.4.2] - 2020-04-01
### Changed
 - upgraded to [roku-deploy@3.0.0](https://www.npmjs.com/package/roku-deploy/v/3.0.0)



## [0.4.1] - 2020-01-11
### Changed
 - upgraded to [roku-deploy@3.0.0-beta.7](https://www.npmjs.com/package/roku-deploy/v/3.0.0-beta.7) which fixed a critical bug during pkg creation.



## [0.4.0] - 2020-01-07
### Added
 - ability to specify the pkgPath of a file when adding to the project.
### Changed
 - upgraded to [roku-deploy@3.0.0-beta.6](https://www.npmjs.com/package/roku-deploy/v/3.0.0-beta.6)
### Fixed
 - bug that was showing duplicate function warnings when multiple files target the same `pkgPath`. Now roku-deploy will only keep the last referenced file for each `pkgPath`
 - reduced memory consumtion and FS calls during file watcher events
 - issue in getFileByPkgPath related to path separator mismatches
 - bugs related to standalone workspaces causing issues for other workspaces.



## [0.3.1] - 2019-11-08
### Fixed
 - language server bug that was showing error messages in certain startup race conditions.
 - error during hover caused by race condition during file re-parse.



## [0.3.0] - 2019-10-03
### Added
 - support for parsing opened files not included in any project.
### Fixed
 - parser bug that was preventing comments as their own lines inside associative array literals. ([#29](https://github.com/rokucommunity/brighterscript/issues/28))



## [0.2.2] - 2019-09-27
### Fixed
 - bug in language server where the server would crash when sending a diagnostic too early. Now the server waits for the program to load before sending diagnostics.



## [0.2.1] - 2019-09-24
### Changed
 - the text for diagnostic 1010 to say "override" instead of "shadows"
### Fixed
 - crash when parsing the workspace path to read the config on startup.
 - auto complete options not always returning results when it should.
 - windows bug relating to the drive letter being different, and so then not matching the file list.
 - many bugs related to mismatched file path comparisons.



## [0.2.0] - 2019-09-20
### Added
 - bsconfig.json validation
 - slightly smarter intellisense that knows when you're trying to complete an object property.
 - diagnostic for deprecated brsconfig.json
 - basic transpile support including sourcemaps. Most lines also support transpiling including comments, but there may still be bugs
 - parser now includes all comments as tokens in the AST.

### Fixed
 - bugs in the languageserver intellisense
 - parser bug that would fail when a line ended with a period
 - prevent intellisense when typing inside a comment
 - Bug during file creation that wouldn't recognize the file


## [0.1.0] - 2019-08-10
### Changed
 - Cloned from [brightscript-language](https://github.com/rokucommunity/brightscript-language)


[0.1.0]:    https://github.com/rokucommunity/brighterscript/compare/v0.1.0...v0.1.0
[0.2.0]:    https://github.com/rokucommunity/brighterscript/compare/v0.1.0...v0.2.0
[0.2.1]:    https://github.com/rokucommunity/brighterscript/compare/v0.2.0...v0.2.1
[0.2.2]:    https://github.com/rokucommunity/brighterscript/compare/v0.2.1...v0.2.2
[0.3.0]:    https://github.com/rokucommunity/brighterscript/compare/v0.2.2...v0.3.0
[0.3.1]:    https://github.com/rokucommunity/brighterscript/compare/v0.3.0...v0.3.1
[0.4.0]:    https://github.com/rokucommunity/brighterscript/compare/v0.3.1...v0.4.0
[0.4.1]:    https://github.com/rokucommunity/brighterscript/compare/v0.4.0...v0.4.1
[0.4.2]:    https://github.com/rokucommunity/brighterscript/compare/v0.4.1...v0.4.2
[0.4.3]:    https://github.com/rokucommunity/brighterscript/compare/v0.4.2...v0.4.3
[0.4.4]:    https://github.com/rokucommunity/brighterscript/compare/v0.4.3...v0.4.4
[0.5.0]:    https://github.com/rokucommunity/brighterscript/compare/v0.4.4...v0.5.0
[0.5.1]:    https://github.com/rokucommunity/brighterscript/compare/v0.5.0...v0.5.1
[0.5.2]:    https://github.com/rokucommunity/brighterscript/compare/v0.5.1...v0.5.2
[0.5.3]:    https://github.com/rokucommunity/brighterscript/compare/v0.5.2...v0.5.3
[0.5.4]:    https://github.com/rokucommunity/brighterscript/compare/v0.5.3...v0.5.4
[0.6.0]:    https://github.com/rokucommunity/brighterscript/compare/v0.5.4...v0.6.0
[0.7.0]:    https://github.com/rokucommunity/brighterscript/compare/v0.6.0...v0.7.0
[0.7.1]:    https://github.com/rokucommunity/brighterscript/compare/v0.7.0...v0.7.1
[0.7.2]:    https://github.com/rokucommunity/brighterscript/compare/v0.7.1...v0.7.2
[0.8.0]:    https://github.com/rokucommunity/brighterscript/compare/v0.7.2...v0.8.0
[0.8.1]:    https://github.com/rokucommunity/brighterscript/compare/v0.8.0...v0.8.1
[0.8.2]:    https://github.com/rokucommunity/brighterscript/compare/v0.8.1...v0.8.2
[0.9.0]:    https://github.com/rokucommunity/brighterscript/compare/v0.8.2...v0.9.0
[0.9.1]:    https://github.com/rokucommunity/brighterscript/compare/v0.9.0...v0.9.1
[0.9.2]:    https://github.com/rokucommunity/brighterscript/compare/v0.9.1...v0.9.2
[0.9.3]:    https://github.com/rokucommunity/brighterscript/compare/v0.9.2...v0.9.3
[0.9.4]:    https://github.com/rokucommunity/brighterscript/compare/v0.9.3...v0.9.4
[0.9.5]:    https://github.com/rokucommunity/brighterscript/compare/v0.9.4...v0.9.5
[0.9.6]:    https://github.com/rokucommunity/brighterscript/compare/v0.9.5...v0.9.6
[0.9.7]:    https://github.com/rokucommunity/brighterscript/compare/v0.9.6...v0.9.7
[0.9.8]:    https://github.com/rokucommunity/brighterscript/compare/v0.9.7...v0.9.8
[0.10.0]:   https://github.com/rokucommunity/brighterscript/compare/v0.9.8...v0.10.0
[0.10.1]:   https://github.com/rokucommunity/brighterscript/compare/v0.10.0...v0.10.1
[0.10.2]:   https://github.com/rokucommunity/brighterscript/compare/v0.10.1...v0.10.2
[0.10.3]:   https://github.com/rokucommunity/brighterscript/compare/v0.10.2...v0.10.3
[0.10.4]:   https://github.com/rokucommunity/brighterscript/compare/v0.10.3...v0.10.4
[0.10.5]:   https://github.com/rokucommunity/brighterscript/compare/v0.10.4...v0.10.5
[0.10.6]:   https://github.com/rokucommunity/brighterscript/compare/v0.10.5...v0.10.6
[0.10.7]:   https://github.com/rokucommunity/brighterscript/compare/v0.10.6...v0.10.7
[0.10.8]:   https://github.com/rokucommunity/brighterscript/compare/v0.10.7...v0.10.8
[0.10.9]:   https://github.com/rokucommunity/brighterscript/compare/v0.10.8...v0.10.9
[0.10.10]:  https://github.com/rokucommunity/brighterscript/compare/v0.10.9...v0.10.10
[0.11.0]:   https://github.com/rokucommunity/brighterscript/compare/v0.10.10...v0.11.0
[0.11.1]:   https://github.com/rokucommunity/brighterscript/compare/v0.11.0...v0.11.1
[0.11.2]:   https://github.com/rokucommunity/brighterscript/compare/v0.11.1...v0.11.2
[0.11.3]:   https://github.com/rokucommunity/brighterscript/compare/v0.11.2...v0.11.3
[0.12.0]:   https://github.com/rokucommunity/brighterscript/compare/v0.11.3...v0.12.0
[0.12.1]:   https://github.com/rokucommunity/brighterscript/compare/v0.12.0...v0.12.1
[0.12.2]:   https://github.com/rokucommunity/brighterscript/compare/v0.12.1...v0.12.2
[0.12.3]:   https://github.com/rokucommunity/brighterscript/compare/v0.12.2...v0.12.3
[0.12.4]:   https://github.com/rokucommunity/brighterscript/compare/v0.12.3...v0.12.4
[0.13.0]:   https://github.com/rokucommunity/brighterscript/compare/v0.12.4...v0.13.0
[0.13.1]:   https://github.com/rokucommunity/brighterscript/compare/v0.13.0...v0.13.1
[0.13.2]:   https://github.com/rokucommunity/brighterscript/compare/v0.13.1...v0.13.2
[0.14.0]:   https://github.com/rokucommunity/brighterscript/compare/v0.13.2...v0.14.0
[0.15.0]:   https://github.com/rokucommunity/brighterscript/compare/v0.14.0...v0.15.0
[0.15.1]:   https://github.com/rokucommunity/brighterscript/compare/v0.15.0...v0.15.1
[0.15.2]:   https://github.com/rokucommunity/brighterscript/compare/v0.15.1...v0.15.2
[0.16.0]:   https://github.com/rokucommunity/brighterscript/compare/v0.15.2...v0.16.0
[0.16.1]:   https://github.com/rokucommunity/brighterscript/compare/v0.16.0...v0.16.1
[0.16.2]:   https://github.com/rokucommunity/brighterscript/compare/v0.16.1...v0.16.2
[0.16.3]:   https://github.com/rokucommunity/brighterscript/compare/v0.16.2...v0.16.3
[0.16.4]:   https://github.com/rokucommunity/brighterscript/compare/v0.16.3...v0.16.4
[0.16.5]:   https://github.com/rokucommunity/brighterscript/compare/v0.16.4...v0.16.5
[0.16.6]:   https://github.com/rokucommunity/brighterscript/compare/v0.16.5...v0.16.6
[0.16.7]:   https://github.com/rokucommunity/brighterscript/compare/v0.16.6...v0.16.7
[0.16.8]:   https://github.com/rokucommunity/brighterscript/compare/v0.16.7...v0.16.8
[0.16.9]:   https://github.com/rokucommunity/brighterscript/compare/v0.16.8...v0.16.9
[0.16.10]:  https://github.com/rokucommunity/brighterscript/compare/v0.16.9...v0.16.10
[0.16.11]:  https://github.com/rokucommunity/brighterscript/compare/v0.16.10...v0.16.11
[0.16.12]:  https://github.com/rokucommunity/brighterscript/compare/v0.16.11...v0.16.12
[0.17.0]:   https://github.com/rokucommunity/brighterscript/compare/v0.16.12...v0.17.0
[0.18.0]:   https://github.com/rokucommunity/brighterscript/compare/v0.17.0...v0.18.0
[0.18.1]:   https://github.com/rokucommunity/brighterscript/compare/v0.18.0...v0.18.1
[0.18.2]:   https://github.com/rokucommunity/brighterscript/compare/v0.18.1...v0.18.2
[0.19.0]:   https://github.com/rokucommunity/brighterscript/compare/v0.18.2...v0.19.0
[0.20.0]:   https://github.com/rokucommunity/brighterscript/compare/v0.19.0...v0.20.0
[0.20.1]:   https://github.com/rokucommunity/brighterscript/compare/v0.20.0...v0.20.1
[0.21.0]:   https://github.com/rokucommunity/brighterscript/compare/v0.20.1...v0.21.0
[0.22.0]:   https://github.com/rokucommunity/brighterscript/compare/v0.21.0...v0.22.0
[0.22.1]:   https://github.com/rokucommunity/brighterscript/compare/v0.22.0...v0.22.1