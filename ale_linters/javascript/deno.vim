" Author: Arnold Chand <creativenull@outlook.com>
" Description: Deno LSP for JavaScript projects

call ale#linter#Define('javascript', {
\   'name': 'deno',
\   'lsp': 'stdio',
\   'executable': function('ale#handlers#deno#GetExecutable'),
\   'command': '%e lsp',
\   'project_root': function('ale#handlers#deno#GetProjectRoot'),
\   'initialization_options': function('ale#handlers#deno#GetInitializationOptions'),
\})
