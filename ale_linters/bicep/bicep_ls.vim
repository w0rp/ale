" Author: Johan Björklund <johan.bjorklund@protonmail.ch>
" Description: Bicep Language Server integration (https://github.com/Azure/bicep)

call ale#Set('bicep_bicep_ls', 'Bicep.LangServer.exe')

function! ale_linters#bicep#bicep_ls#GetExecutable(buffer) abort
    return ale#path#Simplify(ale#Var(a:buffer, 'bicep_bicep_ls'))
endfunction

function! ale_linters#bicep#bicep_ls#GetCommand(buffer) abort
    return '%e'
endfunction


function! ale_linters#bicep#bicep_ls#GetProjectRoot(buffer) abort
    return '.'
endfunction

call ale#linter#Define('bicep', {
\   'name': 'bicep-ls',
\   'lsp': 'stdio',
\   'executable': function('ale_linters#bicep#bicep_ls#GetExecutable'),
\   'command': function('ale_linters#bicep#bicep_ls#GetCommand'),
\   'project_root': function('ale_linters#bicep#bicep_ls#GetProjectRoot'),
\})
