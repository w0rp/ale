# brighterscript-formatter

A code formatter for BrightScript and [BrighterScript](https://github.com/RokuCommunity/brighterscript).


[![Build Status](https://travis-ci.org/RokuCommunity/brighterscript-formatter.svg?branch=master)](https://travis-ci.org/RokuCommunity/brighterscript-formatter)
[![Coverage Status](https://coveralls.io/repos/github/rokucommunity/brighterscript-formatter/badge.svg?branch=master)](https://coveralls.io/github/rokucommunity/brighterscript-formatter?branch=master)
[![npm](https://img.shields.io/npm/v/brighterscript-formatter.svg?branch=master)](https://www.npmjs.com/package/brighterscript-formatter)

## CLI

The command line looks up formatting options in an optional `./bsfmt.json` (see formatting options section) which should look like:

```json
{
    "indentStyle": "spaces",
    "indentSpaceCount": 2
}
```

### Usage

```bash
# WARNING: commit before running formatting

bsfmt <files...> [<options>]

# help
bsfmt --help

# format one
bsfmt source/main.brs --write

# check many
bsfmt "source/**/*.brs" --check

# skip loading from bsfmt.json
bsfmt "source/**/*.brs" --no-bsfmt

#path to custom bsfmt.json
bsfmt "source/**/*.brs" --bsfmt-path "../common/bsfmt.json"
```


### CLI Options
| Option | Type | Default | Description |
|-|-|-|-|
| cwd | `string`| `process.cwd()` | The current working directory that should be used when running this runner |
| write |`boolean` |  `false`  | Rewrites all processed in place. It is recommended to commit your files before using this option. |
| check |`boolean` |  `false`  | List any unformatted files and return a nonzero eror code if any were found |
| absolute |`boolean` |  `false`  | Print absolute file paths instead of relative paths. |
| noBsfmt |`boolean` | `false`   | Don't read a bsfmt.json file |
| bsfmtPath |`string` | `undefined`   | Use a specified path to bsfmt.json instead of the default |
||||
All boolean, string, and integer [`bsfmt.json`](#bsfmtjson-options) options are supported as well. Complex options such as `keywordCaseOverride` or `typeCaseOverride` are not currently supported via the CLI and should be provided in the `bsfmt.json` or through the node API. Feel free to [open an issue](https://github.com/rokucommunity/brighterscript-formatter/issues/new) if you would like to see support for these options via the CLI.



## bsfmt.json options
| Option | Type | Default | Description |
|-|-|-|-|
|indentStyle| `"tabs", "spaces"`|`"spaces"`| The type of whitespace to use when indenting the beginning of lines. Has no effect if `formatIndent` is false |
|indentSpaceCount| `number` | `4` | The number of spaces to use when indentStyle is 'spaces'. Default is 4. Has no effect if `formatIndent` is false or if `indentStype` is set to `"tabs"`|
|formatIndent| `boolean` | `true` | If true, the code is indented. If false, the existing indentation is left intact. | 
|keywordCase| `"lower", "upper", "title", "original"` | `"lower"` |  Replaces all keywords with the upper or lower case settings specified (excluding types...see `typeCase`). If set to `'original'`, they are not modified at all.|
|typeCase| `"lower", "upper", "title", "original"` | Value from `keywordCase` | Replaces all type keywords (`function`, `integer`, `string`, etc...) with the upper or lower case settings specified. If set to `"original"`, they are not modified at all. If falsey (or omitted), it defaults to the value in `keywordCase`|
|compositeKeywords| `"split", "combine", "original"`| `"split"` | Forces all composite keywords (i.e. `elseif`, `endwhile`, etc...) to be consistent. If `"split"`, they are split into their alternatives (`else if`, `end while`). If `"combine"`', they are combined (`elseif`, `endwhile`). If `"original"` or falsey, they are not modified. |
|removeTrailingWhiteSpace|`boolean`|`true`| Remove (or don't remove) trailing whitespace at the end of each line | 
|keywordCaseOverride| `object`| `undefined`| Provides a way to override keyword case at the individual TokenType level|
|typeCaseOverride|`object`|`undefined`| Provides a way to override type keyword case at the individual TokenType level.Types are defined as keywords that are preceeded by an `as` token.|
|formatInteriorWhitespace|`boolean`|`true`| All whitespace between items is reduced to exactly 1 space character and certain keywords and operators are padded with whitespace.  This is a catchall property that will also disable the following rules: `insertSpaceBeforeFunctionParenthesis`, `insertSpaceBetweenEmptyCurlyBraces` `insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces`|
|insertSpaceBeforeFunctionParenthesis|`boolean`|`false`| If true, a space is inserted to the left of an opening function declaration parenthesis. (i.e. `function main ()` or `function ()`). If false, all spacing is removed (i.e. `function main()` or `function()`).|
|insertSpaceBetweenEmptyCurlyBraces|`boolean`|`false`| If true, empty curly braces will contain exactly 1 whitespace char (i.e. `{ }`). If false, there will be zero whitespace chars between empty curly braces (i.e. `{}`) |
|insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces|`boolean`|`true`| If true, ensure exactly 1 space after leading and before trailing curly braces. If false, REMOVE all whitespace after leading and before trailing curly braces (excluding beginning-of-line indentation spacing)|
|insertSpaceBetweenAssociativeArrayLiteralKeyAndColon|`boolean`|`false`| If true, ensure exactly 1 space between an associative array literal key and its colon. If false, all space between the key and its colon will be removed |
|formatSingleLineCommentType|`"singlequote" , "rem" | "original"`| `"original"` | Forces all single-line comments to use the same style. If 'singlequote' or falsey, all comments are preceeded by a single quote. This is the default. If `"rem`", all comments are preceeded by `rem`. If `"original"`, the comment type is unchanged|
|formatMultiLineObjectsAndArrays|`boolean`| `true`|For multi-line objects and arrays, move everything after the `{` or `[` and everything before the `}` or `]` onto a new line.`|

## Library

### General usage

```javascript
import { Formatter } from 'brighterscript-formatter';

//create a new instance of the formatter
var formatter = new Formatter();

//retrieve the raw BrighterScript/BrightScript file contents (probably from fs.readFile)
var unformattedFileContents = getFileAsStringSomehow();

var formattingOptions = {};
//get a formatted version of the BrighterScript/BrightScript file
var formattedFileContents = formatter.format(unformattedFileContents, formattingOptions);
```

### Source Maps

The formatter also supports source maps, which can be generated alongside of the formatted code by calling `formatWithSourceMap`

```javascript
var result = formatter.formatWithSourceMap(unformattedFileContents);
var formattedFileContents = result.code;
var sourceMap = result.map;
```
